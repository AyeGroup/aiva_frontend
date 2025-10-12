import { API_BASE_URL } from "@/config";

export const API_ROUTES = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    REFRESH: `${API_BASE_URL}/auth/refrsh`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    VERIFY_PHONE: `${API_BASE_URL}/auth/phone/verify`,
    VERIFY_EMAIL: `${API_BASE_URL}/auth/verify-email`,
    SEND_CODE: `${API_BASE_URL}/auth/phone/send-code`,
  },
  BOTS: {
    SAVE: `${API_BASE_URL}/chatbots`,
    LIST: `${API_BASE_URL}/chatbots`,
    GET: `${API_BASE_URL}/chatbots/`, //bot_uuid
    GET_EMBED: `${API_BASE_URL}/widget/embed-script/`, //bot_uuid
  },
  QA: {
    // DOCUMENT: `${API_BASE_URL}/chatbots/{bot_uuid}/documents`,

    DOCUMENT: (bot_uuid:string) => `${API_BASE_URL}/chatbots/${bot_uuid}/documents`,
    QUESTION: `${API_BASE_URL}/chatbots/{bot_uuid}/qa`,
  },
  USER: {
    PROFILE: `${API_BASE_URL}/user/profile`,
    UPDATE: `${API_BASE_URL}/user/update`,
  },
};
