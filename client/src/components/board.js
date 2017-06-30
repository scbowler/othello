import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ScoreBoard from './score_board';
import * as actions from '../actions';
import { auth, database } from '../firebase';
import './board.css';

class Board extends Component {
    componentWillMount(){
        database.ref('games/' + this.props.match.params.id).on('value', snap => {
            this.props.gid ? this.props.updateGame(snap.val()) : this.props.joinGame(snap.val());
        });
    }

    componentWillReceiveProps(nextProps){
        if(!nextProps.gid){
            this.props.history.push('/lobby');
        }
    }
    
    createSquare(info, loc){
        return (
            <div className="board-square" onClick={() => { this.handleClick(loc)}}>
                <div className={`game-piece piece-${info ? info === true ? 'ghost-' + this.props.game.player.current : info : 0}`}></div>
            </div>
        )
    }

    handleClick(loc){
        const { game, status, you} = this.props;
        this.props.place_piece(loc, game, status, you);
    }

    endingScore(){
        const { players } = this.props;
        const { tally } = this.props.game;
        if(!tally){
            return (
                <tr></tr>
            )
        }
        return Object.keys(players).map((k, i) => {
            const player = players[k];
            return (
                <tr key={i}>
                    <td>{player.displayName}</td>
                    <td>{tally[player.player]}</td>
                </tr>
            )
        });
    }

    render(){
        if(!this.props.game.playable){
            return (
                <div className="row">
                    <h1 className="text-center text-success">Game Over!</h1>
                </div>
            );
        }
        const boardHtml = this.props.game.board.map((row, rowNum) => {
            const rowOfSq = [];
            row.map((sq, colNum) => {
                rowOfSq.push(this.createSquare(sq, {r: rowNum, c: colNum}));
            });

            return rowOfSq;
        });

        return (
            <div className="game-container">
                {this.props.game.playable ? '' : <h1>Game Over!</h1>}
                <div className="board-container">
                    {boardHtml}
                </div>
                {Object.keys(this.props.players).length > 1 ? <ScoreBoard/> : <h3>Waiting on other player</h3>}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        game: state.game.gameState,
        players: state.game.players,
        you: state.game.you,
        gid: state.game.gid
    }
}

export default withRouter(connect(mapStateToProps, actions)(Board));