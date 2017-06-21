import { combineReducers } from 'redux';
import gameReducer from './game_reducer';
import authReducer from './auth_reducer'; 

export default combineReducers({
    game: gameReducer,
    user: authReducer
});
