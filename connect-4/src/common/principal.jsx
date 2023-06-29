import './principal.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Principal() {
  const [user, setUser] = useState({
    id: 2,
    username: 'manueljouanne',
    mail: 'jmjouanne@uc.cl',
    password: 'manuel123',
    createdAt: '2023-06-25T01:06:50.754Z',
    updatedAt: '2023-06-25T01:06:50.754Z',
  });

  return (
    <div>
      <h1>connect us</h1>
      <h3>el primero en formar una linea con 4 de sus fichas ¡¡gana!!</h3>
      <div className="menu-container">
        <div className="button-container">
          <Link to='/nueva_partida' state={{user:user}}>
            nueva partida
          </Link>
          <a className="button" href="/unirme_partida">
            unirme a partida
          </a>
        </div>
        <div className="button-container">
          <a className="button" href="/instructions">
            ¿cómo jugar?
          </a>
          <a className="button" href="/us">
            sobre nosotros
          </a>
        </div>
        <div className="button-container">
          <a className="button" href="/">
            salir
          </a>
        </div>
      </div>
    </div>
  );
}
