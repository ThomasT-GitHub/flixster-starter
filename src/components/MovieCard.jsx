const MovieCard = ({posterPath, title, voterAverage}) => {
    const moviePosterSource = `https://image.tmdb.org/t/p/original/${posterPath}`;

    return (
      <>
        <img src={moviePosterSource} alt="Movie Poster" />
        <h2>{title}</h2>
        <p>{voterAverage}</p>
      </>
    )
  }

  export default MovieCard
