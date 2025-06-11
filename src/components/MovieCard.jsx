import './MovieCard.css'
import LikeButton from './LikeButton'
import WatchedButton from './WatchedButton'

const MovieCard = ({posterPath, title, voterAverage}) => {
    const moviePosterSource = `https://image.tmdb.org/t/p/w400/${posterPath}`;

    return (
      <section className="MovieCard">
        <img className="MovieCard-poster"src={moviePosterSource} alt="Movie Poster" />
        <h2 className="MovieCard-title">{title}</h2>
        <p>🌟{voterAverage}</p>
        <LikeButton liked={false}/>
        <WatchedButton watched={false}/>
      </section>
    )
  }

  export default MovieCard
