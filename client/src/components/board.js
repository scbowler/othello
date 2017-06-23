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

    componentWillReceiveProps(nextProps){
        if(nextProps.user && !nextProps.user.auth){
            this.props.history.push('/');
        }
    }

    render(){
        if(!this.props.game.playable){
            return <h1 className="text-center text-success">Game Over!</h1>;
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
                <div className="board-container">
                    {boardHtml}
                </div>
                <ScoreBoard/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        game: state.game.gameState,
        status: state.game.status,
        you: state.game.you,
        gid: state.game.gid
    }
}

export default withRouter(connect(mapStateToProps, actions)(Board));