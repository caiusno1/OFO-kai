import { JoinableParticipant } from './JoinableParticipant';
import { Participant } from './Participants';
export class OFOEvent{
  public topic: string;
  public date: string;
  public time: string;
  public organiser: Participant;
  public participants: JoinableParticipant[];
  public platform: string;
}
