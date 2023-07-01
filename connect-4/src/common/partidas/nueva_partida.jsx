import './nueva_partida.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useLocation} from 'react-router-dom';


export default function NuevaPartida() {
    const location = useLocation();
    const user = location?.state;
    const [game, setGame] = useState();
    const [player, setPlayer] = useState();

    useEffect(() => {
        axios
          .post(`${import.meta.env.VITE_BACKEND_URL}/games`, { userId: location.state.user.id })
          .then(response => {
            setGame(response.data);
            console.log(response.data);
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/players/game/${response.data.id}`)
            .then(response2 => {
              setPlayer(response2.data[0]);
              console.log(response2.data);
            })
            .catch(err => {
              console.error(err);
            });
          })
          .catch(err => {
            console.error(err);
          });
      }, []); 

    return (
        <div className='unirme-partida'>
          <div className='separacion'>
          <Link to='/board' state={{game:game, player:player}}>
            partida random
          </Link>
          <Link to='/board' state={{game:game, player:player}}>
            partida con amigo
          </Link>
            
          </div>
          <a href="/principal">atras</a>
        </div>
      );
}