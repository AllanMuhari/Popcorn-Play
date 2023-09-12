/** @format */
import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./Components/Moviecard/MovieCard";
function App() {
  const API_URL = "https://api.themoviedb.org/3";
  const [movies, setMovies] = useState([]);
  const fetchMovies = async () => {
    const { data: {results} } = await axios.get(`${API_URL}/discover/movie`, {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
      },
    });
    setMovies(results);
  };

  useEffect(() => {
    fetchMovies();
  }, []);


  const renderMovies = () => (
    movies.map(movie => (
        <MovieCard
            key={movie.id}
            movie={movie}
        />
    ))
)



  return(
    <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 max-w-[1620px] m-auto ">
      {renderMovies()}
    </div>
  )
}

export default App;
