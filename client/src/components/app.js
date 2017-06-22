import React from 'react';
import './app.css';
import Board from './board';
import ScoreBoard from './score_board';
import User from './user';
import Logo from './images/invadersim_logo.png';

const App = () => (
    <div>
        <img src={Logo} alt="issa logo" className="logo"/>
        <div className="container-fluid">
            <div className="center">
                <Board/>
                <ScoreBoard/>
                <User/>
            </div>
        </div>
    </div>
);

export default App;
