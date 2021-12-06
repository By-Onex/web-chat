import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setChatMessages, setChatUsers, findCurrentChat } from '../store/chatSlice';

import MessageItem from './MessageItem';
import MyLoader from './MyLoaderd/MyLoader';

import * as api from '../API/ApiDB';


export default function MessageList() {
	const [isLoadingMessages, setIsLoadingMessages] = useState(true);

	const dispatch = useDispatch();

	const user = useSelector(store => store.user.user);
	//const currentChat = useSelector(store => store.chat.current);
	const chat = useSelector(store => findCurrentChat(store));

	useEffect(() => {
		const fetchData = async () => {
			const users = await api.GetUsersInChat(chat.id);
			const messages = await api.GetChatMessages(chat.id);
			messages.map(m => {
				m.status = true;
				return m;
			})
			dispatch(setChatUsers(users));
			dispatch(setChatMessages({ messages, chat_id: chat.id }));
			setIsLoadingMessages(false);
		}
		if (user && chat && !chat.loading) {
			setIsLoadingMessages(true);
			fetchData();
		}
		else setIsLoadingMessages(false);
	}, [chat, dispatch, user]);

	let body;

	if (isLoadingMessages) {
		body = <MyLoader />;
	}
	else if (!user) {
		body =
			<div className='chat-info'>
				<h1 className='chat-info-body'>Авторизуйтесь чтобы пользоваться чатом</h1>
			</div>;
	}
	else if (!chat)
		body = <div className='chat-info'>
			<h1 className='chat-info-body'>Выберите чат</h1>
		</div>;
	else if (chat.messages.length === 0) {
		body =
			<div className='chat-info'>
				<h1 className='chat-info-body'>Тут пусто</h1>
			</div>;
	} else {
		let time = null;
		body = [];
		chat.messages.forEach(m => {
			const msgDate = m.date ? new Date(m.date) : new Date();
			if (time?.toLocaleDateString() !== msgDate.toLocaleDateString()) {
				time = msgDate;
				body.push(<div className='message-list-day' key={time.toLocaleDateString()}>{time.toLocaleDateString()}</div>);
			}
			body.push(<MessageItem key={m.id} msg={m} user_id={m.user_id} />);
		});
	}
	return <div className='message-list'> {body} </div>;
}
