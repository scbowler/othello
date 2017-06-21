import React from 'react';
import { connect } from 'react-redux';

const ScoreBoard = (props) => {
    const scoreContainer = {
        margin: '5px auto',
        fontSize: '30px',
        width: '600px',
        textAlign: 'left'
    }

    const inactive = {
        color: 'gray'
    }

    const active1 = {
        color: 'black',
        padding: '10px',
        border: '2px solid black'
    }

    const active2 = {
        color: 'white',
        backgroundColor: 'black',
        padding: '10px',
        border: '2px solid black'
    }

    if(!props.playable){
        let winner = 'Player 1 Wins!';
        if(props.player1 < props.player2){
            winner = 'Player 2 Wins!';
        } else if(props.player1 === props.player2) {
            winner = "It's a Tie!"
        }
        return <h1 className="text-center">{`${winner} ${props.player1} to ${props.player2}`}</h1>;
    }

    return (
        <div style={scoreContainer}>
            <div style={ props.turn == '1' ? active1 : inactive }>Player 1: {props.player1}</div>
            <div style={ props.turn == '2' ? active2 : inactive }>Player 2: {props.player2}</div>
        </div>
    )
}

function mapStateToProps(state){
    return {
        player1: state.game.game.board.tally['1'],
        player2: state.game.game.board.tally['2'],
        turn: state.game.game.players.current,
        playable: state.game.game.playable
    }
}

export default connect(mapStateToProps)(ScoreBoard);
