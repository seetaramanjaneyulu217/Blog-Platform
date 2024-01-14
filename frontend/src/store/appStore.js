import { configureStore } from "@reduxjs/toolkit";
import blogReducers from './blogSlice'

const appStore = configureStore({
    reducer: {
        blog: blogReducers
    }
})

export default appStore