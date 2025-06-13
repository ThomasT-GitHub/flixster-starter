import { Routes, Route, NavLink, useLocation } from 'react-router'
import React, { useState, useEffect } from 'react';
import {
  getNowPlayingMoviesByPage, sortMovieListAlphabetically,
  sortMovieListChronologically, sortMovieListByVoteAverage,
  getSeachedMoviesByPage
} from './utils/utils'
import Home from './components/Home'
import Liked from './components/Liked'
import Watched from './components/Watched'
import './App.css'

const App = () => {
  const [loadMoreMode, setLoadMoreMode] = useState("now-playing");
  const [movieList, setMovieList] = useState([]);
  const [likedMovieList, setLikedMovieList] = useState([]);
  const [watchedMovieList, setWatchedMovieList] = useState([]);
  const [movieListBackup, setMovieListBackup] = useState([]);
  const [movieListPageNumber, setMovieListPageNumber] = useState(1);
  const [movieListSearchQuery, setMovieListSearchQuery] = useState("");

  // Append a new page to movieList when the pageNumber is updated
  useEffect(() => {
    (async () => {
      if (loadMoreMode === "now-playing") {
        const data = await getNowPlayingMoviesByPage(movieListPageNumber);
        setMovieList((prevMovieList) => [...prevMovieList, ...data]);

        // Back up the now showing movies so we can return to them after clearing search
        setMovieListBackup((prevMovieList) => [...prevMovieList, ...data]);
      }

      if (loadMoreMode === "search") {
        const data = await getSeachedMoviesByPage(movieListPageNumber, movieListSearchQuery);
        setMovieList((prevMovieList) => [...prevMovieList, ...data]);
      }
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

  // Stores the current query in the movie search
  const handleMovieListSearchChange = (event) => {
    setMovieListSearchQuery(event.target.value);
  }

  // If 'Enter' is pressed, send search
  const handleMovieListSearchEnter = (event) => {
    if (event.key === 'Enter') {
      handleMovieListSearchSubmit()
    }
  }

  // Asks the TMDB API for a movie with movieListSearchQuery
  const handleMovieListSearchSubmit = async () => {
    // Set load more button to load search pages
    setLoadMoreMode("search");

    const data = await getSeachedMoviesByPage(movieListPageNumber, movieListSearchQuery);
    setMovieList(data);
  }

  // Clears the search results
  const handleMovieListSearchClear = (event) => {
    // Sets load more button to load now playing pages
    setLoadMoreMode("now-playing");

    setMovieListSearchQuery("");

    // Restores the original movie list
    setMovieList(movieListBackup);
  }

  // Sets a movie as liked
  const setMovieAsLiked = (movieID) => {
    movieList.map((movie) => {
      if (movie.id === movieID) {
        // If the movie has never been liked before, add like field
        if (movie.liked == null) {
          movie.liked = true;
        }

        else {
          movie.liked = !movie.liked;
        }
      }

      return movie;
    });

    setMovieList(movieList);
    setLikedMovieList(movieList.filter(movie => movie.liked));
  }

  // Sets a movie as watched
  const setMovieAsWatched = (movieID) => {
    movieList.map((movie) => {
      if (movie.id === movieID) {
        // If the movie has never been watched before, add watch field
        if (movie.watched == null) {
          movie.watched = true;
        }

        else {
          movie.watched = !movie.watched;
        }
      }

      return movie;
    });

    setMovieList(movieList);
    setWatchedMovieList(movieList.filter(movie => movie.watched));
  }

  // Return if a movie if liked
  const checkMovieLikedStatus = (movieID) => {
    for (let index = 0; index < movieList.length; index++) {
      if (movieList[index].id === movieID) {
        if (movieList[index].liked != null) {
          return movieList[index].liked;
        }

        return false;
      }
    }
  }

  // Return if a movie if watched
  const checkMovieWatchedStatus = (movieID) => {
    for (let index = 0; index < movieList.length; index++) {
      if (movieList[index].id === movieID) {
        if (movieList[index].watched != null) {
          return movieList[index].watched;
        }

        return false;
      }
    }
  }

  return (
    <>
      <header className="App-header">
        <section className="App-banner">
          <h1>Flixster</h1>

          {/* Only show the search and sort on home */}
          {useLocation().pathname === "/" &&<>
            <section className="MovieListSearch">
              <input type="text" value={movieListSearchQuery} onChange={handleMovieListSearchChange}
                onKeyUp={handleMovieListSearchEnter} placeholder="Search" />
              <button onClick={handleMovieListSearchSubmit}>Submit</button>
              <button onClick={handleMovieListSearchClear}>Clear</button>
            </section>

            <select name="MovieListSort" onChange={handleMovieListSortChange}>
              <option value="">Sort</option>
              <option value="A-Z">A-Z</option>
              <option value="Release Date">Release Date</option>
              <option value="Vote Average">Vote Average</option>
            </select>
          </>}

        </section>
      </header>

      <section className="App">
        <nav className="App-sidebar">
          <NavLink className="App-sidebar-link" to="/">Home</NavLink>
          <NavLink className="App-sidebar-link" to="/liked">Liked</NavLink>
          <NavLink className="App-sidebar-link" to="/watched">Watched</NavLink>
        </nav>

        <Routes className="App-page-view">
          <Route path="/" element={<Home movieList={movieList} setMovieListPageNumber={setMovieListPageNumber}
                          setMovieAsWatched={setMovieAsWatched} setMovieAsLiked={setMovieAsLiked} checkMovieWatchedStatus={checkMovieWatchedStatus} checkMovieLikedStatus={checkMovieLikedStatus}/>} />
          <Route path="/liked" element={<Liked movieList={likedMovieList} setMovieAsWatched={setMovieAsWatched} setMovieAsLiked={setMovieAsLiked} checkMovieWatchedStatus={checkMovieWatchedStatus} checkMovieLikedStatus={checkMovieLikedStatus}/>} />
          <Route path="/watched" element={<Watched movieList={watchedMovieList} setMovieAsWatched={setMovieAsWatched} setMovieAsLiked={setMovieAsLiked} checkMovieWatchedStatus={checkMovieWatchedStatus} checkMovieLikedStatus={checkMovieLikedStatus}/>} />
        </Routes>
      </section>

      <footer>
        <p>Thomas T // Codepath 2025</p>
      </footer>
    </>
  )
}

export default App
