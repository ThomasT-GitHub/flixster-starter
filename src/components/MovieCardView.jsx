import MovieCard from './MovieCard'
import MovieModal from './MovieModal'
import { useEffect, useState } from 'react'
import './MovieCardView.css'

const MovieCardView = ({ movieList, setMovieAsLiked, setMovieAsWatched, checkMovieWatchedStatus, checkMovieLikedStatus }) => {
    const [movieCardInfo, setMovieCardInfo] = useState({});
    const [isMovieModalShowing, setIsMovieModalShowing] = useState(false);

    useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            if (event.target.className === "MovieModal-view" || event.target.className === "MovieModal-exit-buton")
                setIsMovieModalShowing(false);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape")
                setIsMovieModalShowing(false);
        });
    }, []);

    return (
        <>
            <section className="MovieCardView-movie-list-view">
                {movieList.map((movie) => {
                    return <MovieCard key={movie.id} title={movie.title}
                        releaseDate={movie.release_date} genres={movie.genre_ids}
                        overview={movie.overview} posterPath={movie.poster_path}
                        movieID={movie.id} backdropPath={movie.backdrop_path}
                        voterAverage={movie.vote_average} setMovieCardInfo={setMovieCardInfo}
                        setIsMovieModalShowing={setIsMovieModalShowing} setMovieAsWatched={setMovieAsWatched}
                        setMovieAsLiked={setMovieAsLiked} checkMovieWatchedStatus={checkMovieWatchedStatus} checkMovieLikedStatus={checkMovieLikedStatus}
                    />
                })}
            </section>

            {isMovieModalShowing && <MovieModal title={movieCardInfo.title}
                releaseDate={movieCardInfo.releaseDate} genreIDs={movieCardInfo.genres}
                overview={movieCardInfo.overview} backdropPath={movieCardInfo.backdropPath}
                movieID={movieCardInfo.movieID}
            />}
        </>
    )
}

export default MovieCardView
