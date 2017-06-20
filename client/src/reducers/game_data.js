const boardSize = {x: 8, y: 8};

function build_board(size){
    const board = [];

    for(let x = 0; x < size.x; x++){
        const row = [];
        for(let y = 0; y < size.y; y++){
            let piece = 0;
            if((x + 1) === (size.x/2)){
                if((y + 1) === (size.y/2)){
                    piece = 1;
                }
                if((y) === (size.y/2)){
                    piece = 2;
                }
            } else if((x) === (size.x/2)){
                if((y + 1) === (size.y/2)){
                    piece = 2;
                }
                if((y) === (size.y/2)){
                    piece = 1;
                }
            }
            row.push({piece});
        };
        board.push(row);
    }

    return board;
}

// export const BOARD = build_board(boardSize);
