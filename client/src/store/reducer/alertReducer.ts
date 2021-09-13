import { GlobalTypes } from '../actions/action-types/global';
import { Action } from '../actions/action-types/index';

export interface IAlert {
    msg?: string;
    success?: string
};

const initialState = {
    msg: "",
    success: ""
};

const alertReducer = (state: IAlert = initialState, action: Action) => {
    switch (action.type) {
        case GlobalTypes.ALERT:
            return action.payload;
        default:
            return state;
    }
};

export default alertReducer;