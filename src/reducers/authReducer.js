import { types } from "../types/types";

const intialState = {
    checking: true,
    // uid: null,
    // name: null
}

export const authReducer = (state = intialState,action) => {

    switch(action.type){

        case types.authLogin:
            return{
                ...state,
                checking: false,
                ...action.payload
            }

        case types.authCheckingFinish:
            return{
                ...state,
                checking: false
            }

        case types.authLogout:
            return{
                checking: false
            }

        default:
            return state;
    }

}


