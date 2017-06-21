import React from 'react';
import { connect } from 'react-redux';

const ScoreBoard = (props) => {
    const scoreContainer = {
        margin: '5px auto',
        fontSize: '30px',
        width: '600px',
        textAlign: 'center'
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

    return (
        <div style={scoreContainer}>
            <div style={ props.turn == '1' ? active1 : inactive }>Player 1: {props.player1}</div>
            <div style={ props.turn == '2' ? active2 : inactive }>Player 2: {props.player2}</div>   
        </div>
    )
}

function mapStateToProps(state){
    return {
        player1: state.game.board.tally['1'],
        player2: state.game.board.tally['2'],
        turn: state.game.players.current,
    }
}

export default connect(mapStateToProps)(ScoreBoard);
