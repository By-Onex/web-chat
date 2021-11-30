import { createSlice } from "@reduxjs/toolkit";

const ChatsSlice = createSlice({
    name: 'chats',
    initialState: {chats :[]},
    reducers: {
        addChats(state, action) {
            state.chats = action.payload;
        },
    }
});

export const selectAllChats = state => state.chat.chats;

export const {addChats} = ChatsSlice.actions;

export default ChatsSlice.reducer;