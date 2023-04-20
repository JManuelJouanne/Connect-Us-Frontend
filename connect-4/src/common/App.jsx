import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div><h1 className='title'>connect us</h1></div>
      <div className='menu'>
      <div>
      <form className="email-form">
      <input type="text" placeholder="email" required />
      </form>
      </div>
      <div>
      <form className="email-form">
      <input type="password" placeholder="password" required />
      </form>
      </div>
      <div className='botones'>
        <button>log in</button>
        <button>sign up</button>
      </div>

      </div>

      

      {/* <div className='botones'>
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
      <h1>{count}</h1> */}
    </div>
  )
}

export default App
