import MovieCardView from './MovieCardView'
import './Home.css'

const Watched = ({movieList, setMovieAsWatched, setMovieAsLiked, checkMovieWatchedStatus, checkMovieLikedStatus}) => {

    return (
        <section className="Home-view">
            <MovieCardView movieList={movieList} setMovieAsWatched={setMovieAsWatched} setMovieAsLiked={setMovieAsLiked}
                                                                                checkMovieWatchedStatus={checkMovieWatchedStatus} checkMovieLikedStatus={checkMovieLikedStatus}/>
        </section>
    )
  }

  export default Watched
