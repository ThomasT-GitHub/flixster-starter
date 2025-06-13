import './MovieModal.css'
import { getMovieTrailer, convertArrayOfGenreIDsToGenres, getMovieRuntime } from '../utils/utils'
import { useEffect, useState } from 'react';

const MovieModal = ({ title, releaseDate, genreIDs, overview, backdropPath, movieID }) => {
    const [movieTrailerURL, setMovieTrailerURL] = useState("");
    const [genres, setGenres] = useState([]);
    const [runtime, setRuntime] = useState([]);
    const moviePosterSource = `https://image.tmdb.org/t/p/w400/${backdropPath}`;

    useEffect(() => {
        (async () => {
            setMovieTrailerURL(await getMovieTrailer(movieID));
            setGenres(convertArrayOfGenreIDsToGenres(genreIDs));
            setRuntime(await getMovieRuntime(movieID));
        })();
    }, []);

    return (
        <section className="MovieModal-view">
            <section className="MovieModal-content" >
                <section className="MovieModal-movie-graphics">
                    <img src={moviePosterSource} alt="Movie Backdrop poster" />
                    <iframe width="400" height="315" src={movieTrailerURL} />
                </section>

                <section className="MovieModal-movie-information">
                    <h2 className="MovieModal-title">{title}</h2>
                    <p className="MovieModa-release-date">{releaseDate}</p>
                    <p className="MovieModa-runtime">{runtime} minutes</p>
                    <p className="MovieModal-genres">{genres}</p>
                    <p className="MovieModal-overview">{overview}</p>
                </section>
            </section>
        </section>
    )
}

export default MovieModal
