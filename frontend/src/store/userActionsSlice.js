import { createSlice } from "@reduxjs/toolkit";

const userActionsSlice = createSlice({
    name: 'useractions',
    initialState: {
        deletedBlog: false
    },
    reducers: {
        userDeletedBlog: (state, action) => {
            state.deletedBlog = !state.deletedBlog
        }
    }
})

export default userActionsSlice.reducer
export const { userDeletedBlog } = userActionsSlice.actions