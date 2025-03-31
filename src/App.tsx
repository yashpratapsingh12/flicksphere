import { useState } from "react";
import hero from "./assets/hero.png";
import Search from "./Components/Search";
import { FetchData } from "./utils/FetchData";
import { useEffect } from "react";

const API_BASE_URL: string = "https://api.themoviedb.org/3";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const data = FetchData(
          `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
        );
        console.log(data);
      } catch (error) {
        console.error(`Error fetching movies :${error}`);
        setErrorMessage("Error Fetching Movies .Please Try Again");
      }
    };
    fetchMovieData();
  }, []);
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
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
    </main>
  );
}

export default App;
