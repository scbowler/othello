import types from './types';

export function place_piece(loc){
    return {
        type: types.PLACE_PIECE,
        payload: loc
    }
}

export function getGameList(snapshot){
    return {
        type: types.GET_GAME_LIST,
        payload: snapshot
    }
}
