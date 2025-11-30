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

  STATISTIC: {
    GET_COVER: (bot_uuid: string) =>
      `${API_BASE_URL}/dashboard/overview/${bot_uuid}`,
    HEATMAP: (bot_uuid: string) =>
      `${API_BASE_URL}/dashboard/message-heatmap/${bot_uuid}`,
    ACTIVE_USERS: (bot_uuid: string) =>
      `${API_BASE_URL}/dashboard/active-users/${bot_uuid}`,
    ACTIVE_USERS_PAGINATED: (bot_uuid: string, page: number) =>
      `${API_BASE_URL}/dashboard/active-users-paginated/${bot_uuid}`,
    RECCENT_SESSION: (bot_uuid: string) =>
      `${API_BASE_URL}/dashboard/recent-sessions/${bot_uuid}`,
    USERS: (bot_uuid: string) =>
      `${API_BASE_URL}/dashboard/users-trend/${bot_uuid}`, //days
    SESSION: (bot_uuid: string) =>
      `${API_BASE_URL}/dashboard/sessions-trend/${bot_uuid}`, //days

    FAQ_LIST: (bot_uuid: string) => `${API_BASE_URL}/chatbots/${bot_uuid}/faqs`, //days
  },

  BOTS: {
    LOGO_UPLOAD: (bot_uuid: string) =>
      `${API_BASE_URL}/chatbots/${bot_uuid}/logo`,
    EDIT: (bot_uuid: string) => `${API_BASE_URL}/chatbots/${bot_uuid}`,
    SAVE: `${API_BASE_URL}/chatbots`,
    LIST: `${API_BASE_URL}/chatbots`,
    GET: `${API_BASE_URL}/chatbots`, //bot_uuid

    GET_EMBED: (bot_uuid: string) =>
      `${API_BASE_URL}/widget/embed-script/${bot_uuid}`,
    SESSION_COUNT_COVER: `${API_BASE_URL}/dashboard/user-chatbots-sessions`,
    SESSION_COUNT: (bot_uuid: string) =>
      `${API_BASE_URL}/dashboard/chatbots-conversations/${bot_uuid}`,
    FAQ: (bot_uuid: string) => `${API_BASE_URL}/chatbots/${bot_uuid}/faqs`,
  },

  KNOWLEDGE: {
    DOCUMENT: (bot_uuid: string) =>
      `${API_BASE_URL}/chatbots/${bot_uuid}/documents`,
    DOCUMENT_EDIT: (bot_uuid: string, doc_id: string) =>
      `${API_BASE_URL}/chatbots/${bot_uuid}/documents/item/${doc_id}/title`,

    QA_LIST: (bot_uuid: string) => `${API_BASE_URL}/chatbots/${bot_uuid}/qa`,
    QA_SAVE: (bot_uuid: string) => `${API_BASE_URL}/chatbots/${bot_uuid}/qa`,
    QA_GET: (bot_uuid: string, qa_id: string) =>
      `${API_BASE_URL}/chatbots/${bot_uuid}/qa/${qa_id}`,
    QA_EDIT: (bot_uuid: string, id: string) =>
      `${API_BASE_URL}/chatbots/${bot_uuid}/qa/${id}`,

    URL: (bot_uuid: string) =>
      `${API_BASE_URL}/chatbots/${bot_uuid}/documents/url`,
  },

  TICKETS: {
    CREATE: `${API_BASE_URL}/tickets`,
    GET: (ticket_id: string) => `${API_BASE_URL}/tickets/${ticket_id}`,
    LIST: `${API_BASE_URL}/tickets`,
    ADD_MESSAGE: (ticket_id: string) =>
      `${API_BASE_URL}/tickets/${ticket_id}/messages`,
  },

  USER: {
    PROFILE: `${API_BASE_URL}/user/profile`,
    UPDATE: `${API_BASE_URL}/user/profile`,
  },

  FINANCIAL: {
    WALLET: `${API_BASE_URL}/financial/wallet`,
    TRANSACTION_ALL: `${API_BASE_URL}/financial/transactions`,
    SUBSCRIPTIONS: `${API_BASE_URL}/financial/my-subscriptions`,
    SUBSCRIPTION: (bot_uuid: string) =>
      `${API_BASE_URL}/financial/chatbots/${bot_uuid}/subscription`,
    BALANCE: (bot_uuid: string) =>
      `${API_BASE_URL}/financial/chatbots/${bot_uuid}/balance`,
    TRANSACTION: (bot_uuid: string) =>
      `${API_BASE_URL}/financial/chatbots/${bot_uuid}/transaction`,
    STATISTICS: (bot_uuid: string) =>
      `${API_BASE_URL}/financial/chatbots/${bot_uuid}/usage-stat`,
    PDF: (transaction_id: string) =>
      `${API_BASE_URL}/financial/transactions/${transaction_id}/invoice`,
  },

  PAYMENT: {
    DISCOUNT: `${API_BASE_URL}/payment/discont/verify`,
    INITIATE: `${API_BASE_URL}/payment/initiate`,
    FACTOR: `${API_BASE_URL}/payment/factor`,
    CALLBACK: `${API_BASE_URL}/payment/callback`,
    VERIFY: (payment_id: string) =>
      `${API_BASE_URL}/payment/verify/${payment_id}`,
    HISTORY: `${API_BASE_URL}/payment/history`,
    PRICING: `${API_BASE_URL}/payment/pricing`,
  },

  PUBLIC: {
    HISTORY: (bot_uuid: string) => `${API_BASE_URL}/public/${bot_uuid}/history`,
  },
};
