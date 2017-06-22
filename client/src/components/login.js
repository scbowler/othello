import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, sendError } from '../actions';

const hide = {
    display: 'none'
}

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
        formEvent.preventDefault();
        console.log(this.state.form);
        const { form } = this.state;
        if(form.email === '' || form.password === ''){
            this.props.sendError('Missing Email or Password');
            return;
        }
        this.props.sendError(null);
        this.props.login(this.state.form);
        this.setState ({
            form: {
                email: '',
                password: '',
            }
        });
    }
    render(){
        return (
            <form onSubmit={(event)=>this.handleFormSubmit(event)} className="login" style={this.props.hidden ? hide : {}}>
                <input type="email"
                       placeholder="email"
                       value={this.state.form.email}
                       onChange={(event)=>this.handleInputChange(event, 'email')}/>
                <input type="password"
                       placeholder="password"
                       value={this.state.form.password}
                       onChange={(event)=>this.handleInputChange(event, 'password')}/>
                <button>LOGIN</button>
            </form>
        )
    }
}

export default connect(null, {login, sendError})(Login);
