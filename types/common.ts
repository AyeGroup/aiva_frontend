// تایپ‌های مشترک پروژه

// تایپ‌های عمومی UI
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

// تایپ‌های دکمه
export interface ButtonProps extends BaseComponentProps {
  variant: 'primary' | 'secondary' | 'tertiary';
  size: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  title: string; // الزامی برای accessibility
  type?: 'button' | 'submit' | 'reset';
  icon?: 'arrow-right' | 'arrow-left' | 'external' | 'download' | 'plus' | 'check' | 'x' | 'play';
  iconPosition?: 'right' | 'left';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// تایپ‌های ورودی
export interface InputProps extends BaseComponentProps {
  type: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search';
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
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
  'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time';
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
  variant?: 'default' | 'outlined' | 'elevated';
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
  type: 'text' | 'email' | 'password' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio';
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
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  status: LoadingState;
  error: string | null;
}

// تایپ‌های responsive
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ResponsiveProps {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
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