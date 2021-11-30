import React, { useContext, useState }  from 'react'

import MyModal from "./MyModal/MyModal";
import MyInput from "./MyInput/MyInput";
import MyButton from "./MyButton/MyButton"

import { UserContext } from '../Context/UserContext';

import { SetToken, UserLogin,  } from '../API/ApiDB';

export default function LoginForm({visibility, setVisibility}) {

    const userData = useContext(UserContext);
    const [userLogin, setUserLogin] = useState('');
    
    const Login = async () => {
        if(!userLogin) return;

        let auth_result = await UserLogin(userLogin);
        
        if(auth_result.error) {
            return console.log(auth_result.error);
        }
        console.log(auth_result);
        
        localStorage.setItem('token', auth_result.token);
        localStorage.setItem('id', auth_result.id);
        localStorage.setItem('name',  auth_result.name);
        SetToken(auth_result.token);
        userData.setCurrentUser({id: auth_result.id, name: auth_result.name})
        setVisibility(false);
    }

    return (
        <MyModal visibility={visibility} setVisibility={setVisibility}>
            <h1>Логин</h1>
            <MyInput value={userLogin} onChange={(e)=>{setUserLogin(e.target.value)}}/>
            <MyButton onClick={Login}>Войти</MyButton>
      </MyModal>
    )
}
