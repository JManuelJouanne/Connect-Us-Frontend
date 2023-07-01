import './partida_amigo.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from './../../profile/AuthContext';

export default function PartidaAmigo() {
  const { token } = useContext(AuthContext);
  const { user, setUser } = useContext(AuthContext);
  const [game, setGame] = useState(null);
  const [message, setMessage] = useState("");
  const [ready, setRedy] = useState(false);

  const nueva_partida = {
    method: 'post',
    url: `${import.meta.env.VITE_BACKEND_URL}/games`,
    data: { userId: user },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const unirme_partida = {
    method: 'post',
    url: `${import.meta.env.VITE_BACKEND_URL}/players/${game}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const ver_jugadores = {
    method: 'get',
    url: `${import.meta.env.VITE_BACKEND_URL}/players/game/${game}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios(unirme_partida).then((response) => {
      console.log(response.data);
      setGame(event.target.value);
    })
    .catch(err => {
      console.error(err);
      setMessage('el id es incorrecto');
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    axios(nueva_partida).then((response) => {
      setGame(response.data);
      console.log(response.data);
    })
    .catch(err => {
      console.error(err);
      setMessage(err.response.data.message);
    });
    console.log('hola');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (game !== null) {
        axios(ver_jugadores)
          .then((response) => {
            console.log(response.data);
            if (response.data.length === 2) {
              setRedy(true);
            }
          })
          .catch((err) => {
            console.error(err);
            setMessage(err.response.data.message);
          });
      }
    }, 5000); // 5000 milliseconds = 5 seconds
  
    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, [game]);

  
  return (
    <div className="unirme-partida">
      <div className="separacion">
        {game === null ? (
          <>
            <a onClick={handleClick}>nueva partida</a>
            <form onSubmit={handleSubmit} className="game">
              <input
                type="id"
                name="id"
                value={game}
                placeholder="ingresa el id del juego"
              />
              <input type="submit" value="buscar" id="buscar" />
              <p id="error">{message}</p>
            </form>
          </>
        ) : ready === false ? (
          <>
            <h2>el id de tu juego es: {game.id}</h2>
            <h3>esperando contrincante...</h3>
          </>
        ) : (
          <Link to={{ pathname: '/board', state: { game: game } }}>ir a jugar</Link>
        )}
      </div>
      <a href="/principal">atras</a>
    </div>
  );
  
  
        
}  
