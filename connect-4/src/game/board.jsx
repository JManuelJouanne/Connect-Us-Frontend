import './board.css';
import Cell from './cell';
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import rojo from './../assets/imgs/rojo.jpeg';
import amarillo from './../assets/imgs/yellow.png';
import {useLocation} from 'react-router-dom';

const Board = () => {
  const location = useLocation();
  const data = location.state;
  console.log(data);

  const [ready, setReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDelayOver, setIsDelayOver] = useState(false);
  const [turn, setTurn] = useState(1);
  const [cells, setCells] = useState([]);
  const [game, setGame] = useState();

  // I want to find a game with the data from the previous page
  useEffect(() => {
    console.log(data);
    if (data && data.game){
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/${data.game.id}`)
    .then(response => {
      setGame(response.data);
    })
    .catch(err => {
      console.error(err);
    });
  }
  }, [data]);


  useEffect(() => {
    if (game) {
      setIsLoading(true);
      setTimeout(() => {
        setIsDelayOver(true); // Set isDelayOver to true after 3 seconds
      }, 3000); // Delay for 3000 milliseconds (3 seconds)

      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/cells/${game.id}/`)
        .then(response => {
          setCells(response.data);
          console.log('Agregamos las celdas');
        })
        .catch(err => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [game]);


useEffect(() => {
  let intervalId;

  const checkPlayers = async () => {
    try {
      if (game && game.id) { // Check if game state is defined
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/players/game/${game.id}`
        );
        console.log('Estamos en el checkPlayers');

        if (response.data.length === 2) {
          clearInterval(intervalId); 
          setReady(true);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (game) {
    intervalId = setInterval(checkPlayers, 2000); // Check every 2 seconds
  }

  return () => {
    clearInterval(intervalId); // Cleanup interval on component unmount
  };
}, [game]);

//actualizamos las celdas
useEffect(() => {
  const intervalId = setInterval(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/cells/${game.id}/`)
      .then(response => {
        const updatedCells = response.data.map(cell => {
          if (cell.status === 1) {
            return { ...cell, color: 'red' };
          } else if (cell.status === 2) {
            return { ...cell, color: 'yellow' };
          }
          return cell;
        });
        setCells(updatedCells);
      })
      .catch(err => {
        console.error(err);
      });
  }, 3000); // Call every 1 second

  return () => clearInterval(intervalId); // Cleanup interval on component unmount
}, [game]);

  // hacemos el handleClick
  const handleCellClick = id => {
    let updatedCells = [...cells];
    let winner = null;
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/${game.id}`).then(response => {
      setTurn(response.data.turn);
    }).catch(err => {
      console.error(err);
    });

    const clickedCell = cells.find(cell => cell.id === id);
    const clickedColumn = clickedCell.column;

    if(data.player.number === turn){

    axios
      .patch(`${import.meta.env.VITE_BACKEND_URL}/cells/${game.id}/${clickedColumn}/`, { player: turn })
      .then(response => {
        const cellIndex = response.data.cell;
        if (cellIndex.status === 1) {
          updatedCells = updatedCells.map(cell => {
            if (cell.id === cellIndex.id) {
              return { ...cell, color: 'red' };
            }
            return cell;
          });
        } else if (cellIndex.status === 2) {
          updatedCells = updatedCells.map(cell => {
            if (cell.id === cellIndex.id) {
              return { ...cell, color: 'yellow' };
            }
            return cell;
          });
        }
        setCells(updatedCells);
        axios
          .get(`${import.meta.env.VITE_BACKEND_URL}/games/${game.id}`)
          .then(response => {
            winner = response.data.winner;
            if (winner !== null) {
              alert(`Ganó el jugador ${winner}`);
              window.location.href = '/principal';
            }
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        console.error(err);
      });
  };
};

  const getImageSource = () => {
    if (turn === 1) {
      return rojo; // Image for player 1
    } else if (turn === 2) {
      return amarillo; // Image for player 2
    } else {
      return ''; // Default image source if turn is not 1 or 2
    }
  };

  useEffect(() => {
    if (isDelayOver) {
      setIsLoading(false);
    }
  }, [isDelayOver]);

  return (
    <div>
      {isLoading || !ready ? (
      <div className="loading-icon">
        <h1>cargando partida...</h1>
      </div>
      ) : (
        <>
          <div className="turnos">
            <h3>Turno del jugador {turn}</h3>
            <img id="imagen" src={getImageSource()} alt="" />
          </div>
          <div id="board">
            {Object.values(cells).map(cell => (
              <Cell key={cell.id} color={cell.color} onClick={() => handleCellClick(cell.id)} />
            ))}
          </div>
          <div className="menu-container">
            <a className="button" id="tablero" href="/principal">
              Atras
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Board;
