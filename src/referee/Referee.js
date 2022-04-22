export default class Referee {
  tileIsOccupied(x, y, boardState) {
    const piece = boardState.find((p) => p.x === x && p.y === y);
    if (piece) {
      return true;
    } else return false;
  }

  tileIsOccupiedByOpp(x, y, boardState, team) {
    const piece = boardState.find(
      (p) => p.x === x && p.y === y && p.team !== team
    );
    if (piece) {
      return true;
    } else return false;
  }

  isValidMove(prevX, prevY, x, y, pieceType, team, boardState) {
    // console.log("Referee is checking the move");
    // console.log(`Prev Location: (${prevX},${prevY})`);
    // console.log(`New Location: (${x},${y})`);
    // console.log(`Piece type: ${pieceType}`);

    if (pieceType === "pawn") {
      const specialRow = team === "1" ? 1 : 6;
      const pawnDirection = team === "1" ? 1 : -1;
      //Movement Logic
      if (
        prevX === x &&
        prevY === specialRow &&
        y - prevY === 2 * pawnDirection
      ) {
        if (
          !this.tileIsOccupied(x, y, boardState) &&
          !this.tileIsOccupied(x, y - pawnDirection, boardState)
        )
          return true;
      } else if (prevX === x && y - prevY === pawnDirection) {
        if (!this.tileIsOccupied(x, y, boardState)) return true;
      }
      //   if (prevY === specialRow) {
      //     if (prevX === x && y - prevY === pawnDirection) {
      //       if (!this.tileIsOccupied(x, y, boardState));
      //       return true;
      //     } else if (prevX === x && y - prevY === 2 * pawnDirection) {
      //       if (
      //         !this.tileIsOccupied(x, y, boardState) &&
      //         !this.tileIsOccupied(x, y - pawnDirection, boardState)
      //       ) {
      //         return true;
      //       }
      //     }
      //   } else {
      //     if (prevX === x && y - prevY === pawnDirection) {
      //       if (!this.tileIsOccupied(x, y, boardState)) {
      //         return true;
      //       }
      //     }
      //   }

      //Attack
      else if (x - prevX === -1 && y - prevY === pawnDirection) {
        //attack in upper or bottom left
        if (this.tileIsOccupiedByOpp(x, y, boardState, team)) {
          return true;
        }
      } else if (x - prevX === 1 && y - prevY === pawnDirection) {
        //attack upper or bottom right corner
        if (this.tileIsOccupiedByOpp(x, y, boardState, team)) {
          return true;
        }
      }
    }
    console.log("Invalid Move");
    return false;
  }
}
