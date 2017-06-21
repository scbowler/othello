"use strict";

const OthelloPlayers = function(playerNames){
    Object.defineProperties(this, {
        names: {
            value: playerNames,
            writable: false,
            enumerable: true
        },
        _current: {
            value: 0,
            enumerable: false,
            writable: true
        },
        current: {
            get: function(){
                return this.names[this._current]
            }
        },
        winning: {
            value: null,
            enumerable: true,
            writable: true
        }
    });
};

OthelloPlayers.prototype.next = function(){
    this._current++;
    while (this._current >= this.names.length){
        this._current -= this.names.length;
    }
    return this.current;
};

export default OthelloPlayers;
