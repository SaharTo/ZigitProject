import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: "",
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        loginfunc: (state, action) => {
            state.user = action.payload
            // console.log("inside loginslice : ", state.value);
        },
    },
})

// Action creators are generated for each case reducer function
export const { loginfunc } = loginSlice.actions

export default loginSlice.reducer