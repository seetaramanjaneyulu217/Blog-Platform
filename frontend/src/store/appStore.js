import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import blogReducer from './blogSlice'
import userActionsReducer from './userActionsSlice'

const appStore = configureStore({
    reducer: {
        user: userReducer,
        blog: blogReducer,
        useractions: userActionsReducer
    }
})

export default appStore