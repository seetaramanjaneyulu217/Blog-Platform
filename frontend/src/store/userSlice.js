import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userLoggedIn: false
    },
    reducers: {
        setUserAsLoggedIn: (state, action) => {
            state.userLoggedIn = action.payload
        }
    }
})

export default userSlice.reducer
export const { setUserAsLoggedIn } = userSlice.actions