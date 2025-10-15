import { MeetingsHeaderProps } from '@/types/MeetingsHeaderProps';
import { MeetingsHeaderImpl } from '@/implementation/meetingsHeader';

export const MeetingsHeader = (props: MeetingsHeaderProps = {}) => {
  return <MeetingsHeaderImpl {...props} />;
};
