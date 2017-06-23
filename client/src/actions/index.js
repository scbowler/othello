import types from './types';
import Game from '../game_logic/game';
import { auth, database } from '../firebase';

export function place_piece(loc, state, status, you){
    return dispatch => {
        
        if(state.playable && state.player.current === you){
            const game = new Game([1, 2], state);
            const gameEvent = game.events[0].payload.game;

            gameEvent.place(you, loc.r, loc.c);

            const gameState = {
                player: {current: gameEvent.players.current},
                board: gameEvent.board.current,
                playable: gameEvent.playable,
                tally: gameEvent.board.tally,
                id: state.id
            }
            database.ref(`games/${state.id}/state`).set(gameState);
            return;

        } else {
            console.warn('Invalid move');
        }
    }
}

export function getGameList(snapshot){
    return {
        type: types.GET_GAME_LIST,
        payload: snapshot
    }
}

export function updateGame(game) {

    return dispatch => {
        const gameState = game.state;
        
        dispatch({
            type: types.UPDATE_GAME,
            gameState
        });
    }

    
}

export function joinGame(game, info_key){
    
    return dispatch => {
        const { uid } = auth.currentUser;
        const { players, state: { id } } = game;
        const playerIds = Object.keys(players);

        if(playerIds.length < 2){
            if(playerIds.indexOf(uid) === -1){
                
                const playersUpdate = {};
                playersUpdate[`games/${id}/players/${uid}`] = 2;
                database.ref().update(playersUpdate).then(() => {

                    const update = {};
                    update[`game_list/${info_key}/num_players`] = 2;
                    database.ref().update(update);
                    game.you = 2;
                    game.players[uid] = 2;
                    dispatch({
                        type: types.JOIN_GAME,
                        payload: game
                    });
                    return;
                })
            } else {
                console.warn('Player already in game');
            }
        } else {
            console.log('Game full');
            if(playerIds.indexOf(uid) !== -1){
                console.log('Player in full game', game);
                const payload = game;
                payload.you = game.players[uid];
                payload.gid = id;

                dispatch({
                    type: types.RE_JOIN_GAME,
                    payload
                });
                return;
            }
        }
        return {
            type: 'idk'
        }
    }
}

export function createGame(name){
    return dispatch => {
        const game = new Game([1, 2], {});
        const { state } = game;
        const newGame = { state, players: {}, name };
        const { id } = newGame.state;

        newGame.players[auth.currentUser.uid] = 1;

        database.ref('games/' + id).set(newGame).then(() => {
            const game_info = {
                game_id: id,
                num_players: 1,
                name
            }
            database.ref('game_list').push(game_info).then(() => {
                newGame.gid = id;
                newGame.you = 1;
                dispatch({
                    type: types.CREATE_GAME,
                    payload: newGame
                })
            });
        });
    }
}

export function sendError(msg){
    return {
        type: types.AUTH_ERROR,
        error: msg
    }
}

export function createAccount(userInfo){
    return dispatch => {
        auth.createUserWithEmailAndPassword(userInfo.email, userInfo.password).then(resp => {

            resp.updateProfile({
                displayName: userInfo.username
            }).then(() => {
                dispatch({type: types.LOG_IN, username: userInfo.username});
            }).catch((e) => {
                console.warn('Error updating DisplayName:', e);
            })

        }).catch(error => {
            console.warn('There was an error creating account:', error.message, error.code);
            dispatch({
                type: types.AUTH_ERROR,
                error: 'Error creating user'
            });
        });
    }
}

export function login({displayName, email, password}){

    return function(dispatch){
        const error = {
            type: types.AUTH_ERROR,
            error: 'Error Logging In'
        };

        if(!password){
            dispatch({
                type: types.LOG_IN,
                username: displayName
            });
            return;
        }
        if(email && password) {
            auth.signInWithEmailAndPassword(email, password).then(user => {
                dispatch({
                    type: types.LOG_IN,
                    username: user.displayName
                });
            }).catch((e) => {
                console.warn('Error logging in:', e);
                dispatch(error);
            })
            return;
        }
        dispatch(error);
    }
}

export function logout(){
    return function(dispatch){
        auth.signOut().then(() => {
            dispatch({type: types.LOG_OUT});
        }).catch((e) => {
            console.warn('Error logging out:', e);
            dispatch({
                type: types.AUTH_ERROR,
                error: 'Error Logging Out'
            })
        });
    }
}
