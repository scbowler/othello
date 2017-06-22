import React from 'react';
import './app.css';
// import Board from './board';
// import ScoreBoard from './score_board';
import User from './user';
import Login from './login';
import Signup from './signup';

const App = () => (
    <div>
        <User/>
        <h1 className="text-center">Othello</h1>
        {/*<ScoreBoard/>
        <Board/>*/}
    </div>
);

export default App;
