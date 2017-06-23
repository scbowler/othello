import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';
import { auth } from '../firebase';
import Login from './login';
import Signup from './signup';

class User extends Component {
    constructor(props){
        super(props);

        this.state = {
            hideReg: true
        }
    }

    toggleReg(show){
        let hideReg = show;
        if(!show && show !== false){
            hideReg = !this.state.hideReg;
        }
        this.setState({hideReg});
    }

    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            console.log('Auth state change called', this.props.location);
            if(user && !this.props.auth){
                console.log('User logged in', user.displayName);
                this.props.login(user);
            } else if(!user && this.props.auth){
                console.warn('No user but props.auth == true');
            } else {
                console.log('User all logged out');
            }
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.auth && this.props.location.pathname === '/'){
            this.props.history.push('/lobby');
        }
    }

    hideElement(hide){
        if(hide){
            return { display: 'none'}
        }
        return {}
    }

    logout(){
        this.toggleReg(true);
        this.props.logout();
    }

    render(){
        const username = {
            fontSize: '25px',
            color: 'white'
        }
        const { auth, error } = this.props;
        const { hideReg } = this.state
        return (
            <div className="text-center">
                <div style={ this.hideElement(auth)}>
                    <Login hidden={auth || !hideReg} />
                    <Signup onClick={() => this.toggleReg(true)}hidden={hideReg} />
                    <p className="text-danger">{error ? `ERROR: ${error}` : ''}</p>
                    <button onClick={() => this.toggleReg()} className="btn btn-outline-success" style={this.hideElement(!hideReg) }>Sign Up</button>
                </div>
                <div style={this.hideElement(!auth)}>
                    <p className="text-center" style={username}>User logged in as: <span className="text-success">{this.props.username}</span> {this.props.you ? `| You are Player ${this.props.you}` : ''}</p>
                    <button className="btn btn-outline-info" onClick={() => { this.logout() }}>Log Out</button>
                </div>
            </div>
        )
    }
}

function mstp(state){
    return {
        auth: state.user.auth,
        username: state.user.username,
        error: state.user.error,
        you: state.game.you
    }
}

export default withRouter(connect(mstp, actions)(User));
