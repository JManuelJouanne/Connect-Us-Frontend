import './board.css';
import Cell from './cell';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import rojo from './../assets/imgs/rojo.jpeg';
import amarillo from './../assets/imgs/yellow.png';
import LogoutButton from '../profile/logout';

import { AuthContext } from './../profile/AuthContext';

const Board = () => {
  const { token } = useContext(AuthContext);  
  const data = localStorage.getItem("MyData");
  const parsedData = JSON.parse(data);
  console.log(parsedData);
  const [cells, setCells] = useState([]);

  var turn = parsedData.game.turn;
  const game = parsedData.game.id;
  const player = parsedData.player.number;

  console.log('turno', turn, game, player);

  const buscar_cells = {
    method: 'get',
    url: `${import.meta.env.VITE_BACKEND_URL}/cells/${game}/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const buscar_game = {
    method: 'get',
    url: `${import.meta.env.VITE_BACKEND_URL}/games/${game}/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const poner_ficha = {
    method: 'patch',
    url: `${import.meta.env.VITE_BACKEND_URL}/cells/${game}/`,
    data: { player: turn},
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      axios(buscar_cells)
        .then(response => {
          console.log('Agregamos las celdas');
          console.log(response.data);
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].status === 1) {
              document.getElementById(response.data[i].id).style.backgroundColor = 'red';
            } else if (response.data[i].status === 2) {
              document.getElementById(response.data[i].id).style.backgroundColor = 'yellow';
            }
          }
          setCells(response.data);
        })
        .catch(err => {
          console.error(err);
        });
    }, 10000); // 5000 milliseconds = 5 seconds

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, [game]);


  useEffect(() => {              // establecemos el turno
    const interval = setInterval(() => {
      axios(buscar_game)
        .then(response => {
          turn = response.data.turn;
          getImageSource();
        })
        .catch(err => {
          console.error(err);
        });
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, [game, player, turn]);


  // hacemos el handleClick
  const handleCellClick = id => {
    let winner = null;

    const clickedCell = cells.find(cell => cell.id === id);
    const clickedColumn = clickedCell.column;
      axios(poner_ficha).then(response => {
          console.log('ha jugado en la columna', clickedColumn);
          axios(buscar_game)
            .then(response => {
              if (response.data.winner !== null) {
                alert(`Ganó el jugador ${response.data.winner}`);
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

  const getImageSource = () => {
    if (turn === 1) {
      return rojo;
    } else if (turn === 2) {
      return amarillo;
    } else {
      return null;
    }
  };

  return (
    <div>
  <div className="Logout-container">
    <LogoutButton />
  </div>
  <div className="turnos">
    {console.log('turno:', turn, 'player:', player)}
    {turn === player?.number ? <h2>¡Es tu turno!</h2> : null}
    <img id="imagen" src={getImageSource()} alt="" />
  </div>
  <div id="board">
    {turn === player?.number && (
      <>
        {cells.map(cell => (
          <Cell key={cell.id} onClick={() => handleCellClick(cell.id)} />
        ))}
      </>
    )}
    {cells.map(cell => (
      <Cell key={cell.id} onClick={() => handleCellClick(cell.id)} />
    ))}
  </div>
  <div className="menu-container">
    <a className="button" id="tablero" href="/principal">
      Atras
    </a>
  </div>
</div>
  );
};

export default Board;
