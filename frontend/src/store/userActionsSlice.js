import { createSlice } from "@reduxjs/toolkit";

const userActionsSlice = createSlice({
    name: 'useractions',
    initialState: {
        deletedBlog: false
    },
    reducers: {
        deletedBlog: (state, action) => {
            state.deletedBlog = !state.deletedBlog
        }
    }
})

export default userActionsSlice.reducer
export const { deletedBlog } = userActionsSlice.actions