import { ActiveSessionsWidgetProps } from '@/types/ActiveSessionsWidgetProps';
import { ActiveSessionsWidgetImpl } from '@/implementation/activeSessionsWidget';

export function ActiveSessionsWidget(props: ActiveSessionsWidgetProps) {
  return <ActiveSessionsWidgetImpl {...props} />;
}
