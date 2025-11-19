import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:8000",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// متغیر برای جلوگیری از درخواست‌های همزمان refresh
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // اگر خطای 401 نیست یا درخواست refresh token است
    if (
      error.response?.status !== 401 ||
      originalRequest.url?.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    // اگر قبلاً retry شده
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // اگر در حال refresh کردن هستیم، درخواست را به صف اضافه کن
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      isRefreshing = false;
      processQueue(new Error("No refresh token"), null);

      // پاک کردن localStorage و dispatch event
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth-logout"));
      }

      return Promise.reject(error);
    }

    try {
      const res = await axios.post(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:8000"
        }/auth/refresh`,
        { refresh_token: refreshToken },
        { withCredentials: true }
      );

      const { access_token, refresh_token } = res.data.data;

      // ذخیره توکن‌های جدید
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);

      // ست کردن توکن جدید
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${access_token}`;
      originalRequest.headers["Authorization"] = `Bearer ${access_token}`;

      // پردازش صف درخواست‌های معلق
      processQueue(null, access_token);
      isRefreshing = false;

      // تکرار درخواست اصلی
      return axiosInstance(originalRequest);
    } catch (err) {
      console.error("Token refresh failed:", err);

      // پاک کردن همه چیز
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      processQueue(err, null);
      isRefreshing = false;

      // dispatch event برای logout
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth-logout"));
      }

      return Promise.reject(err);
    }
  }
);

export default axiosInstance;
