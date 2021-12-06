import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice';
import userReducer from './user';
import modalReducer from './modalSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer,
        modal: modalReducer,
    }
})