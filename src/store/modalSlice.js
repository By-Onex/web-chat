import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        createChatModal: {
            list:[],
            name:'createChatModal',
            visibility: false,
            chatNameInput: '',
            userFilterInput: ''
        }
    },
    reducers: {
        toggleModal(state, action) {
            const modal = state[action.payload.name];
            modal.visibility = !modal.visibility;
            modal.input = '';
        },
        changeInput(state, action){
            const modal = state[action.payload.name];
            modal[action.payload.input] = action.payload.value;
        },
        setCheckList(state, action){
            const modal = state[action.payload.name];
            modal.list = action.payload.list.map(e => {return {value: e, checked: false}});
        },
        toggleCheckList(state, action) {
            const modal = state[action.payload.name];
            const row = modal.list.find(e => e.value.id === action.payload.id);
            row.checked = !row.checked;
        },
    }
});
//export const getUserRow = (user_id, state) => state.createChatModal.list.find(e => e.value.id ===user_id );
export const {toggleModal, changeInput, setCheckList, toggleCheckList} = modalSlice.actions;
export default modalSlice.reducer;