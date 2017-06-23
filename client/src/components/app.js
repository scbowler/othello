import React from 'react';
import { Route } from 'react-router-dom';
import './app.css';
import Auth from './hoc/auth';
import User from './user';
import Lobby from './lobby';
import Board from './board';
import Logo from './images/invadersim_logo.png';

const App = (props) => (
    <div>
        <img src={Logo} alt="issa logo" className="logo"/>
        <div className="container-fluid">
            <div className="center">
                <Route path="/lobby" component={Auth(Lobby)}/>
                <Route path="/game/:id" component={Auth(Board)}/>
                <User/>
            </div>
        </div>
    </div>
);

function mstp(state){
    return {
        username: state.user.username
    }
}

export default App;
