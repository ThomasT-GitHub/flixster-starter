import MovieCard from './MovieCard'
import './MovieCardView.css'

const MovieCardView = ({movieList}) => {

    return (
        <section className="MovieCardView-movie-list-view">
            {movieList.map((movie) => {
                return <MovieCard key={movie.id} posterPath={movie.poster_path} title={movie.title} voterAverage={movie.vote_average}/>
            })}
        </section>
    )
  }

export default MovieCardView
