import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';
import { database } from '../firebase';
import { auth } from '../firebase';

class Lobby extends Component {
    constructor(props){
        super(props);

        this.state = {
            viewNameGame: false,
            newGameVal: '',
            error: '',
            nameValid: true
        }

        this.minNameLength = 4;
    }

    toggleNewBtn(){
        this.setState({
            viewNameGame: !this.state.viewNameGame
        });
    }

    handleChange(e){
        const { value } = e.target;
        const newState = {
            newGameVal: value,
            error: value.length >= this.minNameLength || value === '' ? false : 'Name too short'
        };

        this.setState(newState);
    }

    componentDidMount(){
        if(auth.currentUser){
            this.props.login(auth.currentUser);
            database.ref('game_list').on('value', (snap) =>{
                this.props.getGameList(snap.val());
            });
        } else {
            console.warn('*^#&@*&#$@');
        }
    }

    componentWillReceiveProps(nextProps){
        if(!nextProps.auth){
            this.props.history.push('/');
        }

        if(nextProps.gid){
            this.props.history.push(`/game/${nextProps.gid}`);
        }
    }

    joinGame(id, game_info){
        database.ref(`games/${id}`).once('value').then( snap => {
            this.props.joinGame(snap.val(), game_info);
        })
    }

    createGame(e){
        if(e){
            e.preventDefault();
        }

        const { newGameVal } = this.state;
        const empty = newGameVal === '';
        
        if(!empty && newGameVal.length >= this.minNameLength){
            this.props.createGame(newGameVal);
            this.setState({
                viewNameGame: false,
                newGameVal: ''
            });
        } else {
            const error = empty ? 'Please enter a game name' : `Game name must be at least ${this.minNameLength} characters`;
            this.setState({error});
        }
    }

    buildList(list){
        if(!list){
            const noGames = {
                color: 'white',
                fontSize: '1.5em',
                backgroundColor: 'rgba(0, 0, 0, .3)'
            }
            return <tr><td style={noGames} colSpan="2">No Available Games</td></tr>;
        }
    
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
            fontSize: '32px',
            color: 'white'
        }
        const hide = {
            display: 'none'
        }
        const errorStyle = {
            backgroundColor: 'rgba(0, 0, 0, .8)',
            padding: '10px 20px'
        }
        const { viewNameGame, error } = this.state;
        
        return (
            <div className="text-center container">
                <h1>The Lobby</h1>
                <div>
                    <button onClick={() => viewNameGame ? this.createGame() : this.toggleNewBtn() } className="btn btn-lg btn-outline-success mb-3">{ viewNameGame ? 'Start Game' : 'Create New Game'}</button>
                    <form style={viewNameGame ? {} : hide} className="form row justify-content-center" onSubmit={(e) => this.createGame(e)}>
                        <div className={`form-group ${ error ? 'has-danger' : ''}`}>
                            <input
                                style={{width: '410px'}}
                                onChange={e => this.handleChange(e)}
                                value={this.state.newGameVal}
                                className={`form-control mb-3 ${ error ? 'form-control-danger' : ''}`}
                                placeholder="Enter Game Name"
                            />
                            <div style={ error ? errorStyle : {} } className="form-control-feedback">{error}</div>
                        </div>
                    </form>
                </div>
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
