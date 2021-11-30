import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../Context/UserContext';
import '../Styles/user-form.css';
import MyLoader from './MyLoaderd/MyLoader';
import * as api from "../API/ApiDB";

import { useDispatch, useSelector } from 'react-redux';
import {addChats} from '../store/chatSlice';


export default function ChatList({changeChat, ...props }) {
    const dispatch = useDispatch();
    const [isLoadingChats, setIsLoadingChats] = useState(false);
    
    const chats = useSelector(state => state.chat.chats);
    const userCont = useContext(UserContext);
    const currentUser = userCont.currentUser;
    
    useEffect(()=>{
        const fetchData = async () => {
            const result = await api.GetUserChats(currentUser.id);
            dispatch(addChats(result));
        }
        if(currentUser) fetchData();
    },[dispatch, currentUser]);

    console.log("draw Chat List");

    return (
        <div className='user-list'>
            {
                isLoadingChats ? <MyLoader /> :
                    chats.map(c =>
                        <div className="user-item" onClick={() => { changeChat(c.id); }} key={c.id}> {c.name}</div>
                    )
            }
        </div>
    )
}
