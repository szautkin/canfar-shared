import { ErrorBoundaryProps } from '@/types/ErrorBoundaryProps';
import { ErrorBoundaryImplementation } from '@/implementation/errorBoundary';

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return <ErrorBoundaryImplementation {...props} />;
}
