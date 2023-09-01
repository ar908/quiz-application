import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { quiz } from './Data'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { updateQuestions, increaseCorrectScore, increaseWrongScore, updateQuestionVisited, updateQuestionAnswered } from '../store/QuestionSlice'
import { useNavigate } from "react-router-dom"



const baseURL = " https://opentdb.com/api.php?amount=15"
function QuizPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState('')
    // const [showResult, setShowResult] = useState(false)
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)

    const [timeLeft, setTimeLeft] = useState(30 * 60);

    const { questions } = quiz
    const questions1 = useSelector((state) => state.questions.data);
    const questionVisited = useSelector((state) => state.questions.questionVisited);
    const questionAnswered = useSelector((state) => state.questions.questionAnswered);
    const user = useSelector((state) => state.user);
    const { question, incorrect_answers, correct_answer } = questions1.length > 0 ? questions1[activeQuestion] : { question: "", incorrect_answers: [], correct_answer: "" };
    const choices = [correct_answer, ...incorrect_answers]



    const onClickNext = () => {
        setSelectedAnswerIndex(null)

        dispatch(updateQuestionAnswered(activeQuestion))
        selectedAnswer
            ? dispatch(increaseCorrectScore())
            : dispatch(increaseWrongScore())

        if (activeQuestion !== questions.length - 1) {
            setActiveQuestion((prev) => prev + 1)
        } else {
            setActiveQuestion(0);
            navigate("/report");
        }
    }

    const onAnswerSelected = (answer, index) => {
        setSelectedAnswerIndex(index)
        if (answer === correct_answer) {
            setSelectedAnswer(true)
        } else {
            setSelectedAnswer(false)
        }
    }

    const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)
    useEffect(() => {
        if (timeLeft === 0) {
            navigate("/report");
        }
        if (timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

            return () => {
                clearInterval(timerId);
            };
        }
    });

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;


    useEffect(() => {
        axios.get(baseURL).then((res) => {
            console.log("from api", res.data.results)
            dispatch(updateQuestions(res.data.results))
        })
    }, [dispatch]);
    useEffect(() => {
        console.log("from store", questions1);
    }, [questions1]);

    if (!user.logined) {
        navigate("/");
        return;
    }
    const buttonNumbers = Array.from({ length: 15 }, (_, index) => index + 1);

    return (
        <>
            <div className="button-array">
                {buttonNumbers.map((number) => (
                    <button
                        key={number}
                        onClick={() => {
                            dispatch(updateQuestionVisited(number - 1))
                            setActiveQuestion(number - 1);
                        }}
                        className={questionAnswered?.includes(number - 1) ? "yellow" : (questionVisited?.includes(number - 1) ? "green" : "red")}
                    >
                        {number}
                    </button>
                ))}
            </div>
            <Box>
                <div className="quiz-container">


                    <div>
                        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                        <div>
                            <span className="active-question-no">{addLeadingZero(activeQuestion + 1)}</span>
                            <span className="total-question">/{addLeadingZero(questions.length)}</span>
                        </div>
                        <h2>{question}</h2>
                        <ul>
                            {choices.map((answer, index) => (
                                <li
                                    onClick={() => onAnswerSelected(answer, index)}
                                    key={answer}
                                    className={selectedAnswerIndex === index ? 'selected-answer' : null}>
                                    {answer}
                                </li>
                            ))}
                        </ul>
                        <div className="flex-right">
                            <button onClick={onClickNext} disabled={selectedAnswerIndex === null}>
                                {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                            </button>

                        </div>
                    </div>


                </div>
            </Box>
        </>
    )
}

export default QuizPage
