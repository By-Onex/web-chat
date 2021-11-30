import React, { useContext } from 'react'

import { UserContext } from '../Context/UserContext';
import MyButton from './MyButton/MyButton';

export default function TopNav({showLogin, ...props}) {

    const userData = useContext(UserContext);

    const Logout = () => {
        localStorage.clear();
        userData.setCurrentUser(null);
    }

    return (
        <div>
            {userData.currentUser ?
            <MyButton onClick={Logout}>Выйти</MyButton> :
            <MyButton onClick={()=>{ showLogin(true)}}>Войти</MyButton>
            }
        </div>
    )
}
