import React, { Component } from 'react';
import { validateSignup } from './helpers/validation';

class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            form: {
                username: '',
                email: '',
                password: '',
                verifyPw: ''
            }
        }
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
        console.log(this.state.form);
        this.setState({
            form: {
                username: '',
                email: '',
                password: '',
                verifyPw: ''
            }
        });
        console.log(this.state);
    }
    render(){
        return(
            <form className="signup">
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
                <button onSubmit={(event)=>this.handleFormSubmit(event)}>SIGN UP</button>
            </form>
        )
    }
}

export default Signup;