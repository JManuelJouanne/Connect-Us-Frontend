import './principal.css'

export default function Principal() {
    return (
        <>
        <h1>connect us</h1>
        <h3>el primero en formar una linea con 4 de sus fichas ¡¡gana!!</h3>
        <div className="button-container">
            <a class="button" href="/principal">partida simple</a>
            <a class="button" href="/principal">partida bélica</a>
        </div>
        <div className="button-container">
            <a class="button" href="/instructions">¿cómo jugar?</a>
            <a class="button" href="/us">sobre nosotros</a>
        </div>
        <div className="button-container">
            <a href="/">salir</a>
        </div>
        </>
    )
}