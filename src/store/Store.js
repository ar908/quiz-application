import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice"
import userReducer from "./UserSlice";
import questionReducer from "./QuestionSlice";
const store = configureStore({
    reducer: {
        user: userReducer,
        questions: questionReducer
    },
});

export default store;