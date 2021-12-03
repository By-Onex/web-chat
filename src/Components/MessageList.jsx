import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {setChatMessages, setChatUsers, findAllMessages} from '../store/chatSlice';

import MessageItem from './MessageItem';
import MyLoader from './MyLoaderd/MyLoader';

import * as api from '../API/ApiDB';

export default function MessageList() {
	const [isLoadingMessages, setIsLoadingMessages] = useState(false);

	const dispatch = useDispatch();

	const user = useSelector(store => store.user.user);
	const currentChat = useSelector(store => store.chat.current);
	const messages = useSelector(store => findAllMessages(store));
	
	useEffect(() => {
		const fetchData = async () => {
			setIsLoadingMessages(true);
			const users = await api.GetUsersInChat(currentChat);
			const messages = await api.GetChatMessages(currentChat);
			messages.map(m => {
				m.status = true;
				return m;
			})
			dispatch(setChatUsers(users));
			dispatch(setChatMessages(messages));
			setIsLoadingMessages(false);
		}
		if(user && currentChat && messages && messages.length === 0)
			fetchData();
	}, [currentChat, dispatch, messages, user]);
	
	if (isLoadingMessages) {
		return <div className='chat-list'>
			<MyLoader />
		</div>
	}
	if (!user) {
		return <div className='chat-list'>
			<h1>Авторизуйтесь чтобы пользоваться чатом</h1>
		</div>
	}
	
	return (
		<div className='chat-list'>
			{
				currentChat === null ? <h1>Выберите чат</h1> :
					messages.length === 0 ? <h1>Тут пусто</h1> :

						messages.map(m =>
								<MessageItem key={m.id} msg={m} user_id={m.user_id} />
							)
			}
		</div>
	)
}
