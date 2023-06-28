import './board.css'
import Cell from './cell'
import React, { useState, useContext, useEffect} from 'react'
import axios from 'axios';
import rojo from "./../assets/imgs/rojo.jpeg";
import amarillo from "./../assets/imgs/yellow.png";


const Board = () => {
    const [turn, setTurn] = useState(1);
    const [cells, setCells] = useState([]);
    const [game, setGame] = useState();
    const [player1] = useState({
        "id": 2,
        "username": "viecentedelpiano",
        "mail": "vicente.delpiano@uc.cl",
        "password": "vicentel123",
        "createdAt": "2023-06-25T01:06:50.754Z",
        "updatedAt": "2023-06-25T01:06:50.754Z"
    });
    const [player2] = useState({
        "id": 1,
        "username": "manueljouanne",
        "mail": "jmjouanne@uc.cl",
        "password": "manuel123",
        "createdAt": "2023-06-25T01:06:50.754Z",
        "updatedAt": "2023-06-25T01:06:50.754Z"
    });

    //Seteamos el game
    useEffect(() => {
        axios
          .post(`${import.meta.env.VITE_BACKEND_URL}/games`, { userId: player1.id })
          .then(response => {
            setGame(response.data);
            console.log('Creamos el juego');
          })
          .catch(err => {
            console.error(err);
          });
      }, []);
      
      useEffect(() => {
        if (game) {
          axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/cells/${game.id}/`)
            .then(response => {
              setCells(response.data);
              console.log('Agregamos las celdas');
            })
            .catch(err => {
              console.error(err);
            });
        }
      }, [game]);
      

    //Agregamos el player 2 a la partida
    useEffect(() => {
        if (game) {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/players/${game.id}`, {"userId":player2.id})
        .then(response => {
            console.log('Agregamos Player 2 a la partida');
        })
        .catch(err => {
            console.error(err);
        });
    }
    }, [game]);

    // hacemos el handleClick
    const handleCellClick = (id) => {
        let updatedCells = [...cells];
        let winner = null;
      
        setTurn(turn === 1 ? 2 : 1);
      
        const clickedCell = cells.find((cell) => cell.id === id);
        const clickedColumn = clickedCell.column;
      
        axios
          .patch(`${import.meta.env.VITE_BACKEND_URL}/cells/${game.id}/${clickedColumn}/`, { player: turn })
          .then((response) => {
            const cellIndex = response.data.cell;
            console.log(cellIndex);
            if (cellIndex.status === 1) {
              updatedCells = updatedCells.map((cell) => {
                if (cell.id === cellIndex.id) {
                  return { ...cell, color: 'red' };
                }
                return cell;
              });
            } else if (cellIndex.status === 2) {
              updatedCells = updatedCells.map((cell) => {
                if (cell.id === cellIndex.id) {
                  return { ...cell, color: 'yellow' };
                }
                return cell;
              });
            }
            setCells(updatedCells);
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/${game.id}`)
            .then(response => {
                winner = response.data.winner;
                console.log(winner);
                if (winner !== null) {
                    alert(`Ganó el jugador ${winner}`);
                    window.location.href = '/principal';
                }
            }).catch((err) => {
                console.error(err);
              });
          })
          .catch((err) => {
            console.error(err);
          });
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
       
      return (
        <div>
            <div className='turnos'>
                <h3>Turno del jugador {turn}</h3>
                <img id='imagen' src={getImageSource()}/>
            </div>
          <div id="board">
            {Object.values(cells).map((cell) => (
                //i want to map first the 
              <Cell key={cell.id} color={cell.color} onClick={() => handleCellClick(cell.id)} />
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