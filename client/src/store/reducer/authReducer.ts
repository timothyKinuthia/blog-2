import { AuthTypes } from '../actions/action-types/global';
import { Action } from '../actions/action-types/index';

//const initialState = {};

const authReducer = (state = {}, action: Action) => {
    switch (action.type) {
        case AuthTypes.LOGIN_USER:
            return action.payload
        default:
            return state
    }
};

export default authReducer;