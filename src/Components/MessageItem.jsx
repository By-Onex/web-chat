import React, {useRef, useEffect, useCallback, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Send } from '../API/ws';
import { findUser, notifyReadMessage } from '../store/chatSlice';
import MessageStatus from './MessageStatus';

export default function MessageItem({user_id, msg}) {
    const root_classes = ['message-row'];
    const [dateUpdate, setDateUpdate] = useState(getTime(msg.date));
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const userData = useSelector(state => findUser(state, user_id));
    const ref = useRef();

    let isMyMsg = userData && userData.id === user.id;
    if(isMyMsg) root_classes.push('my-message');
    if(!isMyMsg && !msg.reading) root_classes.push('unreading-message');
    
    const HoverEvent = useCallback(()=> {
        if(!isMyMsg && !msg.reading) {
            dispatch(notifyReadMessage(msg.id));
            Send('NOTIFY_READ_MESSAGE', { id: msg.id });
        }
    }, [isMyMsg, msg.reading, dispatch, msg.id]);

    function getTime (date) {
        
        let msgDate = date ? new Date(date) : new Date();
        const diffTime = Math.floor((new Date() - msgDate)/1000);
        const min = Math.floor(diffTime / 60);
        if(diffTime <= 60)
            return 'Только что';
        else if(min === 1)
            return `${min} минуту назад`;
        else if(min >= 1 && min <= 4)
            return `${min} минуты назад`;

        let time = msgDate.toLocaleTimeString().split(':');
        return `${time[0]}:${time[1]}`;
    }

    useEffect(() => {
        if (!isMyMsg && msg.reading === false) {
            let timerID;
            const observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    timerID = setInterval(HoverEvent, 1000 * 60);
                }
            });
                
            observer.observe(ref.current);
            
            return () => {
                observer.disconnect();
                clearTimeout(timerID);
            }
        }
    }, [dispatch, msg.reading, msg.id, isMyMsg, HoverEvent]);

    useEffect(()=>{
        const timerID = setTimeout(()=>{setDateUpdate(Date.now())}, 1000 * 60);
        return () => {
            clearTimeout(timerID);
        }
    }, [dateUpdate, msg.date]);

    return (
        <div className={root_classes.join(' ')} ref={ref} >
            <div className='message-item' onMouseEnter={!isMyMsg && !msg.reading ? HoverEvent: null}>
            { !isMyMsg && <div>{userData.name} {getTime(msg.date)}</div> }
                <div style={{display:'flex', flexDirection:'column'}}>
                    <div style={{alignSelf:'start'}}>{msg.text}</div>
                    {
                        isMyMsg &&
                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-end', flexDirection:'row'}}>
                            {getTime(msg.date)}
                            <MessageStatus statusServer={msg.status} statusReading={msg.reading}/> 
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
