import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAccount, sendError } from '../actions';

const hide = {
    display: 'none'
}

class Signup extends Component {
    constructor(props){
        super(props);
        this.defaultState = {
            form: {
                username: '',
                email: '',
                password: '',
                verifyPw: ''
            }
        };

        this.state = this.defaultState;
    }

    handleInputChange(changeEvent, inputType){
        const {value} = changeEvent.target;
        const {form} = this.state;
        let newFormState = {};
        switch(inputType){
            case 'username':
                newFormState = {...form, username: value};
                break;
            case 'email':
                newFormState = {...form, email: value};
                break;
            case 'password':
                newFormState = {...form, password: value};
                break;
            case 'verifyPw':
                newFormState = {...form, verifyPw: value};
                break;
            default:
                return;
        }
        this.setState({form: newFormState});
    }

    handleFormSubmit(formEvent){
        formEvent.preventDefault();
        console.log(this.state.form);
        const { form } = this.state;
        if(form.username === '' || form.email ==='' || form.password === '' || form.verifyPw === ''){
            this.props.sendError('Form is not complete');
            return
        }

        this.props.createAccount(this.state.form);
        this.setState(this.defaultState);
        
    }

    cancelForm(){
        this.props.sendError(null);
        this.setState(this.defaultState);
        this.props.onClick()
    }

    render(){
        return(
            <form onSubmit={(event)=>this.handleFormSubmit(event)} className="signup" style={this.props.hidden ? hide : {}}>
                <input type="text"
                    placeholder="username"
                    value={this.state.form.username}
                    onChange={(event)=>this.handleInputChange(event, 'username')}/>
                <input type="email"
                    placeholder="email" 
                    value={this.state.form.email} 
                    onChange={(event)=>this.handleInputChange(event, 'email')}/>
                <input type="password"
                    placeholder="password" 
                    value={this.state.form.password}
                    onChange={(event)=>this.handleInputChange(event, 'password')}/>
                <input type="password"
                    placeholder="retype password"
                    value={this.state.form.verifyPw}
                    onChange={(event)=>this.handleInputChange(event, 'verifyPw')}/>
                <button>SIGN UP DOOD</button>
                <button type="button" className="btn btn-danger" onClick={() => this.cancelForm()}>Cancel</button>
            </form>
        )
    }
}

export default connect(null, {createAccount, sendError})(Signup);
