import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    /**
    * Чаты пользователя
    * @type {Array.<{
    * id:Number,
    * name:String,
    * messages:Array.<{id:Number, user_id:Number, text:String, date?:String, reading:Boolean, status:Boolean}>,
    * loading:Boolean}>} 
    */
    chatList: [],
    /**
    * Текущий ID чата
    * @type {Number}
    */
    current:null,
    /**
    * Пользователи состоящие в чатах
    * @type {Array.<{id:Number, name:String}>}
    */
    users: [],
    /**
    * Инпут чата
    */
    currentMessage:'',
    /**
    * Статус вебсокета
    * @property String
    */
    wsStatus: 'connecting',
};

const ChatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        /**
        * Уведомление о прочтении сообщения
        */
        notifyReadMessage(state, action){
            const chat = state.chatList.find(c => c.id === state.current);
            if(!chat) return;
            const msg = chat.messages.find(m => m.id === action.payload);
            if(!msg) return;
            msg.reading = true;
            --chat.unreading;
        },
        /**
        * Состояние вебсокета 
        */
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
         * Добавить чат
         */
        addChat(state, action) {
            state.chatList.push(action.payload);
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
        * Установка сообщений чата
        */
        setChatMessages(state, action) {
            const chat = state.chatList.find(c => c.id === action.payload.chat_id);
            chat.messages = action.payload.messages;
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

/**
 * 
 * @returns {Array.<{id:Number, text:String, date?:String, reading:Boolean, status:Boolean}>}
 */
export const findAllMessages = (state) => {
    if(!state.chat.current) return [];
    const chat = state.chat.chatList.find(c => c.id === state.chat.current);
    if(!chat) return [];
    if(chat.loading === false) return [];
    return chat.messages;
}
export const findCurrentChat = (state) => state.chat.chatList.find(c => c.id === state.chat.current);


export const findUser = (state, user_id) => state.chat.users.find(u => u.id === user_id);

export const selectAllChats = state => state.chat.chatList;

export const {addChat, notifyReadMessage, notifyNewMessages, changeSocketStatus, clearData, setCurrentMessage, setChats, selectChat, setChatUsers, setChatMessages, addMessage, changeMessage} = ChatsSlice.actions;

export default ChatsSlice.reducer;