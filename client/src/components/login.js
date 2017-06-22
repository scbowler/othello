import React, { Component } from 'react';
import { validateLogin } from './helpers/validation';

class Login extends Component {
    constructor (props){
        super(props);
        this.state = {
            form: {
                email: '',
                password: '',
            }
        }
    }
    handleInputChange(changeEvent, inputType){
        const {value} = changeEvent.target;
        const {form} = this.state;
        let newFormState = {};
        switch (inputType){
            case 'email':
                newFormState = {...form, email: value};
                break;
            case 'password':
                newFormState = {...form, password: value};
                break;
            default:
                return;
        }
        this.setState({form: newFormState});
    }
    handleFormSubmit(formEvent){
        console.log(this.state.form);
        this.setState ({
            form: {
                email: '',
                password: '',
            }
        });
        console.log(this.state);
    }
    render(){
        return (
            <form className="login">
                <input type="email"
                       placeholder="email"
                       value={this.state.form.email}
                       onChange={(event)=>this.handleInputChange(event, 'email')}/>
                <input type="password"
                       placeholder="password"
                       value={this.state.form.password}
                       onChange={(event)=>this.handleInputChange(event, 'password')}/>
                <button onSubmit={(event)=>this.handleFormSubmit(event)}>LOGIN</button>
            </form>
        )
    }
}

export default Login;