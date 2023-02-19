import { createSlice } from "@reduxjs/toolkit"

const authStore = JSON.parse(localStorage.getItem("user"))
const authSlice = createSlice({
    name:"auth",
    initialState:{
        auth:authStore ? authStore:null
    },
    reducers:{
        getUser:(state,action)=>{
            state.auth = action.payload
        },
        logOUtUser:(state,action)=>{
            state.auth = null
            localStorage.removeItem("user")
        },
    }
})


export const { getUser,logOUtUser } = authSlice.actions
export default authSlice.reducer;