import './principal.css'
import axios from 'axios';
import React, { useState, useContext } from 'react';
import {BrowserRouter, Routes, Route, Link, Navigate} from 'react-router-dom';
import LogoutButton from './../profile/logout';
import { AuthContext } from './../profile/AuthContext';

export default function Principal() {
  const { username } = useContext(AuthContext);
  return (
    <div>
      <div className="Logout-container">
        <LogoutButton />
      </div>
      <h1>connect us</h1>
      <h2>¡¡Bienvenido {username}!!</h2>
      <h3>el primero en formar una linea con 4 de sus fichas ¡¡gana!!</h3>
      <div className="menu-container">
        <div className="button-container">
          <a className="button" href='/partida_amigo'> partida con amigo </a>
          <a className="button" href="/partida_random"> partida random </a>
        </div>
        <div className="button-container">
          <a className="button" href="/instructions"> ¿cómo jugar? </a>
          <a className="button" href="/us"> sobre nosotros </a>
        </div>
      </div>
    </div>
  );
}
