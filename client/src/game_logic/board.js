"use strict";

const OthelloBoard = function(players, boardConfig = []){

    // Define Board state
    const boardSize = 8;
    const boardInitial = new Array(boardSize);
    for (let i = 0; i < boardSize; i++){
        boardInitial[i] = new Array(boardSize);
        for (let j = 0; j < boardSize; j++){
            if (boardConfig.hasOwnProperty(i) && boardConfig[i].hasOwnProperty(j) && players.indexOf(boardConfig[i][j]) !== -1){
                boardInitial[i][j] = boardConfig[i][j];
            } else {
                boardInitial[i][j] = null;
            }
        }
    }

    // Define Board properties
    Object.defineProperties(this, {
        current: {
            value: boardInitial,
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

// Define Board public methods
OthelloBoard.prototype.boardWithPossibleMoves = function(player){
    const possible = this._deepSlice(this.current);
    for (let i = 0, iLen = this.current.length; i < iLen; i++){
        for (let j = 0, jLen = this.current[i].length; j < jLen; j++){
            if (possible[i][j] === null){
                possible[i][j] = this._isMoveValid(player, [i, j]);
            }
        }
    }
    return possible;
};

OthelloBoard.prototype.placePiece = function(player, pos){
    if (!this._isMoveValid(player, pos)){
        return false;
    }
    return this._placePiece(player, pos);
};

OthelloBoard.prototype.playerHasValidMoves = function(player){
    for (let i = 0, iLen = this.current.length; i < iLen; i++){
        for (let j = 0, jLen = this.current[i].length; j < jLen; j++){
            if (this._isMoveValid(player, [i, j])){
                return true;
            }
        }
    }
    return false;
};

// Define Board private methods
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

OthelloBoard.prototype._deepSlice = function(originalArray){
    const newArray = [];
    for (let i = 0, len = originalArray.length; i < len; i++){
        if (!Array.isArray(originalArray[i])){
            // Base case
            newArray.push(originalArray[i]);
        } else {
            // Recursive case
            newArray.push(this._deepSlice(originalArray[i]));
        }
    }
    return newArray;
};

OthelloBoard.prototype._isMoveValid = function(player, pos){
    if (!this._isSquareOnBoard(pos)){
        return false;
    }
    if (!this._isSquareEmpty(pos[0], pos[1])){
        return false;
    }
    if (!this._canMoveFlipPiece(player, pos[0], pos[1])){
        return false;
    }
    return true;
};

OthelloBoard.prototype._isSquareOnBoard = function(pos){
    if (this.current.hasOwnProperty(pos[0]) && this.current[pos[0]].hasOwnProperty(pos[1])){
        return true;
    }
    return false;
};

OthelloBoard.prototype._isSquareEmpty = function(xPos, yPos){
    if (Array.isArray(xPos)){
        yPos = xPos[1];
        xPos = xPos[0];
    }
    if (this.current[xPos][yPos] !== null){
        return false;
    }
    return true;
};

OthelloBoard.prototype._canMoveFlipPiece = function(player, placeX, placeY){
    const directions = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
    for (let i = 0, len = directions.length; i < len; i++){
        if (this._flippablePiecesInDirection(player, [placeX, placeY], directions[i]).length > 0){
            return true;
        }
    }
    return false;
};

OthelloBoard.prototype._squareBelongsToPlayer = function(player, pos){
    return player === this.current[pos[0]][pos[1]];
};

OthelloBoard.prototype._flippablePiecesInDirection = function(player, start, direction){
    const next = [
        start[0] + direction[0],
        start[1] + direction[1]
    ];
    // Base case
    if (!this._isSquareOnBoard(next) || this._isSquareEmpty(next)){
        return false;
    }
    if (this._squareBelongsToPlayer(player, next)){
        return [];
    }
    // Recursive case
    const after = this._flippablePiecesInDirection(player, next, direction);
    if (after === false){
        return false;
    }
    return [{loc: next, prev: this.current[next[0]][next[1]]}].concat(after);
};

OthelloBoard.prototype._placePiece = function(player, placed){
    let gainedPieces = [{loc: placed, prev: null}];

    const directions = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
    for (let i = 0, len = directions.length; i < len; i++){
        const flipped = this._flippablePiecesInDirection(player, placed, directions[i]);
        if (flipped !== false && flipped.length > 0){
            gainedPieces = gainedPieces.concat(flipped);
        }
    }
    for (let i = 0, len = gainedPieces.length; i < len; i++){
        this.current[gainedPieces[i].loc[0]][gainedPieces[i].loc[1]] = player;
    }
    return gainedPieces;
};

export default OthelloBoard;
