// import { BOARD } from './game_data';
import Game from '../game_logic/game';
import { PLACE_PIECE } from '../actions/types'; 

const DEFAULT_STATE = {game: new Game([1, 2])};

export default function(state = DEFAULT_STATE, action){
    switch(action.type){
        case PLACE_PIECE:
            state.game.place(state.game.players.current, action.payload.r, action.payload.c);
            return { ...state};
        default:
            return state;
    }
}
