import React, { useState }  from 'react'

import MyModal from "./MyModal/MyModal";
import MyInput from "./MyInput/MyInput";
import MyButton from "./MyButton/MyButton"


import { UserLogin,  } from '../API/ApiDB';
import { login } from '../store/user';

import { useDispatch } from 'react-redux';
import * as ws from '../API/ws';

export default function LoginForm({visibility, setVisibility}) {
    const dispatch = useDispatch();
    const [userLogin, setUserLogin] = useState('');
    
    const Login = async () => {
        if(!userLogin) return;

        let auth_result = await UserLogin(userLogin);
        
        if(auth_result.error) {
            return console.log(auth_result.error);
        }
        dispatch(login({user:{id:auth_result.id, name:auth_result.name, expired: auth_result.expired}, token: auth_result.token}));
        setVisibility(false);
        ws.Connect();
    }

    return (
        <MyModal visibility={visibility} setVisibility={setVisibility}>
            <h1>Логин</h1>
            <MyInput value={userLogin} onChange={(e)=>{setUserLogin(e.target.value)}}/>
            <MyButton onClick={Login}>Войти</MyButton>
      </MyModal>
    )
}
