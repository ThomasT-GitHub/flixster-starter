import { Routes, Route, NavLink } from 'react-router'
import Home from './components/Home'
import Liked from './components/Liked'
import Watched from './components/Watched'
import './App.css'

const App = () => {
  return (
    <>
      <header>
        <h1>Flixster</h1>
      </header>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/liked">Liked</NavLink>
        <NavLink to="/watched">Watched</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/liked" element={<Liked/>} />
        <Route path="/watched" element={<Watched/>} />
      </Routes>
    </>
  )
}

export default App
