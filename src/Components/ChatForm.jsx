import React, { useEffect, useRef, useState } from 'react'

import '../Styles/chat-form.css';
import MyInput from './MyInput/MyInput';

import { GetChatMessages, GetUsersInChat, SendServerMessage } from '../API/ApiDB';
import MessageList from './MessageList';
import { useSelector } from 'react-redux';

let id_counter = -1;
export default function ChatForm() {
    //const [isLoadingMessages, setIsLoadingMessages] = useState(false);
   
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
    
    console.log('draw CHAT FORM');
    
    return (
        <div className='chat-form'>
           <MessageList messagesEl={messagesEl} />
            <div className='chat-bottom'>
                <MyInput value={myMessage} placeholder={'Сообщение'}
                    onKeyUp={(e) => { if (e.key === "Enter") {/*sendMessage()*/} }}
                    onChange={(e) => setMyMessage(e.target.value)}
                />
                <div /*onClick={sendMessage}*/>{'>'}</div>
            </div>
        </div>)
    /*
    //Пользователи чата
    const [users, setUsers] = useState([]);
    //Сообщения чата
    const [messages, setMessages] = useState([]);
    //Инпут чата
    const [myMessage, setMyMessage] = useState('');
    //Загрузка пользователей и сообщений
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    
    const user = useSelector(state => state.user.user);

    const [newServerMsg, setServerMsg] = useState(null);
    const getUserData = id => users.find((u) => u.id === id);
    //Получем список пользователей и сообщений чата
    useEffect(() => {
        if(!currentChat) return;

        const fetchData = async () => {
            setIsLoadingMessages(true);
            setUsers(await GetUsersInChat(currentChat));
            const chatMessages = await GetChatMessages(currentChat);
            chatMessages.forEach(msg => {
                msg.status = true;
            });
            setMessages(chatMessages);
            setIsLoadingMessages(false);
        }
        fetchData();
    }, [currentChat]);

    //При смене чата или добавлении нового сообщения опускаем скрол в низ
    const messagesEl = useRef(null);
    useEffect(() => {
        if (messagesEl) {
           messagesEl.current.scroll({top: messagesEl.current.scrollHeight , behavior: 'auto' })
        }
    }, [messages, currentChat]);

    //отправить сообщение
    const sendMessage = async () => {
        if(!currentChat) return;
        //Отправялем сообщение на сервер
        const sendData = {
            id: --id_counter,
            user_id: user.id,
            chat_id: currentChat,
            text: myMessage,
            reading: false,
            status: false,
        };
        setMessages([...messages, sendData]);
        setMyMessage('');
        let result = await SendServerMessage(currentChat, user.id, sendData.text);
        result.old_id = sendData.id;
        setServerMsg(result);
    }

    useEffect(()=>{
        if(!newServerMsg) return;
        const result = newServerMsg;
        const updateMessages = messages.map(m => {
            if(m.id === result.old_id){
                return {...m, id: result.id, status:true}
            }
            return m;
        });
        setMessages(updateMessages);
    },[newServerMsg, messages]);

    console.log('draw CHAT FORM');
    return (
        <div className='chat-form'>
           <MessageList
                isLoading={isLoadingMessages}
                messagesEl={messagesEl}
                messages={messages}
                getUserData={getUserData}
            />
            <div className='chat-bottom'>
                <MyInput value={myMessage} placeholder={'Сообщение'}
                    onKeyUp={(e) => { if (e.key === "Enter") sendMessage() }}
                    onChange={(e) => setMyMessage(e.target.value)}
                />
                <div onClick={sendMessage}>{'>'}</div>
            </div>
        </div>
    )*/
}
