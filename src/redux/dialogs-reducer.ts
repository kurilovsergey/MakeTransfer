import { string } from "yup/lib/locale";
import { AppStateType, InferActionsType, BaseThunkType } from "./reduxstore";

const SEND_MESSAGE = "SEND MESSAGE";

export type DialogType = {
    id: number,
    name: string
}

export type MessageType = {
    id: number,
    message: string
}

let initialstate = {
    messageData : [
        {id: 1, message: "What your club?"},
        {id: 2, message: "I see your vidio?"},
        {id: 3, message: "I find club"}
    ] as Array<MessageType>,
    dialogData: [
        {id: 1, name: 'Player1'},
        {id: 2, name: 'Coach'},
        {id: 3, name: 'Agent1'}
         ] as Array<DialogType>
};

export type InitialstateType = typeof initialstate;

export const dialog_reducer = (state: InitialstateType = initialstate, action: ActionsType) => {
    if (action.type === SEND_MESSAGE) {
      let body = action.newmessage;
      console.log('body ',body)
      return {...state, messageData:  [...state.messageData, {id: 4, message: body}]};;
      } 
    return state;
};

type sendmessageType = {
    type: typeof SEND_MESSAGE,
    newmessage: string
}

let actions = {
    sendmessage: (newmessage: string) => {
        return {
           type: SEND_MESSAGE,
           newmessage
               } as const
              }
}

type ActionsType = InferActionsType<typeof actions>

export type ThunkType = BaseThunkType<ActionsType>

export let sendmessage  = (newmessage: string): sendmessageType => {
    return {
       type: SEND_MESSAGE,
       newmessage
           }
          }
  


export default dialog_reducer;