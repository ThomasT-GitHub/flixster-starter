import MovieCardView from './MovieCardView'
import './Home.css'

const Home = ({movieList, setMovieListPageNumber}) => {

    const handleLoadMoreButton = () => {
        setMovieListPageNumber((movieListPageNumber) => movieListPageNumber + 1);
    }

    return (
        <section className="Home-view">
            <MovieCardView movieList={movieList} />
            <button onClick={handleLoadMoreButton}>Load More!</button>
        </section>
    )
  }

  export default Home
