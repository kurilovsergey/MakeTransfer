//import {rerender} from '../rerender' 
import profile_reducer from './profile-reducer';
import dialog_reducer from './dialogs-reducer';

let store = {
    _state : {
        Wallpage : {
            postData:   [
                {id: 1, message: "What is your club?", likes: 12},
                {id: 2, message: "I see your vidio!", likes: 13} 
                ],
            newposttext: 'type text'
        },
        Messagepage: {
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
        }
             },
    rerender() {
        console.log('_');
    },
    getstate() {
         return this._state
        },
 
    subscribe (observer) {
                this.rerender = observer;
              },
    dispatch(action) {

        this._state.Wallpage = profile_reducer(this._state.Wallpage, action);
        this._state.Messagepage = dialog_reducer(this._state.Messagepage,action);
        this.rerender(this._state); 

    }
    
}

export default store;