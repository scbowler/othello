import types from '../actions/types';

const DEFAULT_STATE = { auth: null, username: null, error: null };

export default function(state = DEFAULT_STATE, action){
    switch(action.type){
        case types.LOG_IN:
            return { auth: true, username: action.username, error: null };
        case types.LOG_OUT:
            return {...DEFAULT_STATE};
        case types.AUTH_ERROR:
            return { ...state, error: action.error}
        case 'idk':
            return state;
        default: 
            return state;
    }
}
