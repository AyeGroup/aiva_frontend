// تایپ‌های مشترک پروژه

// تایپ‌های عمومی UI
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

export type PageType =
  | "landing"
  | "register"
  | "dashboard"
  | "consultation"
  | "demo"
  | "chatbot-management"
  | "tickets"
  | "login"
  | "otp-verification"
  | "components";

  export interface BotConfig {
    name: string;
    description: string;
    guidelines: string;
    language: string;
    tone: string;
    color: string;
    button_size: string;
    widget_position: string;
    answer_length: string;
    support_phone: string;
    use_emoji: string;
    greetings: string;
    k: string;
    reranker_enabled: string;
    llm_model: string;
    llm_api_key: string;
    primary_color: string;
    accent_color: string;
    logo: string;
  }

    // ----------
    // welcomeMessage: string;
    // fallbackMessage: string;
    // knowledge: Array<{
    //   id: string;
    //   type: "faq" | "document" | "url" | "text";
    //   title: string;
    //   content?: string;
    //   url?: string;
    // }>;
    // branding: {
    //   logo?: string;
    //   position: "bottom-right" | "bottom-left";
    //   size: "small" | "medium" | "large";
    // };
    // behaviors?: {
    //   responseStyle: "concise" | "detailed" | "helpful";
    //   maxResponseLength: number;
    //   useEmojis: boolean;
    //   escalationTriggers: string[];
    //   autoGreeting: boolean;
    //   contextMemory: boolean;
    //   privacyMode: boolean;
    //   responseDelay: number;
    // };
// تایپ‌های دکمه
export interface ButtonProps extends BaseComponentProps {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  title?: string; // الزامی برای accessibility
  type?: "button" | "submit" | "reset";
  icon?:
    | "arrow-right"
    | "arrow-left"
    | "external"
    | "download"
    | "plus"
    | "check"
    | "x"
    | "play"
    | "null";
  // | "layers"
  iconPosition?: "right" | "left";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// تایپ‌های ورودی
export interface InputProps extends BaseComponentProps {
  type: "text" | "email" | "password" | "tel" | "url" | "search";
  placeholder?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  loading?: boolean;
  error?: string;
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

// تایپ‌های لینک و ناوبری
export interface NavItem {
  id: string;
  title: string;
  href: string;
  icon?: string;
  badge?: string | number;
  children?: NavItem[];
}

export interface LinkProps extends BaseComponentProps {
  href: string;
  title: string; // الزامی برای accessibility
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
  "aria-current"?: "page" | "step" | "location" | "date" | "time";
}

// تایپ‌های کارت و محتوا
export interface CardProps extends BaseComponentProps {
  title?: string;
  description?: string;
  image?: {
    src: string;
    alt: string;
  };
  actions?: React.ReactNode;
  variant?: "default" | "outlined" | "elevated";
}

// تایپ‌های فرم
export interface FormState {
  isSubmitting: boolean;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}

export interface FormField {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "tel"
    | "textarea"
    | "select"
    | "checkbox"
    | "radio";
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => string | null;
  };
}

// تایپ‌های حالت‌های مختلف
export type LoadingState = "idle" | "loading" | "success" | "error";

export interface AsyncState<T> {
  data: T | null;
  status: LoadingState;
  error: string | null;
}

// تایپ‌های responsive
export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export interface ResponsiveProps {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  "2xl"?: string;
}

// تایپ‌های سئو
export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
}
