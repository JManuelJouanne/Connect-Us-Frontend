// import './styles/Game.css';
// import {Link, Routes, Route, useNavigate} from 'react-router-dom';
// import Info from '../components/game/Info';
// import {useParams} from 'react-router-dom';
// import { AuthContext } from '../auth/AuthContext';
// import { w3cwebsocket } from 'websocket';
// import axios from 'axios';
// import io from 'socket.io-client';

// const socket = io(`${import.meta.env.VITE_BACKEND_URL}`);


// export default function Game() {
//     const [diceNumber, setDiceNumber] = useState(6);
//     const { gameId } = useParams();
//     const { token } = useContext(AuthContext); 
//     const [responseData, setResponseData] = useState(null);
//     const [playerInTurn, setPlayerInTurn] = useState(1);
//     const [gameInfo, setGameInfo] = useState(null);
//     const [player1, setPlayer1] = useState(null);
//     const [player2, setPlayer2] = useState(null);
//     const [player3, setPlayer3] = useState(null);
//     const [player4, setPlayer4] = useState(null);
//     const [thisPlayer, setThisPlayer] = useState(null);
//     const [idPLayerInTurn, setIdPlayerInTurn] = useState(null);
//     const [message, setMessage] = useState('');
//     const navigateTo = useNavigate();
//     let turno = 4;

//     useEffect(() => {
//         recibirDatos();
//         recibirGameInfo();
//         recibirPlayer();
    
//         socket.on('connect', () => {
//           console.log('Conexión establecida con el servidor WebSocket');
//         });
    
//         socket.on('response', (response) => {
//             console.log('Mensaje recibido de web socket:', response);
//             console.log('El id del juego es:', gameId);
//             console.log('El id del juego es response:', response.response.gameId);
//             if (response.response.gameId === gameId) {
//                 console.log('El id del juego es igual');
//               handleResponse(response);
//             }
//           });
    
//         return () => {
//           socket.disconnect();
//         };
//       }, [token]);


//       async function handleResponse(data) {
//         console.log('Mensaje recibidobbb:', data);
//         const dado = data.response.dado;
//         const finalPosition = data.response.finalPosition;
//         const initPosition = data.response.initPosition;
//         setDiceNumber(dado);
//         if (turno === 4) {
//             turno = 1;
//         } else if (turno === 1) {
//             turno = 2;
//         } else if (turno === 2) {
//             turno = 3;
//         } else if (turno === 3) {
//             turno = 4;
//         }
        
//         await changePositions(finalPosition, dado, turno);
        
//         console.log("El jugador en turno ssssssssses:", playerInTurn);
//     }
    

//     const config_users = {
//         'method': 'get',
//         'url': `${import.meta.env.VITE_BACKEND_URL}/user/profile`,
//         'headers': {
//             'Authorization': `Bearer ${token}`
//         }
//     }

//     const config = {
//         'method': 'get',
//         'url': `${import.meta.env.VITE_BACKEND_URL}/game/obtainPlayers/${gameId}`,
//         'headers': {
//         'Authorization': `Bearer ${token}`
//         }
//     }

//     const configGame = {
//         'method': 'get',
//         'url': `${import.meta.env.VITE_BACKEND_URL}/game/obtain/${gameId}`,
//         'headers': {
//         'Authorization': `Bearer ${token}`
//         }
//     }


//     const recibirGameInfo =  async () => {
//         axios(configGame)
//         .then((response) => {
//             console.log('Datos recibidos juegoooooooooooo:', response.data);
//             setGameInfo(response.data);
//             setPlayer1(response.data.position_1);
//             setPlayer2(response.data.position_2);
//             setPlayer3(response.data.position_3);
//             setPlayer4(response.data.position_4);
//             console.log("el jugador en turno es: ", response.data.player_turn);
            
//             console.log("el jugador en turno es: ", response.data.player_turn);
            
//             if (response.data.player_turn === 1) {
//                 setIdPlayerInTurn(response.data.user_1);
//             } else if (response.data.player_turn === 2) {
//                 setIdPlayerInTurn(response.data.user_2);
//             } else if (response.data.player_turn === 3) {
//                 setIdPlayerInTurn(response.data.user_3);
//             } else if (response.data.player_turn === 4) {
//                 setIdPlayerInTurn(response.data.user_4);
//             }
//             setPlayerInTurn(response.data.player_turn);
//             console.log("el jugador en turno es: ", playerInTurn);
//         })
//         .catch((error) => {
//             console.error('Ocurrió un error al obtener los datos:', error);
//         });
//     };

//     const recibirPlayer = () => {
//         axios(config_users)
//         .then((response) => {
//             console.log('Datos recibidos:', response.data);
//             setThisPlayer(response.data.id);
//         })
//         .catch((error) => {
//             console.error('Ocurrió un error al obtener los datos:', error);
//         });
//     };

//     const recibirDatos = () => {
//         axios(config)
//         .then((response) => {
//             console.log('Datos recibidos:', response.data);
//             setResponseData(response.data);
//         })
//         .catch((error) => {
//             console.error('Ocurrió un error al obtener los datos:', error);
//         });
//     };
    
//     const handleRollDice = async () => {
//         console.log("handleRollDice");
//         try {
//             const data =  {
//                 playerInTurn,
//                 gameId
//             }
//             socket.emit('message', data);
//         } catch (error) {
//             console.error('Ocurrió un error al obtener los datos:', error);
//         }
//     };

//     const movePlayer = async (player, setPlayer, diceNumber, finalPosition) => {
//         if (player === 100) return;
//   if (diceNumber === 0) return;
//   console.log("iteration");
//   await new Promise((resolve) => {
//     const interval = setInterval(() => {
//       setPlayer((prevPlayer) => prevPlayer + 1);
//       diceNumber -= 1;

//       if (diceNumber === 0) {
//         clearInterval(interval);
//         resolve();
//       }
//     }, 500);
//   });
// };
      
//       const changePositions = async (finalPosition, diceNumber, actualTurn) => {
//         if (actualTurn === 1) {
//             await movePlayer(player1, setPlayer1, diceNumber);
//             setPlayer1(finalPosition);
//             if (finalPosition >= 100) {
//                 alert("Ganó el jugador 1");
//                 navigateTo('/home');
//             }
//         } else if (actualTurn === 2) {
//             await movePlayer(player2, setPlayer2, diceNumber);
//             setPlayer2(finalPosition);
//             if (finalPosition >= 100) {
//                 alert("Ganó el jugador 2");
//                 navigateTo('/home');
//             }
//         } else if (actualTurn === 3) {
//             await movePlayer(player3, setPlayer3, diceNumber);
//             setPlayer3(finalPosition);
//             if (finalPosition >= 100) {
//                 alert("Ganó el jugador 3");
//                 navigateTo('/home');
//             }
//         } else if (actualTurn === 4) {
//             await movePlayer(player4, setPlayer4, diceNumber);
//             setPlayer4(finalPosition);
//             if (finalPosition >= 100) {
//                 alert("Ganó el jugador 4");
//                 navigateTo('/home');
//             }
//         }
//         await recibirGameInfo();
//         //await updateGame();
//         //checkWinner();
//       };


//     function checkWinner() {
//         if (player1 >= 100) {
//             alert("Ganó el jugador 1");
//             window.location.href = '/home';
//         } else if (player2 >= 100) {
//             alert("Ganó el jugador 2");
//             window.location.href = '/home';
//         } else if (player3 >= 100) {
//             alert("Ganó el jugador 3");
//             window.location.href = '/home';
//         } else if (player4 >= 100) {
//             alert("Ganó el jugador 4");
//             window.location.href = '/home';
//         }
//     }

//     return (
//         <>
//             <Navbar />
//             <div className="main-div">
//                 <div className="col-6">
//                 <div>{message}</div>
//                 {responseData && (
//                     <>
//                     {thisPlayer === gameInfo.user_4 && (
//                         <>
//                         <img src={'/imgs/ficha' + (4) + '.png'} className="ficha-individual"/>
//                         <h2>{responseData.user_4}</h2>
//                         </>
//                     )}
//                     {thisPlayer === gameInfo.user_3 && (
//                         <>
//                         <img src={'/imgs/ficha' + (3) + '.png'} className="ficha-individual"/>
//                         <h2>{responseData.user_3}</h2>
//                         </>
//                     )}
//                     {thisPlayer === gameInfo.user_2 && (
//                         <>
//                         <img src={'/imgs/ficha' + (2) + '.png'} className="ficha-individual"/>
//                         <h2>{responseData.user_2}</h2>
//                         </>
//                     )}
//                     {thisPlayer === gameInfo.user_1 && (
//                         <>
//                         <img src={'/imgs/ficha' + (1) + '.png'} className="ficha-individual"/>
//                         <h2>{responseData.user_1}</h2>
//                         </>
//                     )}
//                     <Info player1={responseData.user_1} 
//                           player2={responseData.user_2}
//                           player3={responseData.user_3} 
//                           player4={responseData.user_4}/>
//                 {thisPlayer === idPLayerInTurn && (
//                     <>
//                         <h2>Es tu turno:</h2>
//                         <Dice number={diceNumber} />
//                         <ButtonDice text="Lanzar dado" onClick={handleRollDice} />
//                     </>
//                 )}
//                     </>)
//                 }
//                 </div>
//                 <Board positions={[
//                     { id: 1, position: player1 },
//                     { id: 2, position: player2 },
//                     { id: 3, position: player3 },
//                     { id: 4, position: player4 },
//                 ]}/>
//             </div>
//         </>
//     )
// }