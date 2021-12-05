import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as api from '../API/ApiDB';
import { addMessage, changeMessage, setCurrentMessage } from '../store/chatSlice';
import '../Styles/chat-form.css';
import MessageList from './MessageList';
import MyInput from './MyInput/MyInput';



let id_counter = -1;
export default function ChatForm() {
   
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    //Инпут чата
    const currentMessage = useSelector(state => state.chat.currentMessage);
    //const [myMessage, setMyMessage] = useState('');
    const currentChat = useSelector(state => state.chat.current);
    
    const SendMessage = async () => {
        if(!currentChat) return;
        let message = {
            id: id_counter--,
            user_id: user.id,
            chat_id: currentChat,
            text: currentMessage,
            reading: false,
            status: false,
        }
        dispatch(addMessage(message));
        dispatch(setCurrentMessage(''));
        let result = await api.SendServerMessage(currentChat, user.id, message.text);
        result.old_id = message.id;
        dispatch(changeMessage(result));
    }
    
    return (
        <div className='chat-form'>
           <MessageList />
            <div className='chat-bottom'>
                <MyInput value={currentMessage} placeholder={'Сообщение'}
                    onKeyUp={(e) => { if (e.key === "Enter") {SendMessage()} }}
                    onChange={(e) => dispatch(setCurrentMessage(e.target.value))}
                />
                <div className='chat-bottom-button' onClick={SendMessage}>{'>'}</div>
            </div>
        </div>)
}
