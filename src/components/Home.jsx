import React, { useState, useEffect } from 'react';
import MovieCardView from './MovieCardView'
import './Home.css'

const Home = () => {
    const [movieList, setMovieList] = useState([]);
    const [movieListPageNumber, setMovieListPageNumber] = useState(1);

    useEffect(() => {
        (async () => {
            const data = await getNowPlayingMoviesByPage(movieListPageNumber);
            setMovieList((prevMovieList) => [...prevMovieList, ...data]) ;
        })();
    }, [movieListPageNumber]);

    const handleLoadMoreButton = () => {
        setMovieListPageNumber(movieListPageNumber + 1);
    }

    return (
        <section className="Home-view">
            <MovieCardView movieList={movieList} />
            <button onClick={handleLoadMoreButton}>Load More!</button>
        </section>
    )
  }

  export default Home

  /**
   * This function returns a page of currently playing movies
   * @param {number} pageNumber The page to return
   */
  const getNowPlayingMoviesByPage = async (pageNumber) => {
    const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNumber}`;
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNWNkNWI1ZTg3MzhlNTI1MDRjZjcwN2MxN2JlMWVmOSIsIm5iZiI6MTc0OTUwNjUyNi40MjEsInN1YiI6IjY4NDc1OWRlY2FmMzNhMjE4ZGJiMzRiYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0TjN0ym2HfLPnXfzCWiZ_fOOJVd5itIaAL2QJriYqok`
        }
      };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error("Failed to fetch data!");
        }

        const data = await response.json();

        return data.results;
    } catch(error) {
        console.error(error)
    }
}
