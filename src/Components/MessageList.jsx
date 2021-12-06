import React, { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setChatMessages, setChatUsers, findCurrentChat } from '../store/chatSlice';

import MessageItem from './MessageItem';
import MyLoader from './MyLoaderd/MyLoader';

import * as api from '../API/ApiDB';


export default function MessageList() {
	const [isLoadingMessages, setIsLoadingMessages] = useState(true);

	const dispatch = useDispatch();

	const user = useSelector(store => store.user.user);
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

	const getMessages = useMemo(() => {
		let list = [];
		let time = null;
		if (!chat) return list;
		const toDay = new Date().toLocaleDateString();
		chat.messages.forEach(m => {
			const msgDate = m.date ? new Date(m.date) : new Date();
			if ( time !== msgDate.toLocaleDateString()) {
				time = msgDate.toLocaleDateString();
				
				list.push(<div className='message-list-day' key={time}>{toDay === time ? 'Сегодня' : time}</div>);
			}
			list.push(<MessageItem key={m.id} msg={m} user_id={m.user_id} />);
		});
		return list;
	}, [chat]);

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
	else if (getMessages.length === 0) {
		body =
			<div className='chat-info'>
				<h1 className='chat-info-body'>Тут пусто</h1>
			</div>;
	} else body = getMessages;

	return <div className='message-list'> {body} </div>;
}
