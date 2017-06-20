import { PLACE_PIECE } from './types';

export function place_piece(loc){
    return {
        type: PLACE_PIECE,
        payload: loc
    }
}