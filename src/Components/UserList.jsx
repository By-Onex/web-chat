import React, { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import * as api from '../API/ApiDB';
import { setChatUsers } from '../store/chatSlice';
import { setCheckList, toggleCheckList } from '../store/modalSlice';

export default function UserList() {
    const dispatch = useDispatch();
    const modal = useSelector(state => state.modal.createChatModal);
   
    const filterUser = useMemo(() => {
        return modal.list.filter(e => e.value.name.includes(modal.userFilterInput));
    }, [modal.list, modal.userFilterInput]);

   

    useEffect(() => {
        const fetchData = async () => {
            let users = await api.GetAllUsers();
            if (users.error) {
                return console.log(users.error)
            }
            users = users.filter(u => u.id !== ~~localStorage.getItem('id'));
            dispatch(setCheckList({ list: users, name: 'createChatModal' }));
            dispatch(setChatUsers(users));
        }
        fetchData()
    }, [dispatch]);

    return (
        <div style={{maxHeight:'70px', overflow:'hidden'}}>
            <ul style={{overflowY:'auto', maxHeight: '70px'}}>
                {
                    filterUser.map(u =>
                        <li key={u.value.id}>
                            <input id={`cb-${u.value.id}`}
                                type='checkbox'
                                value={u.value.name}
                                checked={u.checked}
                                onChange={() => dispatch(toggleCheckList({ name: 'createChatModal', id: u.value.id }))}
                            />
                            <label htmlFor={`cb-${u.value.id}`}>{u.value.name}</label>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}
