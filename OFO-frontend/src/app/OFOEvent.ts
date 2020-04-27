import { JoinableParticipant } from './JoinableParticipant';
import { Participant } from './Participants';
export class OFOEvent{
  public eventid: string;
  public topic: string;
  public date: string;
  public time: string;
  public description: string;
  public organiser: Participant;
  public participants: JoinableParticipant[];
  public service: string;
}
