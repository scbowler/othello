import React from 'react';
import { Route } from 'react-router-dom';
import './app.css';
import User from './user';
import Lobby from './lobby';
import Board from './board';

const App = (props) => (
    <div>
        <h1 className="text-center">Othello</h1>
        <User/>
        <Route path="/lobby" component={Lobby}/>
        <Route path="/game/:id" component={Board}/>
    </div>
);

function mstp(state){
    return {
        username: state.user.username
    }
}

export default App;
