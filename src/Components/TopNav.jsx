import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/user';
import MyButton from './MyButton/MyButton';


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
