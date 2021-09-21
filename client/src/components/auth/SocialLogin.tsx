import React from "react";
import { useDispatch } from "react-redux";
import { GoogleLogin, GoogleLoginResponse } from "react-google-login-lite";
import {
  FacebookLogin,
  FacebookLoginAuthResponse,
} from "react-facebook-login-lite";

import { googleLogin, facebookLogin } from "../../store/actions/action-creators/authActions";

const SocialLogin = () => {
  //redux
  const dispatch = useDispatch();

  //GOOGLE
  const onGgSuccess = (googleUser: GoogleLoginResponse) => {
    const idToken = googleUser.getAuthResponse().id_token;
    dispatch(googleLogin(idToken));
  };

  const onGgFailure = (err: any) => {
    console.log(err);
  };

  //FACEBOOK
  const onFBSuccess = (response: FacebookLoginAuthResponse) => {
    const { accessToken, userID } = response.authResponse;
      dispatch(facebookLogin(accessToken, userID))
  };

  const onFBFailure = (error: any) => {
    console.log(error);
  };

  return (
    <>
      <div>
        <GoogleLogin
          client_id="813509908479-98u5q1gic901718snjpc34p0fbrsk1rl.apps.googleusercontent.com"
          cookiepolicy="single_host_origin"
          onSuccess={onGgSuccess}
          onFailure={onGgFailure}
          theme="light"
        />
      </div>
      <div className="mt-4">
        <FacebookLogin
          appId="878588482775430"
          onSuccess={onFBSuccess}
          onFailure={onFBFailure}
        />
      </div>
    </>
  );
};

export default SocialLogin;
