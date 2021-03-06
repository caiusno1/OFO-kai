// A class description to work typesafe with data send by the api (in this case the Online Freetime Event)
import { Participant } from './Participants';
export class OFOEvent{
  public id: string;
  public topic: string;
  public date: string;
  public time: string;
  public description: string;
  public organiser: Participant;
  public participants: Participant[];
  public joinedParticipants: Participant[];
  public service: string;
}
