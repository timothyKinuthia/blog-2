import { GlobalTypes } from '../actions/action-types/global';
import { Action } from '../actions/action-types/index';

export interface IAlert {
    loading?: boolean;
    success?: string | string[];
    errors?: string | string[];
};


const alertReducer = (state: IAlert = {}, action: Action) => {
    switch (action.type) {
        case GlobalTypes.ALERT:
            return action.payload;
        default:
            return state;
    }
};

export default alertReducer;