import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext';
import MessageItem from './MessageItem';
import MyLoader from './MyLoaderd/MyLoader';

export default function MessageList({ isLoading, messagesEl, getUserData, messages, currentChat, ...props }) {
	const userData = useContext(UserContext).currentUser;
	if (isLoading) {
		return <div className='chat-list' ref={messagesEl}>
			<MyLoader />
		</div>
	}
	else if (userData === null) {
		return <div className='chat-list' ref={messagesEl}>
			<h1>Авторизуйтесь чтобы пользоваться чатом</h1>
		</div>
	}
	return (
		<div className='chat-list' ref={messagesEl}>
			{
				currentChat === null ? <h1>Выберите чат</h1> :
					messages.length === 0 ? <h1>Тут пусто</h1> :

						messages.filter(m => getUserData(m.user_id) !== undefined)
							.map(m =>
								<MessageItem key={m.id} messageData={m} userData={getUserData(m.user_id)} text={m.text} />
							)
			}
		</div>
	)
}
