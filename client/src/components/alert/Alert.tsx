import React from 'react';

import { useTypedSelector } from "../../hooks/useTypeSelector";
//import Loading from '../loading/Loading';
import Toast from './Toast';

const Alert = () => {

    //redux
    const { alert } = useTypedSelector((state) => ({ ...state }));

    return (
        <div className="">
            {/* {alert?.loading && <Loading />} */}
            {alert?.errors && <Toast title="sorry !" text={alert.errors} />}
            {alert?.success && <Toast title="success" text={alert.success} success />}
        </div>
    )
};

export default Alert;
