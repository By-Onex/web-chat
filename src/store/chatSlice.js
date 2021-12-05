import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    chatList: [],
    current:null,
    users: [],
    currentMessage:'',
    wsStatus: 'connecting',
};

const ChatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        notifyReadMessage(state, action){
            const chat = state.chatList.find(c => c.id === state.current);
            if(!chat) return;
            const msg = chat.messages.find(m => m.id === action.payload);
            if(!msg) return;
            msg.reading = true;
            --chat.unreading;
        },
        changeSocketStatus(state, action) {
            state.wsStatus = action.payload;
        },
        /**
        * Установка чатов
        */
        setChats(state, action) {
            state.chatList = action.payload.map(c => { c.messages = []; c.loading = false; return c;});
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
            const chat = state.chatList.find(c => c.id === state.current);
            //chat.unreading = action.payload.filter(m => m.reading === false && m.user_id !== ~~localStorage.getItem('id')).length;
            chat.messages = action.payload;
            chat.loading = true;
        },
        /**
        * Новое сообщение
        */
        addMessage(state, action) {
            console.log(action.payload)
            const chat = state.chatList.find(c => c.id === action.payload.chat_id);
            if(action.payload.user_id !== ~~localStorage.getItem('id')){
                chat.unreading++;
            }
            chat.messages.push(action.payload);
        },
        /**
        * Изменение состояния сообщения
        */
        changeMessage(state, action) {
            console.log(action.payload);
            const chat = state.chatList.find(c => c.id === action.payload.chat_id);
            if(!chat) return;
           
            chat.messages = chat.messages.map(m => {
                if(action.payload.old_id === m.id) {
                    m.id = action.payload.id;
                    m.status = true;
                    m.reading = action.payload.reading;
                }else if(action.payload.id === m.id){
                    m.status = true;
                    m.reading = action.payload.reading;
                }
                return m;
            });
        },
        setCurrentMessage(state, action){
            state.currentMessage = action.payload;
        },
        clearData(state){
            state = initialState;
        }
    }
});

export const findAllMessages = (state) => {
    if(!state.chat.current) return [];
    const chat = state.chat.chatList.find(c => c.id === state.chat.current);
    if(!chat) return [];
    if(chat.loading === false) return [];
    return chat.messages;
}

export const findUser = (state, user_id) => state.chat.users.find(u => u.id === user_id);

export const selectAllChats = state => state.chat.chatList;

export const {notifyReadMessage, notifyNewMessages, changeSocketStatus, clearData, setCurrentMessage, setChats, selectChat, setChatUsers, setChatMessages, addMessage, changeMessage} = ChatsSlice.actions;

export default ChatsSlice.reducer;