import React, { useContext } from 'react'

import MyButton from './MyButton/MyButton';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/user';

export default function TopNav({ showLogin, ...props }) {

    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch();

    const Logout = () => {
        if(user)
            dispatch(logout());
    }

    return (
        <div>
            {user ?
                <MyButton onClick={Logout}>Выйти</MyButton> :
                <MyButton onClick={() => { showLogin(true) }}>Войти</MyButton>
            }
        </div>
    )
}
