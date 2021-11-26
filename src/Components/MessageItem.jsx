import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext';


export default function MessageItem({messageData, userData, text, ...props}) {
    const root_classes = ['message-item'];
    
    const currentUser = useContext(UserContext).currentUser;

    console.log(currentUser);
    const isMyMsg = currentUser.id === userData.id;
    if(isMyMsg) root_classes.push('my-message')
    
    return (
        <div className={root_classes.join(' ')}>
           { !isMyMsg && <div>{userData.name}</div> }
            <div>{text}</div>
        </div>
    )
}
