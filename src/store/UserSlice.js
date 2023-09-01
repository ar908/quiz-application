
import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: "user",
    initialState: {
        logined: false,
        email: ""
    },
    reducers: {
        login: (state, action) => {
            state.logined = true
            state.email = action.payload;
        },


    }

})

export const { login } = userSlice.actions;
export default userSlice.reducer