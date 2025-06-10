import { Routes, Route, NavLink } from 'react-router'
import Home from './components/Home'
import Liked from './components/Liked'
import Watched from './components/Watched'
import './App.css'

const App = () => {
  return (
    <>
      <header className="App-header">
        <h1>Flixster</h1>
      </header>

      <section className="App">
        <nav className="App-sidebar">
          <NavLink className="App-sidebar-link" to="/">Home</NavLink>
          <NavLink className="App-sidebar-link" to="/liked">Liked</NavLink>
          <NavLink className="App-sidebar-link" to="/watched">Watched</NavLink>
        </nav>

        <Routes className="App-page-view">
          <Route path="/" element={<Home/>} />
          <Route path="/liked" element={<Liked/>} />
          <Route path="/watched" element={<Watched/>} />
        </Routes>
      </section>
    </>
  )
}

export default App
