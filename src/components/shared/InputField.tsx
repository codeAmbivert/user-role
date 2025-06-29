import { ChangeEvent, InputHTMLAttributes, useState } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  css?: string;
  label?: string; // Added label for the input field
  placeholder?: string; // Added placeholder text for the input
  onClick?: () => void; // Added onClick prop for the input field
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean; // Added required prop for the input field
  name: string; // Added name attribute for the input field
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode; // Added start icon for the input field
  error?: string;
}

const InputField = ({
  css,
  label, // Use label prop
  placeholder, // Use placeholder prop
  onClick,
  onChange,
  required,
  name, // Use name prop
  endIcon,
  startIcon, // Use start icon prop
  error,
  ...props
}: InputFieldProps) => {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      {label && (
        <label htmlFor={name} className="text-[#667085] text-sm">
          {label} {/* Render label if provided */}{" "}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div
        className={`${css} relative flex items-center ${
          focused
            ? "border-2 border-purple-500/10 rounded-[10px]"
            : "border-2 border-transparent"
        }`}
        onClick={onClick}
      >
        {startIcon && (
          <div className="absolute left-3">
            {startIcon} {/* Render start icon if provided */}
          </div>
        )}

        <input
          id={name} // Set id for accessibility
          name={name} // Set name for the input
          placeholder={placeholder} // Set placeholder text
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full h-10 text-base  px-8 py-2 font-light bg-white border-1 border-gray-200 rounded-lg focus:outline-none ${
            startIcon ? "pl-9" : "pl-3"
          } ${endIcon ? "pr-9" : "pr-3"} ${
            error ? "border-red-500" : "border-gray-200"
          } focus:border-purple-300`}
          onChange={onChange}
          {...props}
        />

        {endIcon && <div className="absolute right-3">{endIcon}</div>}
      </div>
      {error && (
        <p className="text-red-500 text-xs">{error}</p> // Render error message if provided
      )}
    </div>
  );
};

export default InputField;
