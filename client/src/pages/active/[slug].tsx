import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useTypedSelector } from "../../hooks/useTypeSelector";
import { IParams } from "../../helpers/Typescript";
import { postDataApi } from "../../functions";
import { GlobalTypes } from "../../store/actions/action-types/global";
import CheckEmail from "../../components/auth/CheckEmail";

const Active = () => {
  //redux
    const dispatch = useDispatch();
    const { alert } = useTypedSelector((state) => ({ ...state }));


  const { slug }: IParams = useParams();


  useEffect(() => {
    (async () => {
      try {
        await postDataApi("activate", { activationToken: slug });

        dispatch({
          type: GlobalTypes.ALERT,
          payload: { success: "Account has been activated successfully" },
        });
      } catch (err: any) {
        dispatch({
          type: GlobalTypes.ALERT,
          payload: { errors: err.response.data.msg },
        });
      }
    })();
  }, [slug, dispatch]);

  return (
    <div>
          {alert?.errors ? <h2>session expired</h2> : <CheckEmail />}
    </div>
  );
};

export default Active;
