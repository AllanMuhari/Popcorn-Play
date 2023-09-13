/** @format */
import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./Components/Moviecard/MovieCard";
// import { Router } from "react-router";

function App() {
  const API_URL = "https://api.themoviedb.org/3";
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState();
  const fetchMovies = async (searchKey) => {
    const type = 'discover'
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
        query:searchKey 
      },
    });
    setMovies(results);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const renderMovies = () =>
    movies.map((movie) => <MovieCard key={movie.id} movie={movie} />);

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  return (
    <div>
      <div className='m-auto'>
        <header className=' flex gap-7'>
          <h1 className='flex m-auto'>Movie Box</h1>
          <form onSubmit={searchMovies} className="flex ">
            <input
              className=' flex  border-2 w-[10rem] lg:w-[30rem] p-1 m-2 lg:mr-[5rem] border-gray-500'
              type='text'
              placeholder='What do you want to watch ?'
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <button className="rounded bg-slate-500 w-[4rem] m-3" type={"submit"}>Search</button>
          </form>

          <div className='hidden lg:flex m-auto'>
            <h1>Sign in</h1>
          </div>
        </header>
         {searchKey} 
      </div>

      <div className='moviecards'>
        <div className='flex'>
          <h1 className='font-extrabold text-[25px] flex justify-center content-center lg:ml-[10rem]'>
            Featured Movies
          </h1>
          <a
            href='/'
            className='cursor-pointer flex m-auto text-[2xl] border-b-2 border-red-600 '
          >
            See more
          </a>
        </div>
        <div className='grid grid-cols-2 lg:grid-cols-4 md:grid-cols-2 gap-8 text-[18px] font-bold  lg:mx-72'>
          {renderMovies()}
        </div>
      </div>
    </div>
  );
}

export default App;
