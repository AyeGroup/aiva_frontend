import { API_BASE_URL } from "@/config";

export const API_ROUTES = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REFRESH: `${API_BASE_URL}/auth/refrsh`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    VERIFY_OTP: `${API_BASE_URL}/auth/verify-otp`,
  },
  USER: {
    PROFILE: `${API_BASE_URL}/user/profile`,
    UPDATE: `${API_BASE_URL}/user/update`,
  },
};
