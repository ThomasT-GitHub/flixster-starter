import {useState} from 'react'
import likedIcon from '../assets/liked_heart.svg'
import unlikedIcon from '../assets/unliked_heart.svg'

const LikedButton = () => {
    const [liked, setLiked] = useState(false);

    const handleLikeButtonClick = () => {
        setLiked(!liked);
    }

    return (
        <button onClick={handleLikeButtonClick}>
            <img src={ liked ? likedIcon : unlikedIcon} alt="Like Button Icon" width="40px"/>
        </button>
    )
  }

export default LikedButton
