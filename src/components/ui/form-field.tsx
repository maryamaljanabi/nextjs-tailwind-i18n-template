import { Input } from "./input";
import { Textarea } from "./textarea";

type FormFieldProps = {
  id: string;
  label: string;
  type?: string;
  as?: "input" | "textarea";
  formData: Record<string, string>;
  errors: Record<string, string | undefined>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  [key: string]: any;
};

export const FormField = ({
  id,
  label,
  type = "text",
  as = "input",
  formData,
  errors,
  onChange,
  ...props
}: FormFieldProps) => {
  const Component = as === "textarea" ? Textarea : Input;
  const error = errors[id];

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-primary"
      >
        {label}
      </label>
      <Component
        type={type}
        id={id}
        name={id}
        value={formData[id]}
        onChange={onChange}
        hasError={!!error}
        placeholder={label}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={!!error}
        required
        {...props}
      />
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1 text-sm text-destructive"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};
