
import { createSlice } from "@reduxjs/toolkit";
const questionSlice = createSlice({
    name: "questions",
    initialState: {
        data: [],
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        questionVisited: [],
        questionAnswered: []
    },
    reducers: {
        updateQuestions: (state, action) => {
            state.data = action.payload;
        },
        increaseCorrectScore: (state, action) => {
            state.score = state.score + 1
            state.correctAnswers = state.correctAnswers + 1
        },
        increaseWrongScore: (state, action) => {
            state.wrongAnswers = state.wrongAnswers + 1
        },

        updateQuestionVisited: (state, action) => {
            if (!state.questionVisited.includes(action.payload)) {
                state.questionVisited.push(action.payload);
            }
        },

        updateQuestionAnswered: (state, action) => {
            if (!state.questionAnswered.includes(action.payload)) {
                state.questionAnswered.push(action.payload);
            }
        },

    }
})

export const { updateQuestions, increaseCorrectScore, increaseWrongScore, updateQuestionVisited, updateQuestionAnswered } = questionSlice.actions;
export default questionSlice.reducer;