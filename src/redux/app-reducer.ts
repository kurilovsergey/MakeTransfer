import {getAuthUserData} from "./Auth-reducer"
import { InferActionsType } from "./reduxstore";
const INITIALIZED_SUCCES="INITIALIZED_SUCCES"

export type Initialstate = {
  initialized: boolean
};

let initialstate : Initialstate = {
  initialized: false
};

const App_reducer = (state : Initialstate = initialstate, action : ActionType): Initialstate => {
  switch(action.type) {
  case INITIALIZED_SUCCES: 
      return {
    ...state,
    initialized: true
  }
  default:
    return state; 
}
};

export default App_reducer
/*
  type InitializedSuccesActionType = {
    type: typeof INITIALIZED_SUCCES 
  }
*/
  export const actions = {
    InitializedSucces: () => ({type: INITIALIZED_SUCCES} as const)
  }

  type ActionType = InferActionsType<typeof actions>

  //export const InitializedSucces = (): InitializedSuccesActionType => ({type: INITIALIZED_SUCCES});

  export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    debugger
    //dispatch(getAuthUserData());
    //dispatch(InitializedSucces());
    promise.then(()=>{
      dispatch(actions.InitializedSucces())
    })
  }
 

  

