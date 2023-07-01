import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Instructions from '../instructions/instructions';
import Us from '../us/us';
import Principal from './principal';
import Board from '../game/board'
import UnirmePartida from './partidas/unirme_partida';
import Login from './../profile/login';
import Signup from './../profile/signup';
import UserCheck from '../protected/UserCheck';

export default function Routing() {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<App/>}/>
                <Route path={"/principal"} element={<Principal/>}/>
                <Route path={"/instructions"} element={<Instructions/>}/>
                <Route path={"/us"} element={<Us/>}/>
                <Route path={"/board"} element={<Board/>}/>
                <Route path={"/unirme_partida"} element={<UnirmePartida/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/signup"} element={<Signup/>}/>
                <Route path={"/users"} element={<UserCheck/>}/>
            </Routes>
        </BrowserRouter>
        </>
    )
}