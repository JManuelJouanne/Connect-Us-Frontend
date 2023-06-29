import './principal.css'
import axios from 'axios';
import React, { useState } from 'react';
import {BrowserRouter, Routes, Route, Link, Navigate} from 'react-router-dom';

export default function Principal() {
    const [player, setPlayer] = useState(
        {"id":10,"number":1,"userId":1,"gameId":11,"createdAt":"2023-06-25T01:47:14.133Z","updatedAt":"2023-06-25T01:47:14.133Z"}
      );
    return (
        <div>
          <h1>connect us</h1>
          <h3>el primero en formar una linea con 4 de sus fichas ¡¡gana!!</h3>
          <div className="menu-container">
            <div className="button-container">
            <Link to='/board' state={{player:player}}>nueva partida</Link>
              <a className="button" href="/unirme_partida">unirme a partida</a>
            </div>
            <div className="button-container">
              <a className="button" href="/instructions">¿cómo jugar?</a>
              <a className="button" href="/us">sobre nosotros</a>
            </div>
            <div className="button-container">
              <a className="button" href="/">salir</a>
            </div>
          </div>
        </div>
      );
      
}