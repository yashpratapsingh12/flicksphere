import { useState } from "react";
import hero from "../assets/hero.png";
import Search from "../Components/Search";
import { FetchData } from "../utils/FetchData";
import { useEffect } from "react";
import Spinner from "../Components/Spinner";
import MovieCard from "../Components/MovieCard";
import { useDebounce } from "react-use";
import { updateSearchCount } from "../assets/Appwrite";
import { getTrendingMovies } from "../assets/Appwrite";
import { MovieSearchDocument } from "../assets/Appwrite";
import herobg from "../assets/hero-bg.png";
import { useAuth } from "../utils/AuthContext";
import { useRef } from "react";

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

function Display() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState<string>("");
  const [trendingMovies, setTrendingMovies] = useState<MovieSearchDocument[]>(
    []
  );
  const allMovieRef = useRef<HTMLDivElement>(null);

  const { logoutUser } = useAuth();

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
        if (searchTerm && response.results.length > 0) {
          await updateSearchCount(searchTerm, response.results[0]);
        }
        if (searchTerm.trim() && allMovieRef.current) {
          allMovieRef.current.scrollIntoView({ behavior: "smooth" });
        }
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
    const trendingMovies = async () => {
      try {
        const movie = await getTrendingMovies();

        setTrendingMovies(movie);
      } catch (error) {
        console.log(error);
      }
    };
    trendingMovies();
  }, []);

  useEffect(() => {
    console.log("trending:", trendingMovies);
  }, [trendingMovies]);
  return (
    <main>
      <div
        className="w-full h-full bg-center bg-cover absolute z-0"
        style={{ backgroundImage: `url(${herobg})` }}
      />
      <div className="relative text-end mr-2 ">
        <button
          onClick={logoutUser}
          className="text-white font-under mt-5 mr-5"
        >
          Logout
        </button>
      </div>

      <div className="px-5 py-12 xs:p-10 max-w-7xl mx-auto flex flex-col relative lg:-mt-30">
        <header className="mt-5">
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

        <div className=" mx-auto w-full overflow-x-scroll ">
          {trendingMovies.length > 0 && (
            <section className="mt-20 ">
              <h2 className="text-white font-bold  text-3xl overflow-hidden">
                Trending Movies
              </h2>
              <ul className="flex flex-row  gap-5 -mt-10 w-full max-w-full">
                {trendingMovies.map((movie, index) => (
                  <li
                    key={movie.$id}
                    className="min-w-[230px] flex flex-row items-center"
                  >
                    <p className="mt-[22px] text-nowrap text-white text-[190px] ">
                      {index + 1}
                    </p>
                    <img
                      src={movie.poster_url}
                      alt={movie.title}
                      className="w-[127px] h-[163px] rounded-lg object-cover -ml-3.5"
                    />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div ref={allMovieRef}>
          <section className="space-y-9">
            <h2 className="text-white  font-bold text-3xl mt-[20px]">
              All Movies
            </h2>

            {isLoading ? (
              <div className="flex items-center justify-center">
                <Spinner />
              </div>
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
      </div>
    </main>
  );
}

export default Display;
