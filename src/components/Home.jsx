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
    const apiToken = import.meta.env.TMDB_ACCESS_TOKEN;

    const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNumber}`;
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiToken}`
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
