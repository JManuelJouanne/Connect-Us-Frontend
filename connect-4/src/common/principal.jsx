import './principal.css'

export default function Principal() {
    return (
        <>
        <h1>CONNECT US</h1>
        <h3>El primero en formar una linea con 4 de sus fichas ¡¡GANA!!</h3>
        <div className="button-container">
            <a class="button" href="/principal">Partida Simple</a>
            <a class="button" href="/principal">Partida Bélica</a>
        </div>
        <div className="button-container">
            <a class="button" href="/instructions">¿Cómo Jugar?</a>
            <a class="button" href="/us">Sobre Nosotros</a>
        </div>
        </>
    )
}