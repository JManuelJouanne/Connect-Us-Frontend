import './partida_random.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "./../../profile/AuthContext";

export default function PartidaRandom() {
  const { token } = useContext(AuthContext);
  const [game, setGame] = useState();
  const [user, setUser] = useContext(AuthContext);
  const [player, setPlayer] = useState();

  const config = {
    'method': 'post',
    'url': `${import.meta.env.VITE_BACKEND_URL}/players`,
    'data': { userId: user },
    'headers': {
        'Authorization': `Bearer ${token}`
    }
  }

  useEffect(() => {
    axios(config).then(response => {
      setGame(response.data.game);
      setPlayer(response.data.player);
      console.log(response.data);
      
      // if (game.friend === 2) {
      //   window.location.href = "/board";
      // }
    }).catch(err => {
      console.error(err);
    });
  }, []);

  return (
    <div className='unirme-partida'>
      <h2>esperando contrincante...</h2>
      <div className='separacion'>
        <Link to={'/board'} state={{game:game, player:player}}>
          Ir a Partida
        </Link>
      </div>
      <a href="/principal">atras</a>
    </div>
  );
}


        // <div className='UnirmePartida'>
        //       <a className="button" href="/board">partida random</a>
        //       <form action="elige un id">
        //         <input type="id" placeholder="elige un id"/>
        //       </form>
        // </div>