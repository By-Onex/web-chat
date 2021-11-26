import React from 'react'
import '../Styles/user-form.css';

export default function UserList({ chats, changeChat, ...props }) {
    return (
        <div className='user-list'>
            {
                chats.map(u =>
                    <div className="user-item" onClick={()=> {changeChat(u.id);}} key={u.id}> {u.title} </div>
                )
            }
        </div>
    )
}
