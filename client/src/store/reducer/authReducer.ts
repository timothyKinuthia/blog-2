import { AuthTypes } from '../actions/action-types/global';
import { Action } from '../actions/action-types/index';

const initialState = {
    token: "",
    user: {}
}

const authReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case AuthTypes.LOGIN_USER:
            return action.payload;
        case AuthTypes.REGISTER:
            return action.payload;
        case AuthTypes.REFRESH_TOKEN:
            return action.payload;
        default:
            return state
    }
};

export default authReducer;