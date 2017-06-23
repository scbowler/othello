import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
    class Auth extends Component {

        componentWillMount() {
            if(!this.props.auth){
                this.props.history.push('/');
            }
        }

        componentWillUpdate(nextProps) {
            if(!nextProps.auth){
                this.props.history.push('/');
            }
        }

        render() {
            return <ComposedComponent {...this.props}/>
        }
    }

    function mapStateToProps(state) {
        return { auth: state.user.auth };
    }

    return connect(mapStateToProps)(Auth);
}
