import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './score_board.css';
import blueAlien from './images/player1.png';
import greenAlien from './images/player2.png';
import { leaveGame } from '../actions';

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

    const playerNames = Object.keys(props.players).map((k) => {
        return {
            name: props.players[k].displayName,
            pos: props.players[k].player
        };
    });

    console.log('Players:', playerNames);
    return (
        <div className="score-container">
            <h2 className="text-center">{props.name}</h2>
            <div className="player-list">
                <div className={ `player ${props.turn == '1' ? 'active1' : 'inactive'}` }>
                    <div className="player-name">
                        <img src={blueAlien}/><span className="mobile-hide">{playerNames[0].pos === 1 ? playerNames[0].name : playerNames[1].name}</span>
                        <div className="player-score">
                            {props.player1}
                        </div>
                    </div>
                    
                </div>
                <div className={ `player ${props.turn == '2' ? 'active2' : 'inactive'}` }>
                    <div className="player-name">
                        <img src={greenAlien}/><span className="mobile-hide">{playerNames[0].pos === 2 ? playerNames[0].name : playerNames[1].name}</span>
                        <div className="player-score">
                            {props.player2}
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="score-footer">
                <div className="btn-leave" onClick={() => props.leaveGame()}>Leave Game</div>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return {
        player1: state.game.gameState.tally['1'],
        player2: state.game.gameState.tally['2'],
        players: state.game.players,
        turn: state.game.gameState.player.current,
        playable: state.game.gameState.playable,
        name: state.game.name
    }
}

export default connect(mapStateToProps, {leaveGame})(ScoreBoard);
