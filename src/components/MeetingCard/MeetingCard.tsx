import { MeetingCardProps } from '@/types/MeetingProps';
import { MeetingCardImpl } from '@/implementation/meetingCard';

export const MeetingCard = (props: MeetingCardProps) => {
  return <MeetingCardImpl {...props} />;
};
