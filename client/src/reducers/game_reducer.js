import Game from '../game_logic/game';
import types from '../actions/types'; 

// const DEFAULT_STATE = {
//     game: (new Game([1, 2], {})).events[0].payload.game
// };

const DEFAULT_STATE = { list: {}, gid: null, players: {}, gameState: {}, you: null, status: null, name: null};

export default function(state = DEFAULT_STATE, action){
    const { payload } = action;
    console.log('action type', action.type)
    switch(action.type){
        case types.GET_GAME_LIST:
            return { ...state, list: action.payload };
        case types.CREATE_GAME:
            const { gid, players, you, name } = action.payload;
            return { ...state,
                gid,
                players,
                you,
                name,
                status: 'waiting',
                gameState: action.payload.state
            };
        case types.JOIN_GAME:
            return { ...state,
                gid: payload.state.id,
                players: payload.players,
                gameState: payload.state,
                you: payload.you,
                name: payload.name,
                status: 'ready'
            }
        case types.UPDATE_GAME:
            const { gameState } = action;
            return { ...state,
                gid: gameState.id,
                gameState: {...gameState},
                status: gameState.playable ? 'ready' : 'game_over'
            }
        case types.RE_JOIN_GAME:

            return {...state, gid: payload.gid, players: payload.players, you: payload.you, name: payload.name};
        case types.LEAVE_GAME:
            return {...DEFAULT_STATE}
        default:
            return state;
    }
}
