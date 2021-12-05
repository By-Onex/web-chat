import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {setChatMessages, setChatUsers, findAllMessages} from '../store/chatSlice';

import MessageItem from './MessageItem';
import MyLoader from './MyLoaderd/MyLoader';

import * as api from '../API/ApiDB';


export default function MessageList() {
	const [isLoadingMessages, setIsLoadingMessages] = useState(true);

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
		else setIsLoadingMessages(false);
	}, [currentChat, dispatch, messages, user]);
	
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
	else if (!currentChat)
		body = <div className='chat-info'>
			<h1 className='chat-info-body'>Выберите чат</h1>
		</div>;
	else if(messages.length === 0) {
		body =
		<div className='chat-info'>
			<h1 className='chat-info-body'>Тут пусто</h1>
		</div>;
	}else {
		let time = new Date();
		body = [];
		messages.forEach(m => {
			const msgDate = new Date(m.date);
			if(time.toLocaleDateString() !== msgDate.toLocaleDateString()) {
				time = msgDate;
				body.push(<div className='message-list-day' key={time.toLocaleDateString()}>{time.toLocaleDateString()}</div>);
			}
			body.push(<MessageItem key={m.id} msg={m} user_id={m.user_id} />);
		});
	}
	return <div className='message-list'> {body} </div>;

}
