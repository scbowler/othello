"use strict";

const OthelloBoard = function(players){
    Object.defineProperties(this, {
        current: {
            value: (function(){
                let grid = new Array(8);
                for (let i = 0, len = grid.length; i < len; i++){
                    grid[i] = new Array(8);
                    grid[i].fill(null);
                }
                grid[3][4] = grid[4][3] = players[0];
                grid[3][3] = grid[4][4] = players[1];
                return grid;
            })(),
            enumerable: true,
            writable: false
        },
        tally: {
            get: function(){
                return this._tally();
            }
        }
    });
};

OthelloBoard.prototype._tally = function(){
    const tally = {};
    for (let i = 0, iLen = this.current.length; i < iLen; i++){
        for (let j = 0, jLen = this.current.length; j < iLen; j++){
            const current = this.current[i][j];
            if (tally.hasOwnProperty(current)){
                tally[current]++;
            } else {
                tally[current] = 1;
            }
        }
    }
    return tally;
};

OthelloBoard.prototype.place = function(player, xPos, yPos){
    if (!this._checkValidPosition(player, [xPos, yPos])){
        return false;
    }
    this._place(player, xPos, yPos);
    return true;
};

OthelloBoard.prototype.hasValidPositions = function(player){
    for (let i = 0, iLen = this.current.length; i < iLen; i++){
        for (let j = 0, jLen = this.current[i].length; j < jLen; j++){
            if (this._checkValidPosition(player, [i, j])){
                return true;
            }
        }
    }
    return false;
};

OthelloBoard.prototype._checkValidPosition = function(player, pos){
    if (!this._onBoard(pos)){
        return false;
    }
    if (!this._empty(pos[0], pos[1])){
        return false;
    }
    if (!this._canFlip(player, pos[0], pos[1])){
        return false;
    }
    return true;
};

OthelloBoard.prototype._onBoard = function(pos){
    if (this.current.hasOwnProperty(pos[0]) && this.current[pos[0]].hasOwnProperty(pos[1])){
        return true;
    }
    return false;
};

OthelloBoard.prototype._empty = function(xPos, yPos){
    if (Array.isArray(xPos)){
        yPos = xPos[1];
        xPos = xPos[0];
    }
    if (this.current[xPos][yPos] !== null){
        return false;
    }
    return true;
};

OthelloBoard.prototype._canFlip = function(player, placeX, placeY){
    const directions = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
    for (let i = 0, len = directions.length; i < len; i++){
        if (this._getFlipped(player, [placeX, placeY], directions[i]).length > 0){
            return true;
        }
    }
    return false;
};

OthelloBoard.prototype._isPlayer = function(player, pos){
    return player === this.current[pos[0]][pos[1]];
};

OthelloBoard.prototype._getFlipped = function(player, start, direction){
    const board = this.current;
    const next = [
        start[0] + direction[0],
        start[1] + direction[1]
    ];
    // Base case
    if (!this._onBoard(next) || this._empty(next)){
        return false;
    }
    if (this._isPlayer(player, next)){
        return [];
    }
    // Recursive case
    const after = this._getFlipped(player, next, direction);
    if (after === false){
        return false;
    }
    return [next].concat(after);
};

OthelloBoard.prototype._place = function(player, placedX, placedY){
    const placed = [placedX, placedY];
    let gainedPieces = [placed];

    const directions = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
    for (let i = 0, len = directions.length; i < len; i++){
        const flipped = this._getFlipped(player, placed, directions[i]);
        if (flipped !== false && flipped.length > 0){
            gainedPieces = gainedPieces.concat(flipped);
        }
    }
    for (let i = 0, len = gainedPieces.length; i < len; i++){
        this.current[gainedPieces[i][0]][gainedPieces[i][1]] = player;
    }
    return gainedPieces;
};

export default OthelloBoard;
