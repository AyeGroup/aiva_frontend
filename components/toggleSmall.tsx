import { useId } from "react";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export function ToggleSmall({ checked, onChange, label }: ToggleProps) {
  const id = useId();

  const handleToggle = () => {
    onChange(!checked);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={label ? `${id}-label` : undefined}
        onClick={handleToggle}
        className={`
          relative w-12 h-6 rounded-full cursor-pointer transition-colors duration-200
          ${checked ? "bg-primary" : "bg-gray-300"}
        `}
      >
        <span
          className={`
            absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow
            transition-transform duration-200
            ${checked ? "translate-x-6" : "translate-x-0"}
          `}
        />
      </button>

      {label && (
        <label
          id={`${id}-label`}
         className="pt-2 font-light text-base"
          onClick={handleToggle}
        >
          {label}
        </label>
      )}
    </div>
  );
}
