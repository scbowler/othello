import React from 'react';
import './app.css';
import Board from './board';
import ScoreBoard from './score_board';
import User from './user';

const App = () => (
    <div>
        <User/>
        <h1 className="text-center">Othello</h1>
        <ScoreBoard/>
        <Board/>
    </div>
);

export default App;
