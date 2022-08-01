import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AppHeader from "../appHeader/appHeader";
import MainPage from "../mainPage/mainPage";
import SingleNewsPage from "../singleNewsPage/singleNewsPage";

function App() {
    return (
        <Router>
            <div className="App">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route
                            path="/"
                            element={<MainPage/>}/>
                        <Route
                            path="/:newsId"
                            element={<SingleNewsPage/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
