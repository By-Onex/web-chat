import {
    createSlice
} from "@reduxjs/toolkit";
import { SetToken } from "../API/ApiDB";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('id', action.payload.user.id);
            localStorage.setItem('name',  action.payload.user.name);
            SetToken(action.payload.token);
        },
        logout: (state, action) => {
            state.user = null;
            localStorage.clear();
            SetToken('');
        },
        checkLocal: (state, action) => {
            const token = localStorage.getItem('token');
            if(!token) return;
            SetToken(token);
            state.user = {
                id: ~~localStorage.getItem('id'),
                name: localStorage.getItem('name')
            }
        }
    }
});

export const {login, logout, checkLocal} = userSlice.actions;
export default userSlice.reducer;