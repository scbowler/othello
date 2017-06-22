import React, { Component } from 'react';
import { connect } from 'react-redux';
import ScoreBoard from './score_board';
import { place_piece, updateGame } from '../actions';
import { database } from '../firebase';
import './board.css';

class Board extends Component {
    componentWillMount(){
        console.log('Board CWM:', this.props.match.params.id);

        database.ref('games/' + this.props.match.params.id).on('value', snap => {
            this.props.updateGame(snap.val());
        })
    }
    
    createSquare(info, loc){
        console.log('Info:', info === true);
        return (
            <div className="board-square" onClick={() => { this.handleClick(loc)}}>
                <div className={`game-piece piece-${info ? info === true ? 'ghost-' + this.props.turn : info : 0}`}></div>
            </div>
        )
    }

    handleClick(loc){
        console.log('Game square clicked:', loc);
        this.props.place_piece(loc);
    }

    componentWillReceiveProps(nextProps){
        console.log('nextProps.playable: ', nextProps.playable);
    }

    render(){
        if(!this.props.playable){
            return <h1 className="text-center text-success">Game Over!</h1>;
        }
        const boardHtml = this.props.board.map((row, rowNum) => {
            console.log('Row data:', row);
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
        board: state.game.board,
        turn: state.game.players.current,
        playable: state.game.playable
    }
}

export default connect(mapStateToProps, {place_piece, updateGame})(Board);