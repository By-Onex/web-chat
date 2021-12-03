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
            console.log(action.payload.user)
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('id', action.payload.user.id);
            localStorage.setItem('name',  action.payload.user.name);
            localStorage.setItem('expired',  action.payload.user.expired);
            SetToken(action.payload.token);
        },
        logout: (state, action) => {
            state.user = null;
            localStorage.clear();
            SetToken('');
        },
        checkLocal: (state, action) => {
            let expired = localStorage.getItem('expired');
            if(!expired) return;
            console.log(expired);
            console.log(Math.floor(Date.now()/1000));
            if(Math.floor(Date.now()/1000) > ~~expired){
                return localStorage.clear();
            }
            const token = localStorage.getItem('token');
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