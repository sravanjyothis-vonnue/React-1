import { type ComponentProps, useId } from "react";
import {
  Controller,
  type FieldValues,
  type Path,
  type UseFormReturn,
} from "react-hook-form";

type InputProps = Omit<ComponentProps<"input">, "form">;

interface PnTextInputProps<T extends FieldValues> extends InputProps {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
}

export function PnTextFormField<T extends FieldValues>({
  form,
  name,
  label,
  required,
  ...props
}: PnTextInputProps<T>) {
  const id = useId();
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="form-item">
          {label && (
            <label htmlFor={id}>
              {label} {required && <span>*</span>}
            </label>
          )}
          <input id={id} {...field} {...props} />
          {fieldState.error && <p>{fieldState.error.message}</p>}
        </div>
      )}
    />
  );
}
