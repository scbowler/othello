import React, { Component } from 'react';
import { connect } from 'react-redux';
import ScoreBoard from './score_board';
import * as actions from '../actions';
import { auth, database } from '../firebase';
import './board.css';

class Board extends Component {
    componentWillMount(){
        console.log('Board CWM:', this.props.match.params.id);
        database.ref('games/' + this.props.match.params.id).on('value', snap => {
            console.log('Game CWM in Board:', this.props.gid);
            if(this.props.gid){
                console.log('UpdateGame Being Called');
                this.props.updateGame(snap.val());
            } else {
                console.log('JoinGame Being Called');
                this.props.joinGame(snap.val());
            }
        })
    }
    
    createSquare(info, loc){
        return (
            <div className="board-square" onClick={() => { this.handleClick(loc)}}>
                <div className={`game-piece piece-${info ? info === true ? 'ghost-' + this.props.game.current : info : 0}`}></div>
            </div>
        )
    }

    handleClick(loc){
        console.log('Game square clicked:', loc);
        const { game, status, you} = this.props;
        this.props.place_piece(loc, game, status, you);
    }

    componentWillReceiveProps(nextProps){
        console.log('nextProps.game.playable: ', nextProps.game.playable);
    }

    render(){
        if(!this.props.game.playable){
            return <h1 className="text-center text-success">Game Over!</h1>;
        }
        const boardHtml = this.props.game.board.map((row, rowNum) => {
            const rowOfSq = []
            row.map((sq, colNum) => {
                rowOfSq.push(this.createSquare(sq, {r: rowNum, c: colNum}));
            });

            return rowOfSq;
        });

        console.log('BoardHtml:', boardHtml);
        return (
            <div>
                <ScoreBoard/>
                <div className="board-container">
                    {boardHtml}
                </div>
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

export default connect(mapStateToProps, actions)(Board);