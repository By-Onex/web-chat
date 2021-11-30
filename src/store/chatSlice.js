import { createSlice } from "@reduxjs/toolkit";

const ChatsSlice = createSlice({
    name: 'chats',
    initialState: {chatList :[], current:null, users:[] },
    reducers: {
        setChats(state, action) {
            console.log(action.payload)
            state.chatList = action.payload.map(c => { c.messages = []; return c;});
        },
        selectChat(state, action) {
            state.current = action.payload;
        },
        setChatUsers(state, action) {
            state.users = state.users.concat(action.payload);
        },
        setChatMessages(state, action) {
            state.chatList.find(c => c.id === state.current).messages = action.payload;
        },
        addMessage(state, action) {
            state.chatList.find(c => c.id === state.current).messages.push(action.payload);
        },
        changeMessage(state, action) {
            const messages = state.chatList.find(c => c.id === state.current).messages;
            const new_msg = messages.map(m => {if(action.payload.old_id === m.id) {}});
        }
    }
});

export const findAllMessages = (state) => {
    return state.chat.current ?
    state.chat.chatList.find(c => c.id === state.chat.current).messages : [];
}
    
export const findUser = (state, user_id) => state.chat.users.find(u => u.id === user_id);

export const selectAllChats = state => state.chat.chatList;

export const {setChats, selectChat, setChatUsers, setChatMessages, addMessage} = ChatsSlice.actions;

export default ChatsSlice.reducer;