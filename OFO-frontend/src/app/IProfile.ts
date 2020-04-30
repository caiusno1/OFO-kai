// An interface description to work typesafe with data send by the api (in this case the profile)
export interface IProfile{
  name: string;
  age: number;
  hobbies: string;
  job: string;
  aboutMe: string;
}
