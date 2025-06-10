const Home = () => {
    return (
      <>
        <p>Home</p>
      </>
    )
  }

  export default Home

async function getNowPlayingMovies() {
    const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.TMDB_API_KEY}`
        }
    };
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error("Failed to fetch data!");
        }

        const data = await response.json();

        return data;
    } catch(error) {
        console.error(error)
    }
}
