import { useState, useEffect } from 'react'
import likedIcon from '../assets/liked_heart.svg'
import unlikedIcon from '../assets/unliked_heart.svg'

const LikedButton = ({ movieID, setMovieAsLiked, checkMovieLikedStatus }) => {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        setLiked(checkMovieLikedStatus(movieID));
    }, []);

    const handleLikeButtonClick = (event) => {
        event.stopPropagation();
        setLiked(!liked);

        setMovieAsLiked(movieID);
    }

    return (
        <button onClick={handleLikeButtonClick} style={{backgroundColor: 'white'}}>
            <img src={liked ? likedIcon : unlikedIcon} alt="Like Button Icon" style={{display: 'flex', justifySelf: 'center', width: "1.5vw"}}/>
        </button>
    )
}

export default LikedButton
