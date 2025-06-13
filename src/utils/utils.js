/**
 * This function returns a page of currently playing movies
 * @param {number} pageNumber The page to return
 */
export const getNowPlayingMoviesByPage = async (pageNumber) => {


    const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNumber}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`

        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error("Failed to fetch data!");
        }

        const data = await response.json();

        return data.results;
    } catch (error) {
        console.error(error)
        return [];
    }
}

/**
 * This function returns a page of searched movies
 * @param {number} pageNumber The page to return
 * @param {string} movieListSearchQuery The query to search
 */
export const getSeachedMoviesByPage = async (pageNumber, movieListSearchQuery) => {


    const url = `https://api.themoviedb.org/3/search/movie?query=${movieListSearchQuery}&include_adult=false&language=en-US&page=${pageNumber}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error("Failed to fetch data!");
        }

        const data = await response.json();

        return data.results;
    } catch (error) {
        console.error(error)
        return [];
    }
}

/**
 * This function returns all videos associated with a movie
 * @param {number} movieID The movie to request
 */
export const getMovieVideos = async (movieID) => {


    const url = `https://api.themoviedb.org/3/movie/${movieID}/videos`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error("Failed to fetch data!");
        }

        const data = await response.json();

        return data.results;
    } catch (error) {
        console.error(error)
    }
}

/**
 * This function returns the genre a genreID is associated with
 * @param {number} genreID The genreID to check
 */
export const convertGenreIDToGenreString = (genreID) => {
    const genreIDs = {
        28: "Action ",
        12: "Adventure ",
        16: "Animation ",
        35: "Comedy ",
        80: "Crime ",
        99: "Documentary ",
        18: "Drama ",
        10751: "Family ",
        14: "Fantasy ",
        36: "History ",
        27: "Horror ",
        10402: "Music ",
        9648: "Mystery ",
        10749: "Romance ",
        878: "Science Fiction ",
        10770: "TV Movie ",
        53: "Thriller ",
        10752: "War ",
        37: "Western"
    }

    return genreIDs[genreID];
}

/**
 * This function returns an array of genres according to an array of genreIDs
 * @param {number[]} genreID The genreID to check
 */
export const convertArrayOfGenreIDsToGenres = (genreIDs) => {
    let genres = []

    genreIDs.forEach(genreID => {
        genres.push(convertGenreIDToGenreString(genreID));
    });

    return genres;
}

/**
 * This function returns the trailer associated with a movieID
 * @param {number} movieID The movie to request
 */
export const getMovieTrailer = async (movieID) => {
    const videos = await getMovieVideos(movieID);

    for (let index = 0; index < videos.length; index++) {
        if (videos[index].type === "Trailer") {
            return `https://www.youtube.com/embed/${videos[index].key}`
        }
    }
}

/**
 * This function returns the trailer associated with a movieID
 * @param {number} movieID The movie to request
 */
export const getMovieRuntime = async (movieID) => {


    const url = `https://api.themoviedb.org/3/movie/${movieID}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error("Failed to fetch data!");
        }

        const data = await response.json();

        return data.runtime;
    } catch (error) {
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
