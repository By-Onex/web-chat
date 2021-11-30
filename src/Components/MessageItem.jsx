import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext';
import MessageStatus from './MessageStatus';


export default function MessageItem({messageData, userData, text, ...props}) {
    const root_classes = ['message-item'];
    const currentUser = useContext(UserContext).currentUser;
    let isMyMsg = true;
    if(userData)
        isMyMsg = currentUser.id === userData.id;
    if(isMyMsg) root_classes.push('my-message')
    
    return (
        <div className={root_classes.join(' ')}>
           { !isMyMsg && <div>{userData.name}</div> }
            <div style={{display:'flex', flexDirection: 'row', alignItems:'center'}}>
                <div>{text}</div>
                { isMyMsg && <MessageStatus statusServer={messageData.status} statusReading={messageData.reading}/> }
            </div>
            
        </div>
    )
}
