import { Dispatch } from "redux";

import { AuthTypes, GlobalTypes } from "../action-types/global";
import { Action } from "../action-types";
import { IUserRegister, IUserLogin } from "../../../helpers/IUser";
import { getDataApi, postDataApi } from "../../../functions";
import { isValidPhone } from "../../../helpers/validateUser";

export const loginUser =
  (input: IUserLogin) => async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({ type: GlobalTypes.ALERT, payload: { loading: true } });
      const res = await postDataApi("login", input);
      dispatch({
        type: AuthTypes.LOGIN_USER,
        payload: res.data,
      });

      localStorage.setItem("logged", "true");

      dispatch({
        type: GlobalTypes.ALERT,
        payload: { success: "successfully logged in", loading: false },
      });
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
      dispatch({ type: GlobalTypes.ALERT, payload: { loading: true } });
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

export const googleLogin =
  (token: string) => async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({
        type: GlobalTypes.ALERT, payload: { loading: true },
      });
      const res = await postDataApi("google_login", { id_token: token });
      dispatch({ type: AuthTypes.GOOGLE_LOGIN, payload: res.data });
      localStorage.setItem("logged", "true");
      dispatch({
        type: GlobalTypes.ALERT, payload: { loading: false }
      });
    } catch (err: any) {
      dispatch({
        type: GlobalTypes.ALERT,
        payload: { errors: err.response.data.msg },
      });
    }
  };

export const facebookLogin =
  (accessToken: string, userID: string) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({
        type: GlobalTypes.ALERT, payload: { loading: true },
      });
      await postDataApi("facebook_login", { accessToken, userID });
      dispatch({
        type: GlobalTypes.ALERT, payload: { loading: false },
      });
    } catch (err) {}
  };

export const loginSMS =
  (phone: string) => async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({
        type: GlobalTypes.ALERT, payload: { loading: true },
      });
      if (!isValidPhone(phone)) {
        return dispatch({
          type: GlobalTypes.ALERT,
          payload: { errors: "Please enter a valid phone number" },
        });
      }
      const res = await postDataApi("login_sms", { phone });
      console.log(res);
      dispatch({
        type: GlobalTypes.ALERT, payload: { loading: false },
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
  }
};

export const logout = () => async (dispatch: Dispatch<Action>) => {
  try {
    await getDataApi("logout");
    localStorage.removeItem("logged");
    window.location.pathname = "/";
  } catch (err: any) {
    dispatch({
      type: GlobalTypes.ALERT,
      payload: { errors: err.response.data.msg },
    });
  }
};
