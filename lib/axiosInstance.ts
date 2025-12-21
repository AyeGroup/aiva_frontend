import { API_ROUTES } from "@/constants/apiRoutes";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:8000",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

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

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     console.log("interceptors0");
//     const originalRequest = error.config;
//     const { logout } = useAuth();

//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       !originalRequest.url.includes("/auth/refresh")
//     ) {
//       originalRequest._retry = true;

//       const refreshToken = localStorage.getItem("refreshToken");
//       console.log("interceptors1", refreshToken);
//       try {
//         if (!refreshToken) {
//           if (typeof window !== "undefined") {
//             logout();
//           }
//           return Promise.reject(error);
//         }

//         const res = await axios.post(API_ROUTES.AUTH.REFRESH, {
//           refresh_token: refreshToken,
//         });

//         const { access_token } = res.data.data;
//       console.log("interceptors2", access_token);

//         localStorage.setItem("accessToken", access_token);

//         axiosInstance.defaults.headers.common.Authorization = `Bearer ${access_token}`;
//         originalRequest.headers.Authorization = `Bearer ${access_token}`;
//       console.log("interceptors3");

//         return axiosInstance(originalRequest);
//       } catch (err) {
//         logout();
//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
        console.log("elham");
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        console.log("refreshToken", refreshToken);
        if (!refreshToken) {
         localStorage.removeItem("accessToken");
         localStorage.removeItem("refreshToken");
         localStorage.removeItem("user");

         if (typeof window !== "undefined") {
           window.dispatchEvent(new Event("auth-logout"));
         }
          return;
        }

        // درخواست رفرش توکن
        const res = await axios.post(API_ROUTES.AUTH.REFRESH, {
          refresh_token: refreshToken,
        });
        const { access_token } = res.data.data;
        localStorage.setItem("accessToken", access_token);

        // ست کردن توکن جدید برای درخواست‌ها
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;
        originalRequest.headers["Authorization"] = `Bearer ${access_token}`;

        // تکرار درخواست قبلی
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err);
       localStorage.removeItem("accessToken");
       localStorage.removeItem("refreshToken");
       localStorage.removeItem("user");

       if (typeof window !== "undefined") {
         window.dispatchEvent(new Event("auth-logout"));
       }
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
