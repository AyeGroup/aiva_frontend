// authService.ts
import axios from "axios";

const API = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_BASE_URL });

// اضافه کردن interceptor
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
            {
              refresh_token: refreshToken,
            }
          );

          const newAccessToken = res.data.access_token;
          // access_token را در حافظه ذخیره کن (مثلا Context)
          localStorage.setItem("access_token", newAccessToken); // موقتاً اگر خواستی بعد از رفرش بمونه

          API.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return API(originalRequest);
        } catch (err) {
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("access_token");
          window.location.href = "/auth/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default API;
