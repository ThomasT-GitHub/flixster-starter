import MovieCardView from './MovieCardView'
import './Home.css'

const Home = ({movieList, setMovieListPageNumber, setMovieAsWatched, setMovieAsLiked, checkMovieWatchedStatus, checkMovieLikedStatus}) => {

    const handleLoadMoreButton = () => {
        setMovieListPageNumber((movieListPageNumber) => movieListPageNumber + 1);
    }

    return (
        <section className="Home-view">
            <MovieCardView movieList={movieList} setMovieAsWatched={setMovieAsWatched} setMovieAsLiked={setMovieAsLiked}
                           checkMovieWatchedStatus={checkMovieWatchedStatus} checkMovieLikedStatus={checkMovieLikedStatus}/>
            <button onClick={handleLoadMoreButton}>Load More!</button>
        </section>
    )
  }

  export default Home
