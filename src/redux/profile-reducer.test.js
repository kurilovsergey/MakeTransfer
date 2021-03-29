import {profile_reducer,  addpostactioncreator } from './profile-reducer'



it('new post should be added', () => {
 let action = addpostactioncreator("it");

 let initialstate = {
    postData:   [
    {id: 1, message: "What is your club?", likes: 12},
    {id: 2, message: "I see your vidio!", likes: 13} 
    ],
    newposttext: 'type text',
    profile: null,
    status: ""
  };

 let newState = profile_reducer(initialstate, action)

 expect (newState.postData.length).toBe(5)
})