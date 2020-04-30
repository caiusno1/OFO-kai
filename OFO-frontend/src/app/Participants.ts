// A class description to work typesafe with data send by the api (in this case the description of event participates (or friends))
export interface Participant{
  name: string;
  id: string;
  selected: boolean;
  mondayFreetime: string;
  tuesdayFreetime: string;
  wednessdayFreetime: string;
  thursdayFreetime: string;
  fridayFreetime: string;
  saturdayFreetime: string;
  sundayFreetime: string;
}
