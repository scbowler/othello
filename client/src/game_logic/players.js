"use strict";

const OthelloPlayers = function(playerNames, config = {}){

    // Define Players state
    if (!config.hasOwnProperty('current') || playerNames.indexOf(config.current) === -1){
        config.current = playerNames[0]
    }
    if (!config.hasOwnProperty('winning') || playerNames.indexOf(config.winning === -1)){
        config.winning = null;
    }
    // Define Players properties
    Object.defineProperties(this, {
        names: {
            value: playerNames,
            writable: false,
            enumerable: true
        },
        _current: {
            value: playerNames.indexOf(config.current),
            enumerable: false,
            writable: true
        },
        current: {
            get: function(){
                return this.names[this._current]
            }
        },
        winning: {
            value: playerNames.indexOf(config.winning),
            enumerable: true,
            writable: true
        }
    });
};

// Define Players public methods
OthelloPlayers.prototype.startNextTurn = function(){
    this._current++;
    while (this._current >= this.names.length){
        this._current -= this.names.length;
    }
    return this.current;
};

export default OthelloPlayers;
