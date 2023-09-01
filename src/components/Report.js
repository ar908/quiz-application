import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
function Report() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const questionData = useSelector((state) => state.questions);
    const { data, score, correctAnswers, wrongAnswers } = questionData;
    useEffect(() => {
        if (!user.logined) {

            navigate('/');
        }
    }, [user.logined, navigate]);

    return (
        <Box>
            <div className="quiz-container">
                <div className="result">
                    <h3>Result</h3>
                    <p>
                        Total Question: <span>{data.length}</span>
                    </p>
                    <p>
                        Total Score:<span> {score}</span>
                    </p>
                    <p>
                        Correct Answers:<span> {correctAnswers}</span>
                    </p>
                    <p>
                        Wrong Answers:<span> {wrongAnswers}</span>
                    </p>
                </div>
            </div>
        </Box>
    )
}

export default Report
