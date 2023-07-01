import './partida_amigo.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from './../../profile/AuthContext';

export default function PartidaAmigo() {
  const { token } = useContext(AuthContext);
  const { user, setUser } = useContext(AuthContext);
  const [game, setGame] = useState();
  const [player, setPlayer] = useState();
  const [message, setMessage] = useState("");

  const nueva_partida = {
    method: 'post',
    url: `${import.meta.env.VITE_BACKEND_URL}/players`,
    data: { userId: user },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const buscar_partida = {
    method: 'get',
    url: `${import.meta.env.VITE_BACKEND_URL}/players/game/${game}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleSubmit = (event) => {
    console.log(game);
    event.preventDefault();
    axios(buscar_partida).then((response) => {
      setPlayer(response.data.player);
      console.log(response.data);
    })
    .catch(err => {
      console.error(err);
      setMessage(err.response.data.message);
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    axios(nueva_partida).then((response) => {
      setPlayer(response.data.player);
      console.log(response.data);
      window.location.href = "/board";
    })
    .catch(err => {
      console.error(err);
      setMessage(err.response.data.message);
    });
    console.log('hola');
  };

  return (
    <div className="unirme-partida">
      <div className="separacion">
      <a href='/board' onClick={handleClick} >nueva partida</a>
      <form onSubmit={handleSubmit} className="game">
        <input type="id" name='id' value={game} onChange={e => setGame(e.target.value)} placeholder='ingresa el id del juego'/>
        <input type="submit" value="buscar" id="buscar"/>
        <p id="error">{message}</p>
      </form>
      </div>
      <a href="/principal">atras</a>
    </div>
  );
}
