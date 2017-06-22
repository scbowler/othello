"use strict";

const OthelloPlayers = function(playerNames, currentPlayer = playerNames[0]){

    // Define Players properties
    Object.defineProperties(this, {
        names: {
            value: playerNames,
            writable: false,
            enumerable: true
        },
        _current: {
            value: playerNames.indexOf(currentPlayer),
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

// Define Players public methods
OthelloPlayers.prototype.next = function(){
    this._current++;
    while (this._current >= this.names.length){
        this._current -= this.names.length;
    }
    return this.current;
};

export default OthelloPlayers;
