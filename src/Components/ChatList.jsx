import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as api from '../API/ApiDB';
import * as ws from '../API/ws';
import { setChats } from '../store/chatSlice';
import '../Styles/user-form.css';
import ChatItem from './ChatItem';
import MyLoader from './MyLoaderd/MyLoader';

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
        if(user) {
            ws.Connect();
            fetchData();
        }
        else {
            dispatch(setChats([]));
        }
    },[dispatch, user]);


    return (
        <div className='chat-list'>
            {
                isLoadingChats ? <MyLoader /> :
                    <div className='chat-body-items'>
                        {
                            chats.map(c => <ChatItem key={c.id} chatData={c} />)
                        }
                        
                        <div className='chat-space' />
                    </div>
            }
        </div>
    )
}
