import MovieCardView from './MovieCardView'
import './Home.css'
import { useEffect, useState} from 'react'

const Liked = ({movieList, setMovieAsWatched, setMovieAsLiked, checkMovieWatchedStatus, checkMovieLikedStatus}) => {
    return (
        <section className="Home-view">
            <MovieCardView movieList={movieList} setMovieAsWatched={setMovieAsWatched} setMovieAsLiked={setMovieAsLiked}
                                                                              checkMovieWatchedStatus={checkMovieWatchedStatus} checkMovieLikedStatus={checkMovieLikedStatus} />
        </section>
    )
  }

  export default Liked
