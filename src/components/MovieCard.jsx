import './MovieCard.css'
import LikeButton from './LikeButton'
import WatchedButton from './WatchedButton'

const MovieCard = ({ title, releaseDate, genres, overview, posterPath,
    backdropPath, movieID, voterAverage, setMovieCardInfo, setIsMovieModalShowing,
    setMovieAsWatched, setMovieAsLiked, checkMovieWatchedStatus, checkMovieLikedStatus }) => {
    const moviePosterSource = `https://image.tmdb.org/t/p/w400/${posterPath}`;

    const handleMovieCardClick = () => {
        const movieCardInfo = {
            "title": title,
            "releaseDate": releaseDate,
            "genres": genres,
            "overview": overview,
            "backdropPath": backdropPath,
            "movieID": movieID
        }

        setIsMovieModalShowing(true);
        setMovieCardInfo(movieCardInfo);
    }

    return (
        <>
            <section onClick={handleMovieCardClick} className="MovieCard">
                <img className="MovieCard-poster" src={moviePosterSource} alt="Movie Poster" />
                <section style={{height: 'fit-content'}}>
                    <h2 className="MovieCard-title">{title}</h2>
                    <p className="MovieCard-voter-average">🌟{voterAverage}</p>

                    <section>
                        <LikeButton movieID={movieID} liked={false} setMovieAsLiked={setMovieAsLiked} checkMovieLikedStatus={checkMovieLikedStatus} />
                        <WatchedButton movieID={movieID} watched={false} setMovieAsWatched={setMovieAsWatched} checkMovieWatchedStatus={checkMovieWatchedStatus} />
                    </section>
                </section>
            </section>
        </>
    )
}

export default MovieCard
