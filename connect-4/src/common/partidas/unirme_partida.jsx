import './unirme_partida.css'


export default function UnirmePartida() {
    return(
      <div className='unirme-partida'>
        <div className='separacion'>
        <a href="/board">partida random</a>
        <div className='formulario'>
        <form action="">
          <input type="id" placeholder='elige un id'/>
        </form>
        <a href="/board">buscar</a>
        </div>
        </div>
        <a href="/principal">atras</a>
      </div>

    );
}

        // <div className='UnirmePartida'>
        //       <a className="button" href="/board">partida random</a>
        //       <form action="elige un id">
        //         <input type="id" placeholder="elige un id"/>
        //       </form>
        // </div>