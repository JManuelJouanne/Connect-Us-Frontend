import './board.css';
import Cell from './cell';
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import rojo from './../assets/imgs/rojo.jpeg';
import amarillo from './../assets/imgs/yellow.png';
import {useLocation} from 'react-router-dom';

const Board = () => {
  const [gameSet, setGameSet] = useState(false);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isDelayOver, setIsDelayOver] = useState(false);
  const [turn, setTurn] = useState(1);
  const [cells, setCells] = useState([]);
  const [game, setGame] = useState();
  const [player] = useState(location.state?.player);

  // Seteamos el game
  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/games`, { userId: player.userId })
      .then(response => {
        setGame(response.data);
        console.log('Game Id: ', response.data.id);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

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
      if (game) { // Check if game state is defined
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/players/game/${game.id}`
        );

        if (response.data.length === 2) {
          clearInterval(intervalId); // Stop checking if two players have joined
          // Proceed with your logic for a complete game
          // For example, redirect to the game board
          setGameSet(true);
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


  // hacemos el handleClick
  const handleCellClick = id => {
    let updatedCells = [...cells];
    let winner = null;
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/${game.id}`).then(response => {
      setTurn(response.data.turn);
      console.log(turn);
    }).catch(err => {
      console.error(err);
    });

    // setTurn(turn === 1 ? 2 : 1);

    const clickedCell = cells.find(cell => cell.id === id);
    const clickedColumn = clickedCell.column;

    if(player.userId === turn){

    axios
      .patch(`${import.meta.env.VITE_BACKEND_URL}/cells/${game.id}/${clickedColumn}/`, { player: turn })
      .then(response => {
        const cellIndex = response.data.cell;
        console.log(cellIndex);
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
            console.log(winner);
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
      {isLoading || !gameSet ? (
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
