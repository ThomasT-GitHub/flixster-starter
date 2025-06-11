import { Routes, Route, NavLink } from 'react-router'
import React, { useState, useEffect } from 'react';
import {
  getNowPlayingMoviesByPage, sortMovieListAlphabetically,
  sortMovieListChronologically, sortMovieListByVoteAverage
} from './utils/utils'
import Home from './components/Home'
import Liked from './components/Liked'
import Watched from './components/Watched'
import './App.css'

const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [movieListPageNumber, setMovieListPageNumber] = useState(1);

  // Append a new page to movieList when the pageNumber is updated
  useEffect(() => {
    (async () => {
      const data = await getNowPlayingMoviesByPage(movieListPageNumber);
      setMovieList((prevMovieList) => [...prevMovieList, ...data]);
    })();
  }, [movieListPageNumber]);

  // Sort the movieList array depending on the sort criteria
  const handleMovieListSortChange = (event) => {
    const { value } = event.target;

    switch (value) {
      case "A-Z":
        sortMovieListAlphabetically(movieList, setMovieList);
        break;
      case "Release Date":
        sortMovieListChronologically(movieList, setMovieList);
        break;
      case "Vote Average":
        sortMovieListByVoteAverage(movieList, setMovieList);
        break;
    }
  }

  return (
    <>
      <header className="App-header">
        <h1>Flixster</h1>

        <select name="MovieListSort" onChange={handleMovieListSortChange}>
          <option value="">Sort</option>
          <option value="A-Z">A-Z</option>
          <option value="Release Date">Release Date</option>
          <option value="Vote Average">Vote Average</option>
        </select>
      </header>

      <section className="App">
        <nav className="App-sidebar">
          <NavLink className="App-sidebar-link" to="/">Home</NavLink>
          <NavLink className="App-sidebar-link" to="/liked">Liked</NavLink>
          <NavLink className="App-sidebar-link" to="/watched">Watched</NavLink>
        </nav>

        <Routes className="App-page-view">
          <Route path="/" element={<Home movieList={movieList} setMovieListPageNumber={setMovieListPageNumber} />} />
          <Route path="/liked" element={<Liked movieList={movieList} setMovieListPageNumber={setMovieListPageNumber} />} />
          <Route path="/watched" element={<Watched movieList={movieList} setMovieListPageNumber={setMovieListPageNumber} />} />
        </Routes>
      </section>

      <footer>
        <p>Thomas T // Codepath 2025</p>
      </footer>
    </>
  )
}

export default App
