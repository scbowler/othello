import { BOARD } from './game_data';
import { PLACE_PIECE } from '../actions/types'; 

const DEFAULT_STATE = {board: BOARD, turn: 1};

export default function(state = DEFAULT_STATE, action){
    switch(action.type){
        case PLACE_PIECE:
            state.board[action.payload.r][action.payload.c].piece = state.turn;
            return { ...state, turn: state.turn === 1 ? 2 : 1};
        default:
            return state;
    }
}
