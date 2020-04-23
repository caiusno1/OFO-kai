import { Participant } from './Participants';
export interface JoinableParticipant extends Participant{
  joined: boolean;
}
