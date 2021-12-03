import React, {useRef, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Send } from '../API/ws';
import { findUser, notifyReadMessage } from '../store/chatSlice';
import MessageStatus from './MessageStatus';

export default function MessageItem({user_id, msg}) {
    const root_classes = ['message-row'];

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const userData = useSelector(state => findUser(state, user_id));

    const ref = useRef();

    let isMyMsg = userData && userData.id === user.id;
    if(isMyMsg) root_classes.push('my-message');
    if(!isMyMsg && !msg.reading) root_classes.push('unreading-message');
    useEffect(() => {
        if (!isMyMsg && msg.reading === false) {
            const observer = new IntersectionObserver(([entry]) => {
                if(entry.isIntersecting) {
                    setTimeout(() => dispatch(notifyReadMessage(msg.id)), 2000);
                    Send('NOTIFY_READ_MESSAGE', {id:msg.id});
                }
            });
                
            observer.observe(ref.current);
            
            return () => {
                observer.disconnect();
            }
        }
    }, [dispatch, msg.reading, msg.id, isMyMsg])

    return (
        <div className={root_classes.join(' ')} ref={ref}>
            <div className='message-item'>
            { !isMyMsg && <div>{userData.name}</div> }
                <div style={{display:'flex', flexDirection: 'row', alignItems:'center'}}>
                    <div>{msg.text}</div>
                    { isMyMsg && <MessageStatus statusServer={msg.status} statusReading={msg.reading}/> }
                </div>
            </div>
        </div>
    )
}
