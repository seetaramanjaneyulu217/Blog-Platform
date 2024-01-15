import { configureStore } from "@reduxjs/toolkit";
import blogReducer from './blogSlice'
import userActionsReducer from './userActionsSlice'

const appStore = configureStore({
    reducer: {
        blog: blogReducer,
        useractions: userActionsReducer
    }
})

export default appStore