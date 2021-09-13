import { Dispatch } from "redux";

import { AuthTypes, GlobalTypes } from '../action-types/global';
import { Action } from "../action-types";
import { IUserLogin } from '../../../helpers/IUser';
import { postDataApi } from "../../../functions";

export const loginUser =
  (input: IUserLogin) => async (dispatch: Dispatch<Action>) => {
    try {
      const res = await postDataApi("login", input);
      dispatch({
        type: AuthTypes.LOGIN_USER,
        payload: res.data,
      });
    } catch (err: any) {
      dispatch({type: GlobalTypes.ALERT, payload: err.response.data});
    }
  };
