import React from "react";

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
    <div>
      <p className="text-white">{movie.title}</p>
    </div>
  );
};

export default MovieCard;
