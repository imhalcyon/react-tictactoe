import { useReducer } from "react";
import Board from "./Board";

const reducer = (state, action) => {
  switch (action.type) {
    case "JUMP":
      return {
        ...state,
        xIsNext: action.payload.step % 2 === 0,
        history: state.history.slice(0, action.payload.step + 1),
      };

    case "MOVE":
      return {
        ...state,
        history: state.history.concat({
          squares: action.payload.squares,
          moveIndex: action.payload.step,
        }),
        xIsNext: !state.xIsNext,
      };

    case "SORT":
      return {
        ...state,
        isAscending: !state.isAscending,
      };

    default:
      return state;
  }
};

export default function Game() {
  const [state, dispatch] = useReducer(reducer, {
    xIsNext: true,
    isAscending: true,
    history: [{ squares: Array(9).fill(null), moveIndex: null }],
  });

  const { xIsNext, history } = state;
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

  const jumpTo = (step) => {
    dispatch({ type: "JUMP", payload: { step } });
  };

  const handleClick = (step) => {
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = calculateWinner(squares, lines);

    if (winner || squares[step]) {
      return;
    }

    squares[step] = xIsNext ? "X" : "O";

    dispatch({ type: "MOVE", payload: { squares, step } });
  };

  const changeOrientation = () => {
    dispatch({ type: "SORT", payload: {} });
  };

  const current = history[history.length - 1];
  const winner = calculateWinner(current.squares, lines);
  const winningStreak = winner ? findWinner(current.squares, lines) : null;

  const status = winner
    ? winner === "D"
      ? "Draw"
      : "Winner is " + winner
    : "Next player is " + (xIsNext ? "X" : "O");

  const moves = history.map((step, move) => {
    // prettier-ignore
    const coordinates = [
      "(1,1)","(1,2)","(1,3)",
      "(2,1)","(2,2)","(2,3)",
      "(3,1)","(3,2)","(3,3)",
    ];

    const desc = move
      ? "Go to # " + move + " " + coordinates[step.moveIndex]
      : "Start the Game";

    return (
      <li key={"JumpTo" + move}>
        <button className="jumpBtn" onClick={() => jumpTo(move)}>
          {move === state.history.length - 1 ? <b>{desc}</b> : desc}
        </button>
      </li>
    );
  });

  return (
    <div className={winner ? "game disabled" : "game"}>
      <div className="game-board">
        <div className="status">{status}</div>
        <Board
          onClick={(i) => handleClick(i)}
          squares={current.squares}
          winningStreak={winner ? winningStreak : null}
        ></Board>
      </div>
      <div className="game-info">
        <button
          onClick={() => {
            changeOrientation();
          }}
        >
          Sort by: {state.isAscending ? "Ascending" : "Descending"}
        </button>
        <ul>{state.isAscending ? moves : moves.reverse()}</ul>
      </div>
    </div>
  );
}

const calculateWinner = (squares, lines) => {
  let isDraw = true;

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }

    if (!squares[a] || !squares[b] || !squares[c]) {
      isDraw = false;
    }
  }

  if (isDraw) return "D";

  return null;
};

const findWinner = (squares, lines) => {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }

  return null;
};
