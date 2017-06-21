"use strict";

import Players from './players';
import Board from './board';
import events from './events';

const OthelloGame = function(players){
    Object.defineProperties(this, {
        id: {
            value: '' + Math.floor(Math.random() * Math.pow(10, 10)),
            enumerable: true,
            writable: false
        },
        _playable: {
            value: true,
            enumerable: false,
            writable: true
        },
        playable: {
            get: function(){
                return this._playable;
            },
            enumerable: true
        },
        players: {
            value: new Players(players),
            enumerable: true,
            writable: false
        },
        _board: {
            value: new Board(players),
            enumerable: true,
            writable: false
        },
        board: {
            get: function(){
                return {
                    current: this._board.possible(this.players.current),
                    tally: this._board.tally
                };
            }
        }
    });
};

OthelloGame.prototype.state = function(){
    return {
        playable: this.playable,
        player: {
            current: this.players.current,
            winning: this.players.winning
        },
        board: this.board.current,
        tally: this.board.tally
    };
};

OthelloGame.prototype.place = function(player, placeX, placeY){
    const place = [placeX, placeY];
    const result = {
        success: false,
        events: [],
        state: this.state()
    };

    // Test playable

    if (!this.playable){
        result.errors = ['game_inactive'];
        return result;
    }

    // Test player

    if (player !== this.players.current){
        result.errors = ['player_invalid'];
        return result;
    }

    // Test placement

    if (!this._board.hasValidPositions(player)){
        this._playable = false;
        result.errors = ['game_inactive'];
        return result;
    }
    const attempt = this._board.place(player, placeX, placeY);
    if (!attempt){
        result.errors = ['placement_invalid'];
        return result;
    }
    for (let i = 0, len = attempt.length; i < len; i++){
        if (attempt[i].prev !== null){
            result.events.push(events.board.flip(attempt[i].loc, player, attempt[i].prev));
        } else {
            result.events.push(events.board.place(attempt[i].loc, player));
        }
    }

    // Update score and winning player
    const tally = this.board.tally;
    result.events.push(events.board.rescore(tally));
    const oldWinner = this.players.winning;
    if (oldWinner !== player){
         if (oldWinner === null){
             this.players.winning = player;
             result.events.push(events.player.recalculateWinner(player, null));
         } else {
             if (tally[player] > tally[oldWinner]){
                 this.players.winning = player;
                 result.events.push(events.player.recalculateWinner(player, oldWinner));
             } else if (tally[player] === tally[oldWinner]){
                 this.players.winning = null;
                 result.events.push(events.player.recalculateWinner(null, oldWinner));
             }
         }
    }

    // Change player or finish game

    result.success = true;
    let newPlayer = player;
    do {
        newPlayer = this.players.next();
        if (this._board.hasValidPositions(newPlayer)){
            result.state = this.state();
            result.events.push(events.player.change(newPlayer, player));
            return result;
        } else {
            result.events.push(events.player.skip(newPlayer));
        }
    } while (newPlayer !== player);
    this._playable = false;
    result.state = this.state();
    result.events.push(events.game.end('NYI'));
    return result;
};


export default OthelloGame;
