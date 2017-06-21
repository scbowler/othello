import Game from '../game_logic/game';
import types from '../actions/types'; 

const DEFAULT_STATE = {
    game: (new Game([1, 2])).events[0].payload.game
};

export default function(state = DEFAULT_STATE, action){
    switch(action.type){
        case types.PLACE_PIECE:
            state.game.place(state.game.players.current, action.payload.r, action.payload.c);
            return { ...state};
        default:
            return state;
    }
}
