import { AuthTypes } from "../actions/action-types/global";
import { Action } from "../actions/action-types/index";
import { IAUTH } from "../../helpers/IUser";

const initialState = {
  token: "",
  user: {
    account: "",
    password: "",
    role: "",
    type: "",
    isActivated: false,
    _id: "",
    name: "",
    avatar: "",
    createdAt: "",
    updatedAt: "",
  },
};

const authReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case AuthTypes.LOGIN_USER:
      return action.payload;
    case AuthTypes.REGISTER:
      return action.payload;
    case AuthTypes.REFRESH_TOKEN:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
