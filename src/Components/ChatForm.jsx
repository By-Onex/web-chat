import React, { useEffect, useRef, useContext, useState } from 'react'
import MessageItem from './MessageItem';
import '../Styles/chat-form.css';
import MyInput from './MyInput/MyInput';
import { UserContext } from '../Context/UserContext';
import { GetChatMessages, GetUsersInChat, SendServerMessage } from '../API/ApiDB';

export default function ChatForm({currentChat, ...props }) {

    //Пользователи чата
    const [users, setUsers] = useState([]);
    //Сообщения чата
    const [messages, setMessages] = useState([]);
    //Инпут чата
    const [myMessage, setMyMessage] = useState('');

    const [isLoading, setIsLoading] = useState(false)
    
    const currentUser = useContext(UserContext).currentUser;

    //const sortComp = (a, b) => a.id - b.id;
    
    const getUserData = id => users.find((u) => u.id === id);
    
    //Получем список пользователей и сообщений чата
    useEffect(() => {
        if(!currentChat) return;

        const fetchData = async () => {
            setIsLoading(true);
            const data1 =  GetUsersInChat(currentChat)
            const data2 =  GetChatMessages(currentChat)
            setUsers( await data1);
            setMessages( await data2);
            setIsLoading(false);
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
    const sendMessage = () => {
        //Отправялем сообщение на сервер
        const sendData = {
            id: 1000,
            user_id: currentUser.id,
            chat_id: currentChat,
            text: myMessage
        };
        setMessages([...messages, sendData]);
       
        SendServerMessage(currentChat, currentUser.id, myMessage)
        .then(data => console.log(data));
        setMyMessage('');
    }
    
    return (
        <div className='chat-form'>
            <div className='chat-list' ref={messagesEl}>
                {
                    currentChat=== null ? <h1>Выберите чат</h1> :
                    messages.length === 0 ? <h1>Тут пусто</h1> :
                    !isLoading &&
                    messages.map(m => <MessageItem key={m.id} messageData={m} userData={getUserData(m.user_id)} text={m.text} />)
                }
            </div>
            <div className='chat-bottom'>
                <MyInput value={myMessage} placeholder={'Сообщение'}
                    onKeyUp={(e) => { if (e.key === "Enter") sendMessage() }}
                    onChange={(e) => setMyMessage(e.target.value)}
                />
                <div onClick={() => sendMessage()}>{'>'}</div>
            </div>
        </div>
    )
}
