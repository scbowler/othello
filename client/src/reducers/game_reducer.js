// import { BOARD } from './game_data';
import Game from '../game_logic/game';
import { PLACE_PIECE } from '../actions/types'; 

const DEFAULT_STATE = new Game([1, 2]);

export default function(state = DEFAULT_STATE, action){
    switch(action.type){
        case PLACE_PIECE:
            // state.board[action.payload.r][action.payload.c].piece = state.turn;
            // console.log(state);
            console.log(action.payload);
            const result = state.place(state.players.current, action.payload.r, action.payload.c);
            console.log(result);
            return { ...state};
        default:
            return state;
    }
}
