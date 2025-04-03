import { useState } from "react";
import hero from "./assets/hero.png";
import Search from "./Components/Search";
import { FetchData } from "./utils/FetchData";
import { useEffect } from "react";
import Spinner from "./Components/Spinner";
import MovieCard from "./Components/MovieCard";
import { useDebounce } from "react-use";

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
  const [debounceSearchTerm, setDebounceSearchTerm] = useState<string>("");

  useDebounce(
    () => {
      setDebounceSearchTerm(searchTerm);
    },
    500,
    [searchTerm]
  );

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const endpoint = debounceSearchTerm
          ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
              debounceSearchTerm
            )}`
          : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
        const response = await FetchData(endpoint);

        setMovieList(response.results || []);
      } catch (error) {
        console.error(`Error fetching movies :${error}`);
        setErrorMessage("Error Fetching Movies .Please Try Again");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieData();
  }, [debounceSearchTerm]);

  useEffect(() => {
    console.log(movieList); // ✅ Logs the updated movieList whenever it changes
  }, [movieList]);
  return (
    <main>
      <div className="">
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
        <section className="space-y-9">
          <h2 className="text-white  font-bold text-3xl mt-[40px]">
            All Movies
          </h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul className="grid grid-col-1 gap-2 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
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
