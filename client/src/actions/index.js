import types from './types';
import { auth } from '../firebase';

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

export function createAccount(userInfo){
    return dispatch => {
        auth.createUserWithEmailAndPassword(userInfo.email, userInfo.password).then(resp => {
            console.log('Create User Resp:');

            resp.updateProfile({
                displayName: userInfo.displayName
            }).then(() => {
                dispatch({type: types.LOG_IN, username: userInfo.displayName});
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
