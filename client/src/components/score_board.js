import React from 'react';
import { connect } from 'react-redux';
import './score_board.css';
import blueAlien from './images/player1.png';
import greenAlien from './images/player2.png';

const ScoreBoard = (props) => {
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
        <div className="score-container">
            <h2 className="text-center">{props.name}</h2>
            <div className="player-list">
                <div className={ `player ${props.turn == '1' ? 'active1' : 'inactive'}` }><img src={blueAlien}/>Player 1: {props.player1}</div>
                <div className={ `player ${props.turn == '2' ? 'active2' : 'inactive'}` }><img src={greenAlien}/>Player 2: {props.player2}</div>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return {
        player1: state.game.gameState.tally['1'],
        player2: state.game.gameState.tally['2'],
        turn: state.game.gameState.player.current,
        playable: state.game.gameState.playable,
        name: state.game.name
    }
}

export default connect(mapStateToProps)(ScoreBoard);
