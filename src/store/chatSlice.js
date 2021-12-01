import { createSlice } from "@reduxjs/toolkit";


const ChatsSlice = createSlice({
    name: 'chats',
    initialState: {chatList: [], current:null, users: [], currentMessage:'' },
    reducers: {
        /**
        * Установка чатов
        */
        setChats(state, action) {
            state.chatList = action.payload.map(c => { c.messages = []; return c;});
        },
        /**
        * Выбор чата
        */
        selectChat(state, action) {
            state.current = action.payload;
        },
        /**
        * Пользователи чата
        */
        setChatUsers(state, action) {
        
            action.payload.forEach(user => {
                if(!state.users.find(u => u.id === user.id))
                    state.users.push(user);
            });
        },
        /**
        * Сообщения чата
        */
        setChatMessages(state, action) {
            state.chatList.find(c => c.id === state.current).messages = action.payload;
        },
        /**
        * Новое сообщение
        */
        addMessage(state, action) {
            state.chatList.find(c => c.id === state.current).messages.push(action.payload);
        },
        /**
        * Изменение состояния сообщения
        */
        changeMessage(state, action) {
            let chat = state.chatList.find(c => c.id === action.payload.chat_id);
            chat.messages = chat.messages.map(m => {
                if(action.payload.old_id === m.id) {
                    m.id = action.payload.id;
                    m.status = true;
                    m.reading = action.payload.reading;
                }
                return m;
            });
        },
        setCurrentMessage(state, action){
            state.currentMessage = action.payload;
        },
        clearData(state, action){
            state.chatList = [];
            state.current = null;
            state.users = [];
            state.currentMessage = '';
        }
    }
});

export const findAllMessages = (state) => {
    return state.chat.current ?
    state.chat.chatList.find(c => c.id === state.chat.current).messages : [];
}

export const findUser = (state, user_id) => state.chat.users.find(u => u.id === user_id);

export const selectAllChats = state => state.chat.chatList;

export const {clearData, setCurrentMessage, setChats, selectChat, setChatUsers, setChatMessages, addMessage, changeMessage} = ChatsSlice.actions;

export default ChatsSlice.reducer;