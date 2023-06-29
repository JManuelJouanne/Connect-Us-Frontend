import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Instructions from '../instructions/instructions';
import Us from '../us/us';
import Principal from './principal';
import Board from '../game/board'
import UnirmePartida from './partidas/unirme_partida';
import NuevaPartida from './partidas/nueva_partida';

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
                <Route path={"/nueva_partida"} element={<NuevaPartida/>}/>
            </Routes>
        </BrowserRouter>
        </>
    )
}