/** @format */
import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import MovieCard from "./Components/Moviecard/MovieCard";
// import { Router } from "react-router";

function App() {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";
  const API_URL = "https://api.themoviedb.org/3";
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState([]);
  const [searchKey, setSearchKey] = useState();
  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
        query: searchKey,
      },
    });
    setSelectedMovie(results[0]);
    setMovies(results);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const renderMovies = () =>
    movies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} selectMovie={setSelectedMovie} />
    ));

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  return (
    <div>
      <div
        className='w-full h-[30rem] lg:h-full   object-cover bg-no-repeat bg-center'
        style={{
          backgroundImage: `url('${IMAGE_PATH}${selectedMovie.backdrop_path}')`,
        }}
      >
        <header className=' flex flex-row lg:mr-[20rem]'>
          <span className='m-auto text-white font-bold'>Movie Box</span>
          <form onSubmit={searchMovies} className='flex '>
            <input
              className='flex border-2 w-[15rem] lg:w-[30rem] p-1 m-2 lg:mr-[5rem] border-gray-500'
              type='text'
              placeholder='What do you want to watch ?'
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />

            <button
              className='rounded bg-slate-500 w-[4rem] m-3'
              type={"submit"}
            >
              Search
            </button>
          </form>

          <div className='flex'>
            <h1 className=' text-white font-bold cursor-pointer m-auto'>
              Sign in
            </h1>
          </div>
        </header>
        <div>
          <div className='mt-[5rem] lg:mt-[25rem] lg:ml-[18rem]'>
            <button className='content-end rounded bg-slate-500 w-[5rem]  '>
              Play Trailer
            </button>
            <h1 className='text-xl font-bold text-slate-200'>
              {selectedMovie.title}
            </h1>
            <p className=' flex w-[25rem] h-[8rem] text-white '>
              {selectedMovie.overview ? selectedMovie.overview : null}
            </p>
          </div>
        </div>
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
