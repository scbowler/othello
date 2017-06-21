"use strict";

const events = {
    game: {
        start: function(newGame){
            return {
                type: 'game_start',
                payload: {
                    game: newGame
                }
            };
        },
        end: function(winningPlayer){
            return {
                type: 'game_end',
                payload: {
                    winner: winningPlayer
                }
            };
        }
    },
    player: {
        skip: function(player){
            return {
                type: 'player_skip',
                payload: {
                    player: player
                }
            };
        },
        change: function(to, from){
            return {
                type: 'player_change',
                payload: {
                    from: from,
                    to: to
                }
            };
        },
        recalculateWinner: function(toPlayer, fromPlayer){
            return {
                type: 'player_recalculate_winner',
                payload: {
                    to: toPlayer,
                    from: fromPlayer
                }
            };
        }
    },
    board: {
        place: function(pos, player){
            return {
                type: 'board_place',
                payload: {
                    position: pos,
                    to: player
                }
            };
        },
        flip: function(pos, toPlayer, fromPlayer){
            return {
                type: 'board_flip',
                payload: {
                    position: pos,
                    to: toPlayer,
                    from: fromPlayer
                }
            };
        },
        rescore: function(score){
            return {
                type: 'board_rescore',
                payload: {
                    score: score
                }
            };
        }
    }
};

export default events;
