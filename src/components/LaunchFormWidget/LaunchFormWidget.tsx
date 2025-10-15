import { LaunchFormWidgetProps } from '@/types/LaunchFormWidgetProps';
import { LaunchFormWidgetImpl } from '@/implementation/launchFormWidget';

export function LaunchFormWidget(props: LaunchFormWidgetProps) {
  return <LaunchFormWidgetImpl {...props} />;
}
