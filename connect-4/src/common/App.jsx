import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1 id='mainMenu'>connect us</h1>
      <div className='botones'>
      <div>
        <button>log in</button>
        <button>sign up</button>
      </div>
      <div id='otro'>
        <button>about us</button>
        <button>instructions</button>
      </div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
      <h1>{count}</h1>
    </div>
  )
}

export default App
