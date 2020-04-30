/** 
 * Only a mock Userservice to enable early testing of the UI
*/
module.exports = class MockUserService {
    friends = [
        { name: "Noel ", id: "TripleX"},
        { name: "Erik ", id: "Erronnous"},
        { name: "Otto ", id: "Otto"},
    ]
    profile = {
        name: "Kai Biermeier",
        age: "23",
        hobbies:["programming"],
        job: "Student",
        ueberMich: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
    }
    myevents = [
        {
          date: '20.02.2020',
          time: '10:30',
          topic: 'Ranked Game (SoloQ)',
          service: 'League of Legends'
        },
        {
          date: '20.02.2020',
          time: '13:30',
          topic: 'Clash',
          service: 'League of Legends'
        }
    ]
    constructor(userName){
        // console.log(`User ${userName} issues a request`);
    }
    getFriends(){
        return this.friends;
    }
    getProfile(){
        return this.profile;
    }
    getMyEvents(){
        return this.myevents;
    }
}