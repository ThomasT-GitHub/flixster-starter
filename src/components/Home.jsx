import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard'
import './Home.css'

const Home = () => {
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await getNowPlayingMovies();
            setMovieList(data);
        })();
    }, []);

    return (
        <section className="Home-view">
        {movieList.map((movie) => {
            return <MovieCard key={movie.id} posterPath={movie.poster_path} title={movie.title} voterAverage={movie.voter_average}/>
        })}
        </section>
    )
  }

  export default Home

  const getNowPlayingMovies = async () => {
    const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
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
