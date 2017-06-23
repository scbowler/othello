import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';
import { database } from '../firebase';
import { auth } from '../firebase';

class Lobby extends Component {
    componentDidMount(){
        console.log('CWM Lobby');
        if(!this.props.auth || !auth.currentUser){
            console.log('Not auth:', this.props.auth);
            console.log('fbAuth:', auth.currentUser);
            this.props.history.push('/');
        } else if(auth.currentUser){
            this.props.login(auth.currentUser);
            database.ref('game_list').on('value', (snap) =>{
                console.log('FB listener called')
                this.props.getGameList(snap.val());
            });
        } else {
            console.log('*^#&@*&#$@');
        }
    }

    componentWillReceiveProps(nextProps){
        console.log('CWRP Lobby');
        if(!nextProps.auth){
            this.props.history.push('/');
        }

        if(nextProps.gid){
            this.props.history.push(`/game/${nextProps.gid}`);
        }
    }

    joinGame(id, game_info){
        console.log('Join game called');
        database.ref(`games/${id}`).once('value').then( snap => {
            this.props.joinGame(snap.val(), game_info);
        })
    }

    createGame(){
        console.log('Create game clicked');
        this.props.createGame();
    }

    buildList(list){
        if(!list){
            return <div></div>;
        }
        console.log('The list', list);
        return Object.keys(list).map((k, i) => {
            if(list[k].num_players == 2){
                return (
                    <tr key={i} className="text-muted">
                        <td>{list[k].name}</td>
                        <td>Full</td>
                    </tr>
                )
            }
            return (
                <tr style={{cursor: 'pointer'}} className="text-success" key={i} onClick={() => this.joinGame(list[k].game_id, k)}>
                    <td>{list[k].name}</td>
                    <td>{list[k].num_players}</td>
                </tr>
            )
        })
    }

    render(){
        const tableHeaders = {
            textAlign: 'center',
            fontSize: '32px'
        }
        
        return (
            <div className="text-center container">
                <h1>The Lobby</h1>
                <button onClick={() => this.createGame()} className="btn btn-lg btn-success">Create New Game</button>
                <table className="table table-striped" style={{fontSize: '28px'}}>
                    <thead>
                        <tr>
                            <th style={tableHeaders}>Game Name</th>
                            <th style={tableHeaders}>Number of Players</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.buildList(this.props.list)}
                    </tbody>
                </table>
            </div>
        )
    }
}

function mstp(state){
    return {
        auth: state.user.auth,
        list: state.game.list,
        gid: state.game.gid
    }
}

export default withRouter(connect(mstp, actions)(Lobby));
