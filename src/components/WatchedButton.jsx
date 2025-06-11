import {useState} from 'react'
import watchedIcon from '../assets/watched_eye.svg'
import unwatchedIcon from '../assets/unwatched_eye.svg'

const WatchedButton = () => {
    const [watched, setWatched] = useState(false);

    const handleWatchedButtonClick = () => {
        setWatched(!watched);
    }

    return (
        <button onClick={handleWatchedButtonClick}>
            <img src={ watched ? watchedIcon : unwatchedIcon} alt="Watched Button Icon" width="40px" />
        </button>
    )
  }

export default WatchedButton
