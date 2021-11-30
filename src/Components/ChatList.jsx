import React from 'react'
import '../Styles/user-form.css';
import MyLoader from './MyLoaderd/MyLoader';

export default function ChatList({ isLoading, chats, changeChat, ...props }) {
    return (
        <div className='user-list'>
            {
                isLoading ? <MyLoader/> :
                chats.map(c =>
                    <div className="user-item" onClick={()=> {changeChat(c.id);}} key={c.id}> {c.name}</div>
                )
            }
        </div>
    )
}
