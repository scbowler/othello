"use strict";

import Players from './players';
import Board from './board';

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
                    current: this._board.current,
                    tally: this._board.tally
                };
            }
        }
    });

    this.state = function(){
        return {
            playable: this.playable,
            player: this.players.current,
            board: this.board.current,
            tally: this.board.tally
        };
    };

    this.place = function(player, placeX, placeY){
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

        // Change player or finish game

        result.success = true;
        let newPlayer = player;
        do {
            newPlayer = this.players.next();
            if (this._board.hasValidPositions(newPlayer)){
                result.state = this.state();
                return result;
            }
        } while (newPlayer !== player);
        this._playable = false;
        result.state = this.state();
        result.events.push('game_finish');
        return result;
    };
};



export default OthelloGame;
