import api from "./api";
import { API_ROUTES } from "@/constants/apiRoutes";
interface LoginBody {
  email: string;
  password: string;
}
// export const login = (user: string, pass: string) =>
//   api.post(API_ROUTES.AUTH.LOGIN, {email: user,password: pass });

export const login = (email: string, password: string) => {
  const body: LoginBody = { email, password };
  return api.post(API_ROUTES.AUTH.LOGIN, body);
};

export const register = (identifier: string, password: string) =>
  api.post(API_ROUTES.AUTH.REGISTER, { identifier, password });

export const verifyOtp = (identifier: string, otp: string) =>
  api.post(API_ROUTES.AUTH.VERIFY_PHONE, { identifier, otp });
