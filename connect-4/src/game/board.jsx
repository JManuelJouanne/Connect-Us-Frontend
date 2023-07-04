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
      console.log(socket);
      console.log('Conexión establecida con el servidor WebSocket');
    });

    socket.on('response', (response) => {
      console.log('Mensaje recibido:', response)
      const data = response.response
      setMessage(data.message)
      console.log(data.cell.gameId, game)

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
        // if (data.cell.status === 1) {
        //   document.getElementById(data.cell.id).style.backgroundColor = 'red';
        // } else if (data.cell.status === 2) {
        //   document.getElementById(data.cell.id).style.backgroundColor = 'yellow';
        // }
      } else {
        console.log('No se encontró la celda')
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
  }, []);
  useEffect(() => {
    if (game) {
      const start = {
        'method': 'get',
        'url': `${import.meta.env.VITE_BACKEND_URL}/players/start/${game}`,
        'headers': {'Authorization': `Bearer ${token}`}
      };
      axios(start).then(response => {
      console.log(response.data);
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
        for (let i = 0; i < response.data.length; i++) {
          //console.log(document.getElementById(response.data[i].id));
           if (response.data[i].status === 1) {
             //document.getElementById(response.data[i].id).style.backgroundColor = 'red';
           } else if (response.data[i].status === 2) {
             //document.getElementById(response.data[i].id).style.backgroundColor = 'yellow';
           }
         }
      }).catch(err => {
        console.error(err);
      });
    }
  }, [game]);

  useEffect(() => {
    if (cells[62]) {
      for (let i = 0; i < cells.length; i++) {
        const element = document.getElementById(cells[i].id);
        if (element) {
          if (cells[i].status === 1) {
            element.style.backgroundColor = 'red';
          } else if (cells[i].status === 2) {
            element.style.backgroundColor = 'yellow';
          }
        }
      }
    }
  }, [cells]);


  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     axios(buscar_cells)
  //       .then(response => {
  //         console.log('Agregamos las celdas');
  //         console.log(response.data);
  //         for (let i = 0; i < response.data.length; i++) {
  //           if (response.data[i].status === 1) {
  //             document.getElementById(response.data[i].id).style.backgroundColor = 'red';
  //           } else if (response.data[i].status === 2) {
  //             document.getElementById(response.data[i].id).style.backgroundColor = 'yellow';
  //           }
  //         }
  //         setCells(response.data);
  //       })
  //       .catch(err => {
  //         console.error(err);
  //       });
  //   }, 10000); // 5000 milliseconds = 5 seconds

  //   return () => {
  //     clearInterval(interval); // Clean up the interval on component unmount
  //   };
  // }, [game]);


  // useEffect(() => {              // establecemos el turno
  //   const interval = setInterval(() => {
  //     axios(buscar_game)
  //       .then(response => {
  //         setTurn(response.data.turn);
  //         getImageSource();
  //       })
  //       .catch(err => {
  //         console.error(err);
  //       });
  //   }, 5000); // 5000 milliseconds = 5 seconds

  //   return () => {
  //     clearInterval(interval); // Clean up the interval on component unmount
  //   };
  // }, [game, player, turn]);


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
              <Cell key={cell.id}  onClick={() => handleCellClick(cell.id)} />
            ))}
          </>
        ) : (
          <>
            {cells.map(cell => (
              <Cell key={cell.id} />
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

