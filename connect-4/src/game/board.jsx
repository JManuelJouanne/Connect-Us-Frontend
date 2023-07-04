import './board.css';
import Cell from './cell';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
//import { w3cwebsocket } from 'websocket';
import io from 'socket.io-client';
import rojo from './../assets/imgs/rojo.jpeg';
import amarillo from './../assets/imgs/yellow.png';
import LogoutButton from '../profile/logout';
import { AuthContext } from './../profile/AuthContext';

const socket = io(`${import.meta.env.VITE_BACKEND_URL}`);

export default function Board() {
  const { token } = useContext(AuthContext);  
  const [cells, setCells] = useState([]);
  const [turn, setTurn] = useState(null);
  const [game, setGame] = useState(null);
  const [player, setPlayer] = useState(0);
  const [message, setMessage] = useState("");
  //const [socket, setSocket] = useState(null)

  // Socket
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Conexión establecida con el servidor WebSocket');
    });

    socket.on('response', (response) => {
      console.log('Mensaje recibido:', response)
      const data = response.response
      setMessage(data.message)
      console.log('Mensaje:', data)

      if (data.cell && data.cell.gameId === game) {
        const cell = cells.find(cell => cell.id === data.cell.id)
        cell.status = data.cell.status
        setCells([...cells])
        if (cell.status === 0) {
          setTurn(0)
        } else {
          setTurn((cell.status % 2) + 1);
          getImageSource();
        }

      } else {
        console.log('No se encontró la celda')
        window.location.reload();
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  // Seteo inicial
  useEffect(() => {
    const data = localStorage.getItem("MyData");
    const parsedData = JSON.parse(data);
    setPlayer(parsedData.player);
    setGame(parsedData.gameId);
    console.log('Todo seteado');
  }, []);


  useEffect(() => {
    if (game) {
      const start = {
        'method': 'get',
        'url': `${import.meta.env.VITE_BACKEND_URL}/players/start/${game}`,
        'headers': {'Authorization': `Bearer ${token}`}
      };
      axios(start).then(response => {
      setMessage(response.data.message);
      setTurn(response.data.turn);
      }).catch(err => {
        console.error(err);
      });

      const buscar_cells = {
        'method': 'get',
        'url': `${import.meta.env.VITE_BACKEND_URL}/cells/${game}`,
        'headers': {'Authorization': `Bearer ${token}`}
      };
      axios(buscar_cells).then(response => {
        setCells(response.data);
        console.log('Celdas seteadas');
      }).catch(err => {
        console.error(err);
      });
    }
  }, [game]);




  // hacemos el handleClick
  const handleCellClick = id => {
    const clickedCell = cells.find(cell => cell.id === id);
    const clickedColumn = clickedCell.column;
    try {
      const data = {
        gameId: game,
        column: clickedColumn,
        player: player
      };
      socket.emit('message', data);
      console.log('Mensaje enviado:', data);
    } catch (err) {
      console.error(err);
      setMessage('Ocurrió un error')
    }
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
        {message}
        <img id="imagen" src={getImageSource()} alt="" />
      </div>
      <div id="board">
        {turn === player ? (
          <>
            {cells.map(cell => (
              <Cell key={cell.id} id={cell.id} status={cell.status} onClick={() => handleCellClick(cell.id)} />
            ))}
          </>
        ) : (
          <>
            {cells.map(cell => (
              <Cell key={cell.id} id={cell.id} status={cell.status} />
            ))}
          </>
        )}
      </div>
      <div className="menu-container">
        <a className="button" id="tablero" href="/principal">
          Salir
        </a>
      </div>
    </div>
  );
};

