import React from "react";
import startIcon from "../assets/star.svg";
import NoMovie from "../assets/no-movie.png";

type MovieProp = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

const MovieCard: React.FC<{ movie: MovieProp }> = ({ movie }) => {
  return (
    <div className="bg-teal-950 p-5 rounded-2xl max-w-2xl  ">
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : NoMovie
        }
        loading="lazy"
        alt={movie.title}
        className="rounded-lg h-auto w-full"
      />
      <div className="mt-4">
        <h3 className="text-white font-bold text-base">{movie.title}</h3>
        <div className="flex flex-row items-center flex-wrap gap-1 ">
          <div className="flex item-center gap-2">
            <img src={startIcon} alt="star-ICon" />
            <p className="text-white">
              {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
            </p>
          </div>
          <span className="text-white font-bold">.</span>
          <p className="text-white">{movie.original_language}</p>
          <span className="text-white font-bold">.</span>
          <p className="text-white">
            {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
