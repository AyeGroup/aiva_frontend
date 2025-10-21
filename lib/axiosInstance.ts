import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:8000",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// === REQUEST INTERCEPTOR ===
axiosInstance.interceptors.request.use(
  (config) => {
    // console.log("REQUEST INTERCEPTOR 1");
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    // console.log("REQUEST INTERCEPTOR 2");

    // اگر بدنه FormData بود، نوع Content-Type را تغییر نده
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// === RESPONSE INTERCEPTOR ===
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // console.log("RESPONSE INTERCEPTOR 0", originalRequest);

    // اگر توکن منقضی شده باشد و هنوز تلاش نکردیم
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // console.log("RESPONSE INTERCEPTOR 1", "retry  true");

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token");
        // console.log("RESPONSE INTERCEPTOR 2", "no refresh token");

        // درخواست رفرش توکن
        const res = await axios.post(
          `${
            process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:8000"
          }/auth/refresh`,
          { refresh_token: refreshToken },
          { withCredentials: true }
        );

        const { access_token, refresh_token } = res.data.data;

        // console.log("RESPONSE INTERCEPTOR 3", "request resfresh");

        // ذخیره توکن‌های جدید
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("refreshToken", refresh_token);

        // ست کردن توکن جدید برای درخواست‌ها
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;
        originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
        // console.log("RESPONSE INTERCEPTOR 4", "set new header");

        // تکرار درخواست قبلی
        return axiosInstance(originalRequest);
      } catch (err) {
        // console.log("RESPONSE INTERCEPTOR 5");
        console.error("Token refresh failed:", err);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        if (typeof window !== "undefined") window.location.href = "/auth/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
