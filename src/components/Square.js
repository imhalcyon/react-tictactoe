export default function Square(props) {

  const isWinner = props.winningStreak && props.winningStreak.includes(props.index);
  let className = "btn";

  if(props.winningStreak){
    if(isWinner)
        className = "btn disabled winner";
    else
      className = "btn disabled";
  }else{
    if(props.value){
      className = "btn disabled";
    }
  }

  return (
    <button
      className={ className }
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
