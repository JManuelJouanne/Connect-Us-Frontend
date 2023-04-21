import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Instructions from '../instructions/instructions';
import Us from '../us/us';
import Principal from './principal';

export default function Routing() {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<App/>}/>
                <Route path={"/principal"} element={<Principal/>}/>
                <Route path={"/instructions"} element={<Instructions/>}/>
                <Route path={"/us"} element={<Us/>}/>
            </Routes>
        </BrowserRouter>
        </>
    )
}