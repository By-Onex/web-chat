import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as api from '../API/ApiDB';
import { addMessage, changeMessage } from '../store/chatSlice';
import '../Styles/chat-form.css';
import MessageList from './MessageList';
import MyInput from './MyInput/MyInput';



let id_counter = -1;
export default function ChatForm() {
   
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    //Инпут чата
    const [myMessage, setMyMessage] = useState('');
    const currentChat = useSelector(state => state.chat.current);
    //При смене чата или добавлении нового сообщения опускаем скрол в низ
    const messagesEl = useRef(null);
    
    useEffect(() => {
        if (messagesEl) {
           messagesEl.current.scroll({top: messagesEl.current.scrollHeight , behavior: 'auto' })
        }
    }, [currentChat]);
    
    const SendMessage = async () => {
        if(!currentChat) return;
        let message = {
            id: id_counter--,
            user_id: user.id,
            chat_id: currentChat,
            text: myMessage,
            reading: false,
            status: false,
        }
        dispatch(addMessage(message));
        setMyMessage('');
        let result = await api.SendServerMessage(currentChat, user.id, message.text);
        result.old_id = message.id;
        dispatch(changeMessage(result));
    }

    console.log('draw CHAT FORM');
    
    return (
        <div className='chat-form'>
           <MessageList messagesEl={messagesEl} />
            <div className='chat-bottom'>
                <MyInput value={myMessage} placeholder={'Сообщение'}
                    onKeyUp={(e) => { if (e.key === "Enter") {SendMessage()} }}
                    onChange={(e) => setMyMessage(e.target.value)}
                />
                <div onClick={SendMessage}>{'>'}</div>
            </div>
        </div>)
}
