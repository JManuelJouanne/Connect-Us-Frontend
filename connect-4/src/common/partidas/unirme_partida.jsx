import './unirme_partida.css'


export default function UnirmePartida() {
    return(
        <div>
            <div className="button-container">
              <a className="button" href="/board">partida random</a>
              <form action="elige un id">
                <input type="id" placeholder="elige un id"/>
              </form>
            </div>
        </div>
    );
}