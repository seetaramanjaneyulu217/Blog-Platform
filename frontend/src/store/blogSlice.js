import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        likedTheBlog: false,
        commentedTheBlog: false
    },
    reducers: {
        likedBlog: (state) => {
            state.likedTheBlog = !state.likedTheBlog
        },

        commentedBlog: (state) => {
            state.commentedTheBlog = !state.commentedTheBlog
        }
    }
})


export default blogSlice.reducer
export const { likedBlog, commentedBlog } = blogSlice.actions