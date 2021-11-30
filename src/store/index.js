import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice';
import userReducer from './user';

export default configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer
    }
})