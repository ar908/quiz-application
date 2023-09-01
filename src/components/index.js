import React from 'react'
import StartPage from './StartPage'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import QuizPage from './QuizPage';
import Report from './Report'


function Index() {
    return (
        // <div>
        //     
        // </div>
        <Router>
            <Routes>
                <Route exact path='/' element={<StartPage />} />
                <Route exact path='/quiz' element={<QuizPage />} />
                <Route exact path='/report' element={<Report />} />
            </Routes>
        </Router>
    )
}

export default Index
