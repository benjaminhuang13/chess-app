import React, { useState } from "react";

import Tile from "./Tile";
import "./Chessboard.css";

import Pawnb from "../images/pawn_b.svg";
import Horseb from "../images/horse_b.svg";
import Bishopb from "../images/bishop_b.svg";
import Queenb from "../images/queen_b.svg";
import Kingb from "../images/king_b.svg";
import Rookb from "../images/rook_b.svg";

import Pawnw from "../images/pawn_w.svg";
import Horsew from "../images/horse_w.svg";
import Bishopw from "../images/bishop_w.svg";
import Queenw from "../images/queen_w.svg";
import Kingw from "../images/king_w.svg";
import Rookw from "../images/rook_w.svg";

const yAxis = [1, 2, 3, 4, 5, 6, 7, 8];
const xAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

const piecearray = [];

piecearray.push({ image: Rookb, x: 0, y: 7 });
piecearray.push({ image: Horseb, x: 1, y: 7 });
piecearray.push({ image: Bishopb, x: 2, y: 7 });
piecearray.push({ image: Queenb, x: 3, y: 7 });
piecearray.push({ image: Kingb, x: 4, y: 7 });
piecearray.push({ image: Bishopb, x: 5, y: 7 });
piecearray.push({ image: Horseb, x: 6, y: 7 });
piecearray.push({ image: Rookb, x: 7, y: 7 });
piecearray.push({ image: Rookw, x: 0, y: 0 });
piecearray.push({ image: Horsew, x: 1, y: 0 });
piecearray.push({ image: Bishopw, x: 2, y: 0 });
piecearray.push({ image: Queenw, x: 3, y: 0 });
piecearray.push({ image: Kingw, x: 4, y: 0 });
piecearray.push({ image: Bishopw, x: 5, y: 0 });
piecearray.push({ image: Horsew, x: 6, y: 0 });
piecearray.push({ image: Rookw, x: 7, y: 0 });

for (let i = 0; i < 8; i++) {
  piecearray.push({ image: Pawnb, x: i, y: 6 });
  piecearray.push({ image: Pawnw, x: i, y: 1 });
}

export default function Chessboard() {
  const chessBoardRef = useState(0);

  let board = [];

  for (let j = yAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < xAxis.length; i++) {
      const number = j + i + 2;
      let image = null;
      piecearray.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });
      board.push(<Tile key={`${j},${i}`} number={number} image={image} />);
    }
  }
  let activePiece = null;

  function grabPiece(e) {
    const element = e.target;
    if (element.classList.contains("chess-piece")) {
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      activePiece = element;
    }
  }

  function movePiece(e) {
    if (activePiece) {
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      activePiece.style.position = "absolute";
      activePiece.style.left = `${x}px`;
      activePiece.style.top = `${y}px`;
    }
  }
  function dropPiece(e) {
    if (activePiece) activePiece = null;
  }
  return (
    <div
      onMouseMove={(e) => movePiece(e)}
      onMouseDown={(e) => grabPiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      id="chessboard"
      ref={chessBoardRef}
    >
      {board}
    </div>
  );
}
