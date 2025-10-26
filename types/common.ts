export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

export const colorPalette = [
  { name: "صورتی", value: "#ec4899" },
  { name: "بنفش", value: "#8b5cf6" },
  { name: "سبز", value: "#22c55e" },
  { name: "آبی", value: "#3b82f6" },
  { name: "عنبری", value: "#f5a623" },
  { name: "فیروزه‌ای", value: "#4ca7a5" },
  { name: "کورال", value: "#eb6e5b" },
];

export type PageType =
  | "landing"
  | "register"
  | "login"
  | "onboarding"
  | "verification"
  | "dashboard"
  | "consultation"
  | "demo"
  | "chatbot-management"
  | "tickets"
  | "billing"
  | "components";

export interface BotConfig {
  uuid: string;
  name: string;
  description: string;
  guidelines: string;
  language: string;
  tone: string;
  color: string;
  button_size: string;
  widget_position: string;
  reranker_enabled: string;
  llm_model: string;
  llm_api_key: string;
  primary_color: string;
  accent_color: string;
  knowledge: Array<KnowledgeItem>;
  faqs: Array<FAQ>;
  logo_url: string;
  behaviors: BehaviorSettings;

  // -------------------برای آمار
  updated_at?: string;
  active: boolean;
  conversationsToday?: string;
  url?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  isEditing?: boolean;
}

export interface KnowledgeItem {
  id: string;
  type: "qa_pair" | "file" | "website";
  title: string;
  content?: string;
  status?: string;
  url?: string;
  created_at?: string;
  qa_id?: string;
  upload_id?: string;
}
export interface BehaviorSettings {
  k: number;
  maxResponseLength: string;
  support_phone: string;
  useGreeting: boolean;
  useEmojis: boolean;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  title?: string;
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

  iconPosition?: "right" | "left";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

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

export interface NavItem {
  id: string;
  title: string;
  href: string;
  description?: string;
  icon?: string;
  badge?: string | number;
  children?: NavItem[];
}

export interface LinkProps extends BaseComponentProps {
  href: string;
  title: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
  "aria-current"?: "page" | "step" | "location" | "date" | "time";
}

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

export type LoadingState = "idle" | "loading" | "success" | "error";

export interface AsyncState<T> {
  data: T | null;
  status: LoadingState;
  error: string | null;
}

export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export interface ResponsiveProps {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  "2xl"?: string;
}

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
}
