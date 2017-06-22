import types from '../actions/types';

const DEFAULT_STATE = { auth: null, username: null, error: null };

export default function(state = DEFAULT_STATE, action){
    switch(action.type){
        case types.LOG_IN:
            console.log('Login called');
            return { auth: true, username: action.username, error: null };
        case types.LOG_OUT:
            console.log('Logout called');
            return {...DEFAULT_STATE};
        case types.AUTH_ERROR:
            console.log('Error called in Auth reducer', action.error);
            return { ...state, error: action.error}
        case 'idk':
            console.log('Test case hit in auth reducer');
            return state;
        default: 
            return state;
    }
}
