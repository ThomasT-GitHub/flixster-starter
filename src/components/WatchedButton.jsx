import { useState, useEffect } from 'react'
import watchedIcon from '../assets/watched_eye.svg'
import unwatchedIcon from '../assets/unwatched_eye.svg'

const WatchedButton = ({ movieID, setMovieAsWatched, checkMovieWatchedStatus }) => {
    const [watched, setWatched] = useState(false);

    useEffect(() => {
        setWatched(checkMovieWatchedStatus(movieID));
    }, []);

    const handleWatchedButtonClick = (event) => {
        event.stopPropagation();
        setWatched(!watched);

        setMovieAsWatched(movieID);
    }

    return (
        <button onClick={handleWatchedButtonClick} style={{backgroundColor: 'white'}}>
            <img src={watched ? watchedIcon : unwatchedIcon} alt="Watched Button Icon" style={{display: 'flex', justifySelf: 'center', height: "4vh", width: "2vw"}}/>
        </button>
    )
}

export default WatchedButton
