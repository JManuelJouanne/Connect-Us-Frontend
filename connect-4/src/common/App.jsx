import './App.css'

function App() {

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
    </div>
  )
}

export default App
