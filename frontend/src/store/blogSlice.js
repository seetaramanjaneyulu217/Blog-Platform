import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        likedTheBlog: {}
    },
    reducers: {
        likedBlog: (state, action) => {
            state.likedTheBlog = action.payload
        }
    }
})


export default blogSlice.reducer
export const { likedBlog } = blogSlice.actions