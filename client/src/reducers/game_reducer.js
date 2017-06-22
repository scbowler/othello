import Game from '../game_logic/game';
import types from '../actions/types'; 

// const DEFAULT_STATE = {
//     game: (new Game([1, 2], {})).events[0].payload.game
// };

const DEFAULT_STATE = {list: {}, board: {}, player: {}, playable: null, players: {}, status: null, gid: null, tally: {}, you: null};

export default function(state = DEFAULT_STATE, action){
    switch(action.type){
        case types.GET_GAME_LIST:
            return { ...state, list: action.payload };
        case types.CREATE_GAME:
        case types.UPDATE_GAME:
            const { board, player, playable, players, gid, tally, you } = action.payload;
            return {...state, board, player, playable, players, gid, tally, you, status: 'new_game_ready'};
        default:
            return state;
    }
}
