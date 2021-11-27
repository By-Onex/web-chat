import React from 'react'
import '../Styles/user-form.css';

export default function ChatList({ chats, changeChat, ...props }) {
    return (
        <div className='user-list'>
            {
                chats.map(c =>
                    <div className="user-item" onClick={()=> {changeChat(c.id);}} key={c.id}> {c.name}</div>
                )
            }
        </div>
    )
}
