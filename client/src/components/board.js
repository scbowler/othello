import React, { Component } from 'react';
import { connect } from 'react-redux';
import { place_piece } from '../actions/index';
import './board.css';

class Board extends Component {
    createSquare(info, loc){
        return (
            <div className="board-square" onClick={() => { this.handleClick(loc)}}>
                <div className={`game-piece piece-${info ? info : 0}`}></div>
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
            <div className="board-container">
                <h3>Player {this.props.turn}'s Turn</h3>
                {boardHtml}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        board: state.game.game.board.current,
        turn: state.game.game.players.current,
        playable: state.game.game.playable
    }
}

export default connect(mapStateToProps, {place_piece})(Board);