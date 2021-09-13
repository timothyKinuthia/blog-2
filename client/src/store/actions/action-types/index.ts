import { ActionTypes } from "../global";

interface UserLogin {
    type: ActionTypes.LOGIN_USER
};

export type Action = UserLogin;