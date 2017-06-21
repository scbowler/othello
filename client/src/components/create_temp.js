import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAccount, login, logout } from '../actions';
import { auth } from '../firebase';

class CreatAccount extends Component {
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

    handleClick(){
        console.log('Create account clicked');
        const user = {
            email: 'test6@mail.com',
            password: 'asdf1234',
            displayName: 'ImTestUser6'
        }

        this.props.createAccount(user);
    }

    handleLogin(){
        console.log('Login clicked');
        const userInfo = {
            email: 'test4@mail.com',
            password: 'asdf1234'
        }

        this.props.login(userInfo);
    }

    handleLogout(){
        console.log('Log Out');
        this.props.logout();
    }

    render(){

        return (
            <div>
                <button onClick={() => {this.handleClick()}} className="btn btn-primary">Create Account</button>
                <button onClick={() => {this.handleLogin()}} className="btn btn-success">Login</button>
                <button onClick={() => {this.handleLogout()}} className="btn btn-danger">Log Out</button>
                <p>{this.props.auth ? `User Logged in as: ${this.props.username}` : 'No User Logged In'}</p>
                <p className="text-danger">{this.props.error}</p>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        auth: state.user.auth,
        username: state.user.username,
        error: state.user.error
    }
}

export default connect(mapStateToProps, {createAccount, login, logout})(CreatAccount);
