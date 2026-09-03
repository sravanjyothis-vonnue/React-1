import type { ComponentPropsWithoutRef } from "react";
import {
  FormProvider,
  type FieldValues,
  type SubmitErrorHandler,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";
interface FormWraperProps<T extends FieldValues> extends Omit<
  ComponentPropsWithoutRef<"form">,
  "onSubmit"
> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
}

export function FormWraper<T extends FieldValues>({
  form,
  children,
  onSubmit,
  ...rest
}: FormWraperProps<T>) {
  const onError: SubmitErrorHandler<T> = (errors: any) =>
    console.log(`Form errors:`, errors);
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} {...rest}>
        {children}
      </form>
    </FormProvider>
  );
}
