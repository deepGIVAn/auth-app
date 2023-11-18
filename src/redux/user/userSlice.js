import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser:null,
    loading:false,
    error:false,
    del_loading:false,
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        signInStart:(state) => {
            state.loading=true;
        },
        signInSuccess:(state,action) => {
            state.currentUser = action.payload;
            state.error = false;
            state.loading = false;
        },
        signInFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        updateUserStart:(state)=>{
            state.loading = true;
        },
        updateUserSuccess:(state, action)=>{
            state.currentUser = action.payload;
            state.error = false;
            state.loading = false;
        },
        updateUserFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        deleteUserStart:(state)=>{
            state.del_loading = true;
        },
        deleteUserSuccess:(state)=>{
            state.currentUser = null;
            state.error = false;
            state.del_loading = false;
        },
        deleteUserFailure:(state,action)=>{
            state.error = action.payload;
            state.del_loading = false;
        },
        signoutUserStart:(state)=>{
            state.signout_loading = true;
        },
        signoutUserSuccess:(state)=>{
            state.currentUser = null;
            state.error = false;
            state.signout_loading = false;
        },
        signoutUserFailure:(state,action)=>{
            state.error = action.payload;
            state.signout_loading = false;
        },
    }
});


export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutUserStart,
  signoutUserSuccess,
  signoutUserFailure,
} = userSlice.actions;

export default userSlice.reducer;