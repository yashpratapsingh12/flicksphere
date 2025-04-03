import { useState } from "react";
import hero from "./assets/hero.png";
import Search from "./Components/Search";
import { FetchData } from "./utils/FetchData";
import { useEffect } from "react";
import Spinner from "./Components/Spinner";
import MovieCard from "./Components/MovieCard";

const API_BASE_URL: string = "https://api.themoviedb.org/3";

type Movie = {
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

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await FetchData(
          `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
        );

        setMovieList(response.results || []);
      } catch (error) {
        console.error(`Error fetching movies :${error}`);
        setErrorMessage("Error Fetching Movies .Please Try Again");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieData();
  }, []);
  // useEffect(() => {
  //   console.log(movieList); // ✅ Logs the updated movieList whenever it changes
  // }, [movieList]);
  return (
    <main>
      <div>
        <header className="mt-10">
          <img src={hero} className="mx-auto" />
          <h1 className=" mx-auto text-white font-semibold text-5xl text-center">
            Find
            <span className=" mx-2 bg-linear-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
              Movies
            </span>
            You'll Enjoy Without the hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="">
          <h2 className="text-white text-center font-bold text-3xl mt-[40px]">
            All Movies
          </h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
