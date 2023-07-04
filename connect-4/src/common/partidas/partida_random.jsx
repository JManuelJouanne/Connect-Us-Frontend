import './partida_random.css';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "./../../profile/AuthContext";
import LogoutButton from './../../profile/logout';

export default function PartidaRandom() {
  const { token, getUser } = useContext(AuthContext);
  const [game, setGame] = useState(null);
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getUser()
        .then((response) => {
            setUser(response.data)
            console.log("Session:", response.data)
        })
        .catch((err) => console.error(err))
  }, [])

  const config = {
    'method': 'post',
    'url': `${import.meta.env.VITE_BACKEND_URL}/players`,
    'headers': {
      'Authorization': `Bearer ${token}`
    }
  };

  const partida = {
    'method': 'get',
    'url': `${import.meta.env.VITE_BACKEND_URL}/games/${game}`,
    'headers': {
      'Authorization': `Bearer ${token}`
    }
  };

  useEffect(() => {
    axios(config)
      .then((response) => {
        const myData = {gameId: response.data.game.id, player: response.data.player.number};
        setGame(response.data.game.id);
        console.log(response.data);
        localStorage.setItem("MyData", JSON.stringify(myData));
      })
      .catch((err) => {
        console.error(err);
        setMessage(err.response.data.message);
      });
  }, []); // Empty dependency array
  

  useEffect(() => {
    const interval = setInterval(() => {
      if (game !== null) {
        axios(partida)
          .then((response) => {
            if (response.data.friend === 2) {
              window.location.href = `/board`;
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
    <>
      <div className="Logout-container">
        <LogoutButton />
      </div>
      <div className='unirme-partida'>
        <h2>esperando contrincante...</h2>
        <a href="/principal">atras</a>
      </div>
    </>
    
  );
} 