import React from 'react';
import { useSelector } from 'react-redux';
import { findUser } from '../store/chatSlice';
import MessageStatus from './MessageStatus';


export default function MessageItem({user_id, msg}) {
    const root_classes = ['message-item'];

    const user = useSelector(state => state.user.user);
    const userData = useSelector(state => findUser(state, user_id));

    let isMyMsg = userData && userData.id === user.id;
    if(isMyMsg) root_classes.push('my-message')
    
    return (
        <div className={root_classes.join(' ')}>
           { !isMyMsg && <div>{userData.name}</div> }
            <div style={{display:'flex', flexDirection: 'row', alignItems:'center'}}>
                <div>{msg.text}</div>
                { isMyMsg && <MessageStatus statusServer={msg.status} statusReading={msg.reading}/> }
            </div>
        </div>
    )
}
