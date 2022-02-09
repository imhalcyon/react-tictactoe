import Square from "./Square";

export default function Board(props) {
  const rows = [1, 2, 3];

  return (
    <div className="board">
      {rows.map((step, index) => (
        <div key={"Row" + index.toString()}>{createRows(step, props)}</div>
      ))}
    </div>
  );
}

const createRows = (rowNum, props) => {
  let rows = [];

  for (let index = 0; index < 3; index++) {
    let squareIndex = index + (rowNum - 1) * 3;
    rows.push(
      <Square
        key={"cell" + squareIndex.toString()}
        value={props.squares[squareIndex]}
        index={squareIndex}
        winningStreak={props.winningStreak}
        onClick={() => {
          props.onClick(squareIndex);
        }}
      />
    );
  }

  return rows;
};
