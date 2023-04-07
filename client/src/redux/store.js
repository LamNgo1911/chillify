import { configureStore } from "@reduxjs/toolkit";
import player from "./features/playerSlice.js"
import auth from "./features/auth.js"

const store = configureStore({
    reducer: {
        player,
        auth
    },
    devTools: false
})

export default store