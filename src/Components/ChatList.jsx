import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectChat, setChats } from '../store/chatSlice';
import '../Styles/user-form.css';
import MyLoader from './MyLoaderd/MyLoader';
import * as api from '../API/ApiDB'


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


    return (
        <div className='user-list'>
            {
                isLoadingChats ? <MyLoader /> :
                    chats.map(c =>
                        <div className="user-item"
                            key={c.id}
                            onClick={() => { dispatch(selectChat(c.id)); }}>
                            <span>{c.name}</span>
                            { (c.newMessages > 0) && <span>{' '+c.newMessages}</span>}
                            
                        </div>
                    )
            }
        </div>
    )
}
