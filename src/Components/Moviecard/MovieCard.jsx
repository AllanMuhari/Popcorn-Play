/** @format */

import React from "react";
const MovieCard = ({ movie, selectMovie }) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w342";
  console.log(movie);
  return (
    <div onClick={() => selectMovie(movie)} className={"movie"}>
      <div className='cursor-pointer'>
        {movie.poster_path ? (
          <img src={IMAGE_PATH + movie.poster_path} alt={movie.title} />
        ) : (
          <div className='h-[239px] bg-white'>No Image found</div>
        )}
        <h3> {movie.title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;
