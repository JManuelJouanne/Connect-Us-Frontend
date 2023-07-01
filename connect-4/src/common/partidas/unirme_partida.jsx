import './unirme_partida.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export default function UnirmePartida() {
  const [game, setGame] = useState();
  const [user, setUser] = useState({"id":1,"username":"manueljouanne","mail":"jmjouanne@uc.cl","password":"manuel123","createdAt":"2023-06-25T01:06:50.754Z","updatedAt":"2023-06-25T01:06:50.754Z"});

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/games/available/game/${user.id}`)
      .then(response => {
        setGame(response.data);
        console.log(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div className='unirme-partida'>
      <div className='separacion'>
      <Link to={'/board'} state={{game:game, player:user, ready:false}}>
        partida random
        </Link>
        <div className='formulario'>
          <form action="">
            <input type="id" placeholder='elige un id' />
          </form>
          <a href="/board">buscar</a>
        </div>
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