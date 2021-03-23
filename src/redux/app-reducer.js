import {getAuthUserData} from "./Auth-reducer"
const INITIALIZED_SUCCES="INITIALIZED_SUCCES"



let initialstate = {
  initialized: false
};

const App_reducer = (state = initialstate, action) => {
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

  export const InitializedSucces = () => ({type: INITIALIZED_SUCCES});

  export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    debugger
    console.log(promise);
    //dispatch(getAuthUserData());
    //dispatch(InitializedSucces());
    promise.then(()=>{
      dispatch(InitializedSucces())
    })
  }
 

  

