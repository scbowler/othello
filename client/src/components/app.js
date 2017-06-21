import React from 'react';
import './app.css';
import Board from './board';
import ScoreBoard from './score_board';
import Create from './create_temp';

const App = () => (
    <div className="container">
        <div className="text-center">
            <Create/>
        </div>
        <h1 className="text-center">Othello</h1>
        {/*<ScoreBoard/>
        <Board/>*/}
    </div>
);

export default App;
