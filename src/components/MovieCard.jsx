const MovieCard = ({imagePath, title, votes}) => {
    const moviePosterSource = `https://image.tmdb.org/t/p/original/${imagePath}`;

    return (
      <>
        <img src={moviePosterSource} alt="Movie Poster" />
        <h2>{title}</h2>
        <p>{votes}</p>
      </>
    )
  }

  export default MovieCard
