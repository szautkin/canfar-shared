import { FormFieldErrorProps } from '@/types/FormFieldErrorProps';
import { FormFieldErrorImplementation } from '@/implementation/formFieldError';

export function FormFieldError(props: FormFieldErrorProps) {
  return <FormFieldErrorImplementation {...props} />;
}
