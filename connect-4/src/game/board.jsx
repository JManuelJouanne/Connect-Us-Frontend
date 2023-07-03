import './board.css';
import Cell from './cell';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { w3cwebsocket } from 'websocket';
import rojo from './../assets/imgs/rojo.jpeg';
import amarillo from './../assets/imgs/yellow.png';
import LogoutButton from '../profile/logout';

import { AuthContext } from './../profile/AuthContext';

const Board = () => {
  const { token } = useContext(AuthContext);  
  const [cells, setCells] = useState([]);
  const [turn, setTurn] = useState(1);
  const [game, setGame] = useState(null);
  const [player, setPlayer] = useState(0);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null)


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
      }).catch(err => {
        console.error(err);
      });

      const buscar_cells = {
        'method': 'get',
        'url': `${import.meta.env.VITE_BACKEND_URL}/cells/${game}/`,
        'headers': {'Authorization': `Bearer ${token}`}
      };
      axios(buscar_cells).then(response => {
        // falta la renderizacion de las celdas?
        setCells(response.data);
        console.log(response.data);
      }).catch(err => {
        console.error(err);
      });
    }
  }, [game]);

  // Socket
  useEffect(() => {
    const sckt = new w3cwebsocket(`${import.meta.env.SOCKET_HOST}/ws/move`) //editar
    setSocket(sckt)

    socket.onopen = () => {
      console.log('Conexión establecida')
    };

    socket.onmessage = (message) => {     // editar logica
      console.log('Mensaje recibido:', message.data)
      const data = JSON.parse(message.data)
      setMessage(data.message)
      if (data.cell.game === game) {
        if (data.cell.status === 1) {
          document.getElementById(data.cell.id).style.backgroundColor = 'red';
          setTurn(2)
        } else if (data.cell.status === 2) {
          document.getElementById(data.cell.id).style.backgroundColor = 'yellow';
          setTurn(1)
        }
        const cell = cells.find(cell => cell.id === data.cell.id)
        cell.status = data.cell.status
        // setCells(cells)
        setCells([...cells])
        getImageSource();
      }
    }

    return () => {
      socket.close();
    }
}, [])


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
    const poner_ficha = {
      'method': 'patch',
      'url': `${import.meta.env.VITE_BACKEND_URL}/cells/${game}/${clickedColumn}`,
      'data': { player: player },
      'headers': {'Authorization': `Bearer ${token}`}
    };

    axios(poner_ficha).then(response => {
      console.log(response.data);
      if (response.status === 200) {
        socket.send(JSON.stringify(response.data))
      }
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
        {message}
        <img id="imagen" src={getImageSource()} alt="" />
      </div>
      <div id="board">
        {turn === player?.number && (
          <>
            {cells.map(cell => (
              <Cell key={cell.id}  onClick={() => handleCellClick(cell.id)} />
            ))}
          </>
        )}
        {cells.map(cell => (
              <Cell key={cell.id} />
            ))}
      </div>
      <div className="menu-container">
        <a className="button" id="tablero" href="/principal">
          Salir
        </a>
      </div>
    </div>
  );
};

export default Board;
