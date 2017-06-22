import React, { Component } from 'react';
import { connect } from 'react-redux';
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

    componentWillMount(){
        auth.onAuthStateChanged((user) => {
            console.log('Auth state change called');
            if(user && !this.props.auth){
                console.log('User logged in', user.displayName);
                this.props.login(user);
            } else if(!user && this.props.auth){
                console.warn('No user but props.auth == true');
            } else {
                console.log('User all logged out');
            }
        });
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
            fontSize: '25px'
        }
        const { auth, error } = this.props;
        const { hideReg } = this.state
        return (
            <div className="text-center">
                <div style={ this.hideElement(auth)}>
                    <Login hidden={auth || !hideReg} />
                    <Signup onClick={() => this.toggleReg(true)}hidden={hideReg} />
                    <p className="text-danger">{error ? `ERROR: ${error}` : ''}</p>
                    <button onClick={() => this.toggleReg()} className="btn btn-primary" style={this.hideElement(!hideReg) }>Sign Up</button>
                </div>
                <div style={this.hideElement(!auth)}>
                    <p className="text-center" style={username}>User logged in as: <span className="text-success">{this.props.username}</span></p>
                    <button onClick={() => { this.logout() }}>Log Out</button>
                </div>
            </div>
        )
    }
}

function mstp(state){
    return {
        auth: state.user.auth,
        username: state.user.username,
        error: state.user.error
    }
}

export default connect(mstp, actions)(User);