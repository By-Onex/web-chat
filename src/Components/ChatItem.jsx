import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectChat } from '../store/chatSlice';
export default function ChatItem({chatData}) {
    const dispatch = useDispatch();
    const currentChat = useSelector(state => state.chat.current);
    const rootStyles = ['chat-item'];
    if(currentChat === chatData.id) rootStyles.push('chat-current');

    return (
        <div className={rootStyles.join(' ')} onClick={() => { dispatch(selectChat(chatData.id))} }>
        <span>{chatData.name}</span>
        { (chatData.unreading > 0) && <div className='chat-unreading-messsages'>{chatData.unreading}</div>}
    </div>
    )
}
