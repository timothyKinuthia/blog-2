import { AuthTypes, GlobalTypes } from "./global";
import { IAUTH } from '../../../helpers/IUser';
import { IAlert } from '../../reducer/alertReducer';

interface UserLogin {
    type: AuthTypes.LOGIN_USER;
    payload?: IAUTH
};

interface UserRegister {
    type: AuthTypes.LOGIN_USER;
    payload?: IAUTH
};

interface Alert {
    type: GlobalTypes.ALERT
    payload?: IAlert
}

export type Action = UserLogin | UserRegister | Alert;