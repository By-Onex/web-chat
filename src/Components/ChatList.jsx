import React, { useState, useContext, useEffect } from 'react'

import '../Styles/user-form.css';
import MyLoader from './MyLoaderd/MyLoader';
import * as api from "../API/ApiDB";

import { useDispatch, useSelector } from 'react-redux';
import {setChats, selectChat} from '../store/chatSlice';


export default function ChatList() {
    const dispatch = useDispatch();
    const [isLoadingChats, setIsLoadingChats] = useState(false);
    
    const chats = useSelector(state => state.chat.chatList);
    const user = useSelector(state => state.user.user);
    
    useEffect(()=>{
        const fetchData = async () => {
            setIsLoadingChats(true);
            const result = await api.GetUserChats(user.id);
            dispatch(setChats(result));
            setIsLoadingChats(false);
        }
        if(user) fetchData();
        else {
            dispatch(setChats([]));
        }
    },[dispatch, user]);

    console.log("draw Chat List");

    return (
        <div className='user-list'>
            {
                isLoadingChats ? <MyLoader /> :
                    chats.map(c =>
                        <div className="user-item"
                            key={c.id}
                            onClick={() => { dispatch(selectChat(c.id)); }}>
                            {c.name}
                        </div>
                    )
            }
        </div>
    )
}
