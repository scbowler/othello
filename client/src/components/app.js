import React from 'react';
import './app.css';
import Board from './board';
import ScoreBoard from './score_board';
import Login from './login';
import Signup from './signup';

const App = () => (
    <div>
        <Login/>
        <Signup/>
        <h1 className="text-center">Othello</h1>
        <div className="container-fluid">
            <div className="center">
                <Board/>
                <ScoreBoard/>
            </div>
        </div>
    </div>
);

export default App;
