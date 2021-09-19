import { Dispatch } from "redux";

import { AuthTypes, GlobalTypes } from "../action-types/global";
import { Action } from "../action-types";
import { IUserRegister, IUserLogin } from "../../../helpers/IUser";
import { getDataApi, postDataApi } from "../../../functions";

export const loginUser =
  (input: IUserLogin) => async (dispatch: Dispatch<Action>) => {
    try {
      const res = await postDataApi("login", input);
      dispatch({
        type: AuthTypes.LOGIN_USER,
        payload: res.data,
      });
      dispatch({
        type: GlobalTypes.ALERT,
        payload: { success: "successfully logged in" },
      });
      localStorage.setItem("logged", "true");
    } catch (err: any) {
      dispatch({
        type: GlobalTypes.ALERT,
        payload: { errors: err.response.data.msg },
      });
    }
  };

export const registerUser =
  (input: IUserRegister) => async (dispatch: Dispatch<Action>) => {
    try {
      //dispatch({ type: GlobalTypes.ALERT, payload: { loading: true } });
      const res = await postDataApi("register", input);

      dispatch({
        type: AuthTypes.REGISTER,
        payload: res.data,
      });
      dispatch({
        type: GlobalTypes.ALERT,
        payload: {
          loading: false,
          success: "Successfully registered, check your email to continue",
        },
      });
    } catch (err: any) {
      dispatch({
        type: GlobalTypes.ALERT,
        payload: { errors: err.response.data.msg },
      });
    }
  };

export const refreshToken = () => async (dispatch: Dispatch<Action>) => {
  if (localStorage.getItem("logged")) {
    try {
      
      const res = await getDataApi("refresh_token");
      dispatch({ type: AuthTypes.REFRESH_TOKEN, payload: res.data });

    } catch (err: any) {
      dispatch({
        type: GlobalTypes.ALERT,
        payload: { errors: err.response.data.msg },
      });
    }
  };
};
