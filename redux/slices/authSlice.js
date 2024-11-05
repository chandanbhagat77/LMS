import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";


export const signupForm = createAsyncThunk('/signup/user', async (data, { rejectWithValue }) => {
    try {
        console.log("hitted");

        const res = await axios.post('http://192.168.68.147:8000/api/users/create', data, {
            withCredentials: true
        }); 
         
            return res; 
    } catch (error) {
        // Log the entire error response
        if (error.response) {
            console.log("Error response data:", error.response.data); // Server response message
            console.log("Error status:", error.response.status); // HTTP status code
            console.log("Error headers:", error.response.headers); // Headers
        } else if (error.request) {
            // Request was made but no response received
            console.log("Error request:", error.request);
        } else {
            // Something happened in setting up the request
            console.log("Error message:", error.message);
        }
        // Reject with the error message for handling in extraReducers
        return rejectWithValue(error.response ? error.response.data : error?.message || "Something Went Wrong");
    }
});

export const loginForm = createAsyncThunk('/login/user', async (data, { rejectWithValue,fulfillWithValue }) => {


    try {
        // console.log("hitted");

        const res = await axios.post('http://192.168.68.147:8000/api/auth/login', data); 
        
       
            return `${JSON.stringify(res)}`;
       
    } catch (error) {
        // Log the entire error response
        if (error.response) {
            console.log("Error response data:", error.response.data); // Server response message
            console.log("Error status:", error.response.status); // HTTP status code
            console.log("Error headers:", error.response.headers); // Headers
        } else if (error.request) {
            // Request was made but no response received
            console.log("Error request:", error.request);
        } else {
            // Something happened in setting up the request
            console.log("Error message:", error.message);
        }
        // Reject with the error message for handling in extraReducers
        return rejectWithValue(error.response ? error.response.data : error?.message || "Something Went Wrong");
    }


}) 

const initialState = {
    data:   {},
    isLoggedIn:  false,
    token :  '',
   
}
const authSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        setAuthData(state, action) {
            console.log("ACTION is",action);
            
          state.data = action.payload.data;
          state.isLoggedIn = action.payload.isLoggedIn;
          state.token = action.payload.token;
        }, 
         logout: (state, action) => {
            state.isLoggedIn = false,
                state.data = {},
                state.msg = ""
        }
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            // Ignore actions for specific slices or actions if needed
            ignoredActions: ['/login/user'],
          },
        }),
   
    extraReducers: (builder) => {
        builder.addCase(signupForm.fulfilled, (state, action) => {
            if (action.payload.data.status == "success") {
                // localStorage.setItem("isLoggedIn", JSON.stringify(true))
                // localStorage.setItem("data", JSON.stringify(action?.payload?.data?.data))
                AsyncStorage.setItem("isLoggedIn","true")
                state.isLoggedIn = true;
                // state.data = action?.payload?.data?.data;
            }


        }).addCase(loginForm.fulfilled, (state, action) => {
            console.log("action is ",action.payload);
            let data=JSON.parse(action.payload)
            // if (action?.payload?.status) {
                // localStorage.setItem("isLoggedIn", JSON.stringify(true))
                // localStorage.setItem("data", JSON.stringify(action?.payload?.data))
                AsyncStorage.setItem("isLoggedIn","true")
                AsyncStorage.setItem("token",`${data?.data?.token}`)
                AsyncStorage.setItem("data",`${JSON.stringify(data?.data?.profile)}`)
                state.isLoggedIn = true;
                state.data = data?.data?.profile || "";
                state.token = data?.data?.token || "";
            // }


        }).addCase(loginForm.rejected, (state, action) => {



            state.msg = action.payload;
        })

    }
})

export const { logout,setAuthData } = authSlice.actions;

export default authSlice.reducer

















