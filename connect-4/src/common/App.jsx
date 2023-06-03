import './App.css'

function App() {

  return (
    <div className="App">
      <h1 className='title'>connect us</h1>
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
          <a href="/principal">log in</a>
          <a href="/principal">sign up</a>
        </div>
      </div>
    </div>
  )
}

export default App
