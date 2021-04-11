const SEND_MESSAGE = "SEND MESSAGE";

let initialstate = {
    messageData: [
        {id: 1, message: "What your club?"},
        {id: 2, message: "I see your vidio?"},
        {id: 3, message: "I find club"},
        {id: 4, message: "Nerchinsk message"}
    ],
    dialogData: [
        {id: 1, name: 'Player1'},
        {id: 2, name: 'Coach'},
        {id: 3, name: 'Agent1'}
         ]
};

export const dialog_reducer = (state=initialstate, action) => {
    if (action.type === SEND_MESSAGE) {
      let body = action.newmessage;
      console.log('body ',body)
      return {...state, messageData:  [...state.messageData, {id: 4, message: body}]};;
      } 
    return state;
};

export let sendmessage  = (newmessage) => {
    return {
       type: SEND_MESSAGE,
       newmessage
           }
          }
  


export default dialog_reducer;