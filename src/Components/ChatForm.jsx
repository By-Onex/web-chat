import React, { useEffect, useRef, useContext, useMemo, useState } from 'react'
import MessageItem from './MessageItem';
import '../Styles/chat-form.css';
import MyInput from './MyInput/MyInput';
import { UserContext } from '../Context/UserContext';

let last_id = 100;

export default function ChatForm({ pushMessage, messages, setMessages, users, currentChat, ...props }) {
    
    console.log(users, messages);

    const sortComp = (a, b) => {
        return a.id - b.id;
    }

    const getUserData = (id) => {
        return users.find((u) => u.id === id);
    }

    useEffect(() => {
        const reqOpt = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        };
        fetch(`http://localhost:9000/chat/${currentChat}/message`, reqOpt)
          .then(res => res.json(), (error) => console.log(error))
          .then(data => {setMessages(data); console.log(data)}, (error) => console.log(error))
      }, [currentChat]);

    const messagesEl = useRef(null);
    useEffect(() => {
        if (messagesEl) {
           const last = messagesEl.current.lastChild;
           console.log(messagesEl.current.scrollHeight);
           messagesEl.current.scroll({top: messagesEl.current.scrollHeight , behavior: 'auto' })
        }
    }, [messages, currentChat]);
    const currentUser = useContext(UserContext);

    const userData = getUserData(currentChat);

    /*const messageData = useMemo(() => {
        console.log("useMemo")
        return messages.sort(sortComp).filter(m => m.from === currentChat || m.to === currentChat);
    }, [currentChat, messages]); */
    const messageData = messages;

    console.log("re draw")
    const [myMessage, setMessage] = useState('');

    const sendMessage = () => {
        //Отправялем сообщение на сервер
        const sendData = {
            id: last_id++,
            from: currentUser.id,
            to: currentChat,
            text: myMessage
        };
        pushMessage(sendData);
        setMessage('');
    }


    return (
        <div className='chat-form'>
            <div className='chat-list' ref={messagesEl}>
                {
                    messageData.length === 0 ? <h1>Тут пусто</h1> :
                        messageData.map(m => <MessageItem key={m.id} messageData={m} userData={getUserData(m.from_id)} text={m.message} />)
                }
            </div>
            <div className='chat-bottom'>
                <MyInput value={myMessage} placeholder={'Сообщение'}
                    onKeyUp={(e) => { if (e.key === "Enter") sendMessage() }}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <div onClick={() => sendMessage()}>{'>'}</div>
            </div>
        </div>
    )
}
