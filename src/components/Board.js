import Square from "./Square";

export default function Board(props) {
  let row1 = [];
  let row2 = [];
  let row3 = [];
  for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
    for (let index = 0; index < 3; index++) {
      let squareIndex = index + rowIndex * 3;

      if(squareIndex < 3){
        row1.push(<Square value={props.squares[squareIndex]} onClick={() => { props.onClick(squareIndex); }} />);
      }else if (squareIndex < 6){
        row2.push(<Square value={props.squares[squareIndex]} onClick={() => { props.onClick(squareIndex); }} />);
      }else{
        row3.push(<Square value={props.squares[squareIndex]} onClick={() => { props.onClick(squareIndex); }} />);
      }
    }
  }

  return (
    <div className="board">
      <div>
        <Square
          value={props.squares[0]}
          onClick={() => {
            props.onClick(0);
          }}
        />
        <Square
          value={props.squares[1]}
          onClick={() => {
            props.onClick(1);
          }}
        />
        <Square
          value={props.squares[2]}
          onClick={() => {
            props.onClick(2);
          }}
        />
      </div>

      <div>
        <Square
          value={props.squares[3]}
          onClick={() => {
            props.onClick(3);
          }}
        />
        <Square
          value={props.squares[4]}
          onClick={() => {
            props.onClick(4);
          }}
        />
        <Square
          value={props.squares[5]}
          onClick={() => {
            props.onClick(5);
          }}
        />
      </div>

      <div>
        <Square
          value={props.squares[6]}
          onClick={() => {
            props.onClick(6);
          }}
        />
        <Square
          value={props.squares[7]}
          onClick={() => {
            props.onClick(7);
          }}
        />
        <Square
          value={props.squares[8]}
          onClick={() => {
            props.onClick(8);
          }}
        />
      </div>
    </div>
  );
}
