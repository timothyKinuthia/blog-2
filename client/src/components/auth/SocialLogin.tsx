import React from "react";
import { useDispatch } from "react-redux";
import { GoogleLogin, GoogleLoginResponse } from "react-google-login-lite";

import { googleLogin } from "../../store/actions/action-creators/authActions";

const SocialLogin = () => {
  //redux
  const dispatch = useDispatch();

  const onSuccess = (googleUser: GoogleLoginResponse) => {
    const idToken = googleUser.getAuthResponse().id_token;
    dispatch(googleLogin(idToken));
  };

  const onFailure = (err: any) => {
    console.log(err);
  };

  return (
    <GoogleLogin
      client_id="813509908479-98u5q1gic901718snjpc34p0fbrsk1rl.apps.googleusercontent.com"
      cookiepolicy="single_host_origin"
      onSuccess={onSuccess}
      onFailure={onFailure}
      theme="light"
    />
  );
};

export default SocialLogin;
