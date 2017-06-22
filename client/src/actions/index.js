import types from './types';
import Game from '../game_logic/game';
import { auth, database } from '../firebase';
const game = {}

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

export function joinGame(game){
    game.game = new Game([1, 2]);

    
}

export function createGame(){
    return dispatch => {
        game.game = new Game([1, 2]);

        const gameName = 'Test Game 1';

        const { state: { board, playable, tally, player }} = game.game;
        const newGame = { board, playable, tally, player, players: {} };
        newGame.players[auth.currentUser.uid] = 1;

        console.log('New Game:', newGame);

        database.ref('games').push(newGame).then(resp => {
            console.log('New game key:', resp.key);
            const game_info = {
                game_id: resp.key,
                name: gameName,
                num_players: 1,
            }
            database.ref('game_list').push(game_info).then(() => {
                console.log('Game Created successful');
                newGame.gid = resp.key;
                newGame.you = 1;
                dispatch({
                    type: types.CREATE_GAME,
                    payload: newGame
                })
            });
        });
    }
}

export function updateGame(game) {
    console.log('Update game called:', game);

    return {
        type: types.UPDATE_GAME,
        payload: game
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
            console.log('Create User Resp:');

            resp.updateProfile({
                displayName: userInfo.username
            }).then(() => {
                dispatch({type: types.LOG_IN, username: userInfo.username});
            }).catch((e) => {
                console.warn('Error updating DisplayName:', e);
            })

        }).catch(error => {
            console.warn('There was an error creating account:', error.message, error.code);
            // auth/email-already-in-use
            dispatch({
                type: types.AUTH_ERROR,
                error: 'Error creating user'
            });
        });
    }
}

export function login({displayName, email, password}){
    console.log('Email', email);
    console.log('Password', password);
    console.log('Username', displayName);

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
