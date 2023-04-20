import Member from "./member";
import rojo from "./../assets/imgs/rojo.jpeg";
import verde from "./../assets/imgs/verde.png";

export default function Us() {
    const names = ["Manuel Jouanne", "Vicente del Piano"];
    const description = ["Cofundador del Candy Crash, me di vuelta el Mario Kart, amante de las manillas de puertas",
        "Campeón mundial de cachipún bajo el agua, ex compañero de Cristiano Ronaldo en la Juventus"];
    return (
        <>
            <h2>Connect Us</h2>
            <h1>Nosotros</h1>
            <h3>¡¡Hola!!</h3>
            <div className="row">
                <Member name={names[0]} description={description[0]} image={rojo} />
                <Member name={names[1]} description={description[1]} image={verde} />
            </div>
            <a href="/principal">Volver</a>
        </>
    );
}