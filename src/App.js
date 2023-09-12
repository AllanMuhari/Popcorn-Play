/** @format */

import { useEffect , useState} from "react";
import axios from "axios";
import "./App.css";

function App() {


  const API_URL = 'https://api.themoviedb.org/3'

  const [movies , setmovies] = usestate([])
  const fetchMovies = async () => {
    const data = await axios.get(`${API_URL}/discover/movie` , {
      params: {
        api_key : process.env.REACT_APP_MOVIE_API_KEY
      }
    });
  };

  useEffect(() => {
    fetchMovies();
  });
  return (
    <div className="font-bold text-red-800 flex justify-center content-center">
      Hello Allan 
    </div>
  )
}

export default App;
