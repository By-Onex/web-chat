import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearData } from '../store/chatSlice';
import { logout } from '../store/user';
import MyButton from './MyButton/MyButton';
import * as ws from '../API/ws';

export default function TopNav({ showLogin }) {

    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch();

    const Logout = () => {
        dispatch(clearData())
        dispatch(logout());
        ws.Close();
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
