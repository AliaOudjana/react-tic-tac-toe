import { useState } from "react";

function Square({ value, onSquareClick }) {

  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const numOfSquares = 9;

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  function makeSquares(numOfSquares) {
    const squareComponent = [];
    for (let i = 0; i < numOfSquares; i++) {
      squareComponent.push(
        <Square value={squares[i]} onSquareClick={() => handleClick(i)} />
      );
    }

    return squareComponent;
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = winner;
  } else {
    status = "Player " + (xIsNext ? "X" : "O") + " It's Your Turn";
  }

  return (
    <>
      <div className="squares">{makeSquares(numOfSquares)}</div>
      <div className="status">{status}</div>
    </>
  );
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }
  function undo() {
    if (history.length > 1) {
      setHistory(history.slice(0, history.length - 1));
      setXIsNext(!xIsNext);
    }
  }

  function newGame() {
    setXIsNext(true);
    setHistory([Array(9).fill(null)]);
  }

  return (
    <div className="game">
      <ColorSwitcher />
      <button className="undo-btn" onClick={undo}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M288-192v-72h288q50 0 85-35t35-85q0-50-35-85t-85-35H330l93 93-51 51-180-180 180-180 51 51-93 93h246q80 0 136 56t56 136q0 80-56 136t-136 56H288Z" /></svg>
      </button>
      <h1>Tic-Tac-Toe</h1>
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <button className="new-game-btn" onClick={newGame}>New Game</button>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {

      return squares[a] + " Won!!";
    }
  }
  for (let j = 0; j < squares.length; j++) {
    if (!squares[j]) {
      return;
    }
  }
  return "Draw";
}

function ColorSwitcher() {

  function onSwitcherClick() {
    document.querySelector('.color-switcher').classList.toggle('active');
  }

  function onThemeBtnClick(mainColor, secondColor) {
    document.querySelector(':root').style.setProperty('--main-color', mainColor);
    document.querySelector(':root').style.setProperty('--second-color', secondColor);
  }

  return (
    <div className="color-switcher">
      <button className="switcher-btn" onClick={onSwitcherClick}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 32.5-156t88-127Q256-817 330-848.5T488-880q80 0 151 27.5t124.5 76q53.5 48.5 85 115T880-518q0 115-70 176.5T640-280h-74q-9 0-12.5 5t-3.5 11q0 12 15 34.5t15 51.5q0 50-27.5 74T480-80Zm0-400Zm-177 23q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm120-160q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm200 0q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm120 160q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17ZM480-160q9 0 14.5-5t5.5-13q0-14-15-33t-15-57q0-42 29-67t71-25h70q66 0 113-38.5T800-518q0-121-92.5-201.5T488-800q-136 0-232 93t-96 227q0 133 93.5 226.5T480-160Z" /></svg>
      </button>
      <button className="theme-btn purple" onClick={() => onThemeBtnClick("#521a92", "#e6dcfd")}></button>
      <button className="theme-btn blue" onClick={() => onThemeBtnClick("#03256c", "#afd2e9")}></button>
      <button className="theme-btn green" onClick={() => onThemeBtnClick("#03440c", "#c0e5c8")}></button>
      <button className="theme-btn pink" onClick={() => onThemeBtnClick("#d7365e", "#ffdef6")}></button>
    </div>
  );
}