import { Dispatch } from "redux";

import { ActionTypes } from "../global";
import { Action } from "../action-types";
import { IUserLogin } from '../../../helpers/Typescript';
import { postDataApi } from "../../../functions";

export const loginUser = (input: IUserLogin) => async (dispatch: Dispatch<Action>) => {
    
    try {
        const res = await postDataApi("login", input);

        console.log(res);
    } catch (err: any) {
        console.log(err.response.data.msg)
    }
}