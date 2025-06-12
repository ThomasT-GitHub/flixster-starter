/**
 * This function returns a page of currently playing movies
 * @param {number} pageNumber The page to return
 */
export const getNowPlayingMoviesByPage = async (pageNumber) => {
    const apiToken = import.meta.env.TMDB_ACCESS_TOKEN;

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

/**
 * This function returns a page of searched movies
 * @param {number} pageNumber The page to return
 * @param {string} movieListSearchQuery The query to search
 */
export const getSeachedMoviesByPage = async (pageNumber, movieListSearchQuery) => {
    const apiToken = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNWNkNWI1ZTg3MzhlNTI1MDRjZjcwN2MxN2JlMWVmOSIsIm5iZiI6MTc0OTUwNjUyNi40MjEsInN1YiI6IjY4NDc1OWRlY2FmMzNhMjE4ZGJiMzRiYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0TjN0ym2HfLPnXfzCWiZ_fOOJVd5itIaAL2QJriYqok`;

    const url = `https://api.themoviedb.org/3/search/movie?query=${movieListSearchQuery}&include_adult=false&language=en-US&page=${pageNumber}`;
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

/**
 * This function sorts an array of movies alphabetically
 * @param {movie} array movieList The movie array to sort
 * @param {useState} setMovieList Setter for movieList
 */
export const sortMovieListAlphabetically = (movieList, setMovieList) => {
    const sortedMovieList = [...movieList].sort((a, b) => a.title.localeCompare(b.title));
    setMovieList(sortedMovieList);
}

/**
 * This function sorts an array of movies by release date
 * @param {movie} array movieList The movie array to sort
 * @param {useState} setMovieList Setter for movieList
 */
export const sortMovieListChronologically = (movieList, setMovieList) => {
    const sortedMovieList = [...movieList].sort((a, b) => a.release_date.localeCompare(b.release_date));
    setMovieList(sortedMovieList);
}

/**
 * This function sorts an array of movies by vote average
 * @param {movie} array movieList The movie array to sort
 * @param {useState} setMovieList Setter for movieList
 */
export const sortMovieListByVoteAverage = (movieList, setMovieList) => {
    const sortedMovieList = [...movieList].sort((a, b) => b.vote_average - a.vote_average);
    setMovieList(sortedMovieList);
}
