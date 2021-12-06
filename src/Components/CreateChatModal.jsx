import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as api from '../API/ApiDB';
import { addChat } from '../store/chatSlice';
import { changeInput, toggleModal } from '../store/modalSlice';
import MyButton from './MyButton/MyButton';
import MyInput from './MyInput/MyInput';
import MyModal from './MyModal/MyModal';
import UserList from './UserList';

export default function CreateChatModal() {
    const modal = useSelector(state => state.modal.createChatModal);
    const dispatch = useDispatch();

    const createChat = async (e) => {
        e.preventDefault();
        const result = await api.CreateChat(modal.chatNameInput, modal.list.filter(e => e.checked).map(e => e.value.id));
        if(result.error){
            return console.log(result.error);
        }
        console.log(result);
        dispatch(addChat({id:result.id, name:result.name, messages:[], loading:true}))
        dispatch(toggleModal({ name: 'createChatModal' }));
    }

    return (
        <MyModal
            visibility={modal.visibility}
            setVisibility={() => dispatch(toggleModal({ name: 'createChatModal' }))}
        >
            <form onSubmit={createChat}>
                <h1>Название чата</h1>
                <MyInput value={modal.chatNameInput}
                    onChange={(e) => dispatch(changeInput({
                        name: 'createChatModal',
                        input: 'chatNameInput',
                        value: e.target.value
                    }))}
                    placeholder='Название чата'
                />
                <h1>Добавьте участников чата</h1>
                <MyInput value={modal.userFilterInput}
                    onChange={(e) => dispatch(changeInput({
                        name: 'createChatModal',
                        input: 'userFilterInput',
                        value: e.target.value
                    }))}
                    placeholder='Имя пользователя'
                />
                <UserList />
                <MyButton onClick={createChat}>Создать чат</MyButton>
            </form>
        </MyModal>
    )
}
