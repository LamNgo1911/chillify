import { createSlice } from "@reduxjs/toolkit";

const auth = JSON.parse(sessionStorage.getItem("auth")) || false;
const user = JSON.parse(sessionStorage.getItem("user")) || {};
const isLogged = JSON.parse(sessionStorage.getItem("isLogged")) || false;

const initialState = {
    auth: auth,
    user: user,
    token: "",
    loading: false,
    error: "",
    isLogged: isLogged,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.auth = action.payload;
            sessionStorage.setItem("auth", JSON.stringify(action.payload));
        },
        setUser: (state, action) => {
            state.user = action.payload;
            sessionStorage.setItem("user", JSON.stringify(action.payload));
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setLogin: (state, action) => {
            state.isLogged = action.payload;
            sessionStorage.setItem("isLogged", JSON.stringify(action.payload));
        },
    }
});

export const { setAuth, setUser,setToken,setLogin } = authSlice.actions;
export default authSlice.reducer;