import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard'

const Home = () => {
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await getNowPlayingMovies();
            setMovieList(data);
        })();
    }, []);

    return (
      <>
        {movieList.map((movie) => {
            return <MovieCard key={movie.id} posterPath={movie.poster_path} title={movie.title} voterAverage={movie.voter_average}/>
        })}
      </>
    )
  }

  export default Home

  const getNowPlayingMovies = async () => {
    const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.TMDB_ACESS_TOKEN}`
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error("Failed to fetch data!");
        }

        const data = await response.json();

        console.log(data)

        return data.results;
    } catch(error) {
        console.error(error)
    }
}
