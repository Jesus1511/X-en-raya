import React, { useState, useEffect} from 'react';

export const App = () => {
  const [board, setBoard] = useState([
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ]);
  const [turn, setTurn] = useState(true);
  const [win, setWin] = useState(0);
  const [playing, setPlaying] = useState(true)

  function handleClick(rowIndex, colIndex) {
    setBoard((prevBoard) => {
      return prevBoard.map((fila, rIndex) => {
        if (rIndex === rowIndex) {
          return fila.map((celda, cIndex) => {
            if (cIndex === colIndex && celda == " ") {
              return turn ? "X" : "O"; 
              
            } else {
              return celda;
            }
          });
        } else {
          return fila;
        }
      });
    });
    board.map((fila, rIndex)=>{
      if(rIndex == rowIndex){
        fila.map((celda, cIndex)=>{
          if(cIndex == colIndex && celda == " "){
            cambiarTurno()
          }
        })
      }
    })
  }

  function cambiarTurno(){
    setTurn((prevTurn) => !prevTurn); 
  }

  useEffect(()=>{
    if(win == 1){
      alert("Felicidades, la X a ganado")
      setPlaying(false)
    }
    else if(win == 2){
      setPlaying(false)
      alert("Felicidades, la O a ganado")
    }
  }, [win])


  useEffect(()=>{
    confirmWin()
    setPlaying(confirmEmpate())
  }, [board])

  function confirmEmpate (){
    return board.some(row => row.some(cell => cell === " "));
    
  }


  function confirmWin(){
    board.map((filas)=>{

        //confirmar en horizontal

        if(filas[0] == filas[1] && filas[1] == filas[2] && filas[0] !== " "){
          if(filas[0] == "X"){
            setWin(1)
          }
          else if(filas[0] == "O"){
            setWin(2)
          }}

        //confirmar en vertical

         for (let i = 0; i < 3; i++) {
           if(board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] !== " "){
             if(board[0][i] == "X"){
               setWin(1)
             }
             else if(board[0][i] == "O"){
               setWin(2)
             }}
           }
          
        //confirmar diagonales

        if(board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] !== " "){
          if(board[0][0] == "X"){
            setWin(1)
          }
          else if(board[0][0] == "O"){
            setWin(2)
          }}

        if(board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[1][1] !== " "){
          if(board[0][2] == "X"){
            setWin(1)
          }
          else if(board[0][2] == "O"){
            setWin(2)
          }}
           
        } )}
        

        function handlePlayAgain (){
          setPlaying(true)
          setBoard([
            [" ", " ", " "],
            [" ", " ", " "],
            [" ", " ", " "]
          ])
        }
  
  return (
    <>
      {!playing?
      <div className='playAgain'>
        <h2>¿Quieres jugar de nuevo?</h2>
        <button onClick={handlePlayAgain}>Play Again</button>
      </div>:<div></div>  
    }

      <div className='celdasContainer'>
        {board.map((fila, rowIndex) => (
          fila.map((celda, colIndex) => (
            <div
              onClick={()=>{if(playing){handleClick(rowIndex, colIndex)}}}
              key={`${rowIndex}-${colIndex}`}
              className='celda'
            >
              {celda}
            </div>
          ))
        ))}
      </div>
      <div className='turn'>
        <div
        className={
          turn? "enTurno": "noEnTurno"
        }
        >X</div>
        <div
        className={
          !turn? "enTurno": "noEnTurno"
          }
        >O</div>
      </div>
    </>
  );
};

