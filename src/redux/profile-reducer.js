const ADD_POST = "ADD-POST";
const UPDATE_NEWPOSTTEXT = "UPDATE NEW POST TEXT";

let initialstate = {
    postData:   [
        {id: 1, message: "What is your club?", likes: 12},
        {id: 2, message: "I see your vidio!", likes: 13} 
        ],
    newposttext: 'type text'
};

const profile_reducer = (state = initialstate, action) => {


        if (action.type === ADD_POST) {
          let newpost=({id: 5, message: action.textpost, likes: 3
          });
              state.postData.push(newpost);
              state.newposttext='';
              
        } else if (action.type === UPDATE_NEWPOSTTEXT) {
              state.newposttext = action.newtext;
             
        } 
    

    return state;
}

export let addpostactioncreator  = (text) => {
    return {
       type: ADD_POST,
       textpost: text
           }
          }
  
export let updatenewposttext  = (text) => {
    return {
      type: UPDATE_NEWPOSTTEXT,
      newtext: text
          } 
        }

export default profile_reducer;