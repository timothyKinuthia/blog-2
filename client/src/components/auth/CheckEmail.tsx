import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { GlobalTypes } from '../../store/actions/action-types/global';

const CheckEmail = () => {

    const dispatch = useDispatch();

    return (
        <div className="fixed inset-0 flex justify-center items-center">
            <div className="py-2 px-4 border bg-white">
                <p>Welcome to the <span className="text-ro font-bold text-lg">coolest</span> blog</p>
                <Link to="/login" onClick={() => dispatch({type: GlobalTypes.ALERT, payload: {}})} className="sm:text-lg text-ro font-bold">Click to continue</Link>
            </div>
        </div>
    )
}

export default CheckEmail;
