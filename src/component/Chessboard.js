import React, { useRef, useState } from "react";
import Tile from "./Tile";
import "./Chessboard.css";
import Referee from "../referee/Referee";

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
const Piece = {
  image: null,
};
const initialBoardState = [];
initialBoardState.push({
  image: Rookb,
  x: 0,
  y: 7,
  pieceType: "rook",
  team: "0",
});
initialBoardState.push({
  image: Horseb,
  x: 1,
  y: 7,
  pieceType: "horse",
  team: "0",
});
initialBoardState.push({
  image: Bishopb,
  x: 2,
  y: 7,
  pieceType: "bishop",
  team: "0",
});
initialBoardState.push({
  image: Queenb,
  x: 3,
  y: 7,
  pieceType: "queen",
  team: "0",
});
initialBoardState.push({
  image: Kingb,
  x: 4,
  y: 7,
  pieceType: "king",
  team: "0",
});
initialBoardState.push({
  image: Bishopb,
  x: 5,
  y: 7,
  pieceType: "bishop",

  team: "0",
});
initialBoardState.push({
  image: Horseb,
  x: 6,
  y: 7,
  pieceType: "horse",

  team: "0",
});
initialBoardState.push({
  image: Rookb,
  x: 7,
  y: 7,
  pieceType: "rook",
  team: "0",
});
initialBoardState.push({
  image: Rookw,
  x: 0,
  y: 0,
  pieceType: "rook",
  team: "1",
});
initialBoardState.push({
  image: Horsew,
  x: 1,
  y: 0,
  pieceType: "horse",
  team: "1",
});
initialBoardState.push({
  image: Bishopw,
  x: 2,
  y: 0,
  pieceType: "bishop",
  team: "1",
});
initialBoardState.push({
  image: Queenw,
  x: 3,
  y: 0,
  pieceType: "queen",
  team: "1",
});
initialBoardState.push({
  image: Kingw,
  x: 4,
  y: 0,
  pieceType: "king",
  team: "1",
});
initialBoardState.push({
  image: Bishopw,
  x: 5,
  y: 0,
  pieceType: "bishop",
  team: "1",
});
initialBoardState.push({
  image: Horsew,
  x: 6,
  y: 0,
  pieceType: "horse",
  team: "1",
});
initialBoardState.push({
  image: Rookw,
  x: 7,
  y: 0,
  pieceType: "rook",
  team: "1",
});

for (let i = 0; i < 8; i++) {
  initialBoardState.push({
    image: Pawnb,
    x: i,
    y: 6,
    pieceType: "pawn",
    team: "0",
  });
  initialBoardState.push({
    image: Pawnw,
    x: i,
    y: 1,
    pieceType: "pawn",
    team: "1",
  });
}

export default function Chessboard() {
  const [activePiece, setActivePiece] = useState(null);
  const chessBoardRef = useRef(null);
  const [piecearray, setPieces] = useState(initialBoardState);
  const referee = new Referee();
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

  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);

  function grabPiece(e) {
    const element = e.target;
    const chessboard = chessBoardRef.current;
    if (element.classList.contains("chess-piece") && chessboard) {
      setGridX(
        Math.floor((e.clientX - chessboard.getBoundingClientRect().left) / 100)
      );
      setGridY(
        Math.abs(
          Math.ceil(
            10 -
              (e.clientY - chessboard.getBoundingClientRect().top + 300) / 100
          )
        )
      );

      console.log("");
      const x = e.offsetLeft;
      const y = e.offsetTop;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      setActivePiece(element);
    }
  }

  function movePiece(e) {
    const chessboard = chessBoardRef.current;
    if (activePiece && chessboard) {
      activePiece.style.position = "absolute";

      const offsetX = e.clientX - chessboard.getBoundingClientRect().left - 50;
      const offsetY = e.clientY - chessboard.getBoundingClientRect().top - 50;

      const minX = chessboard.getBoundingClientRect().left - e.clientX;
      const minY = chessboard.getBoundingClientRect().top - e.clientY;
      const maxX = chessboard.clientWidth - 100;
      const maxY = chessboard.clientHeight - 100;

      if (offsetX < minX) {
        activePiece.style.left = `${minX}px`;
      } else if (offsetX > maxX) {
        activePiece.style.left = `${maxX}px`;
      } else {
        activePiece.style.left = `${offsetX}px`;
      }
      if (offsetY < minY) {
        activePiece.style.top = `${minY}px`;
      } else if (offsetY > maxY) {
        activePiece.style.top = `${maxY}px`;
      } else {
        activePiece.style.top = `${offsetY}px`;
      }
    }
  }
  function dropPiece(e) {
    const chessboard = chessBoardRef.current;
    if (activePiece && chessboard) {
      const x = Math.floor(
        (e.clientX - chessboard.getBoundingClientRect().left) / 100
      );
      const y = Math.abs(
        Math.ceil(
          10 - (e.clientY - chessboard.getBoundingClientRect().top + 300) / 100
        )
      );

      const currentPiece = piecearray.find(
        (p) => p.x === gridX && p.y === gridY
      );
      const attackedPiece = piecearray.find((p) => p.x === x && p.y === y);
      if (currentPiece) {
        const validMove = referee.isValidMove(
          gridX,
          gridY,
          x,
          y,
          currentPiece?.type,
          currentPiece?.team
        );
        //Reduce function
        //results => array of results
        //peice => the current piece we are handling
        setPieces((value) => {
          const pieces = value.reduce((results, piece) => {
            results.push(piece);
            return results;
          }, []);
          return pieces;
        });
      }

      //Updates the Piece Position
      setPieces((value) => {
        const pieces = value.map((p) => {
          if (p.x === gridX && p.y === gridY) {
            const validMove = referee.isValidMove(
              gridX,
              gridY,
              x,
              y,
              p.pieceType,
              p.team,
              value
            );
            if (validMove) {
              p.x = x;
              p.y = y;
            } else {
              activePiece.style.position = "relative";
              activePiece.style.removeProperty("top");
              activePiece.style.removeProperty("left");
            }
          }
          return p;
        });
        return pieces;
      });
      setActivePiece(null);
    }
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
