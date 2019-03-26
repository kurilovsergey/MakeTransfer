const UPDATE_NEWMESSAGE = "UNPATE NEW MESSAGE";
const SEND_MESSAGE = "SEND MESSAGE";

let initialstate = {
    messageData: [
        {id: 1, message: "What your club?"},
        {id: 2, message: "I see your vidio?"},
        {id: 3, message: "I find club"}
    ],
    dialogData: [
        {id: 1, name: 'Player1'},
        {id: 2, name: 'Coach'},
        {id: 3, name: 'Agent1'}
         ],
    newMessage: ""
};

export const dialog_reducer = (state=initialstate, action) => {
    if (action.type === UPDATE_NEWMESSAGE) {
        //state.newMessage = action.body;
        return{
        ...state,
        newMessage: action.body
        }
    } else if (action.type === SEND_MESSAGE) {
      let copyMessageData=state.messageData;
      let body = state.newMessage;
      copyMessageData.push({id: 4, message: body});
      return Object.assign({}, state, {newMessage: ''}, {messageData: copyMessageData} );
      } 
    return state;
};

export let sendmessage  = () => {
    return {
       type: SEND_MESSAGE
           }
          }
  
export let updatemessage  = (text) => {
    return {
      type: UPDATE_NEWMESSAGE,
      body: text
          } 
        }

export default dialog_reducer;