import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (request) => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        request.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }
    return request;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        if (typeof window === "undefined") throw new Error("No window object");

        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token");

        const response = await axios.post(
          `${
            process.env.NEXT_PUBLIC_AUTH_SERVER_URL || "https://localhost:8000"
          }/auth/refrsh`,
          { refreshToken }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
