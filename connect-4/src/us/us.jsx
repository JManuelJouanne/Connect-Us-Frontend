import Member from "./member";
import rojo from "./../assets/imgs/rojo.jpeg";
import verde from "./../assets/imgs/verde.png";

export default function Us() {
    const names = ["manuel jouanne", "vicente del piano"];
    const description = ["cofundador del candy crash, me di vuelta el mario kart, amante de las manillas de puertas",
        "campeón mundial de cachipún bajo el agua, ex compañero de cristiano ronaldo en la juventus"];
    return (
        <>
            <h2>connect us</h2>
            <h1>nosotros</h1>
            <h3>¡¡hola!!</h3>
            <div className="row">
                <Member name={names[0]} description={description[0]} image={rojo} />
                <Member name={names[1]} description={description[1]} image={verde} />
            </div>
            <a href="/principal">volver</a>
        </>
    );
}