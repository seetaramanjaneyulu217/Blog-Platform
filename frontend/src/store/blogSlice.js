import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        likedTheBlog: false
    },
    reducers: {
        likedBlog: (state) => {
            state.likedTheBlog = !state.likedTheBlog
        }
    }
})


export default blogSlice.reducer
export const { likedBlog } = blogSlice.actions