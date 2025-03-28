import { useState } from "react";
import hero from "./assets/hero.png";
import Search from "./Components/Search";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
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
        <Search />
      </div>
    </main>
  );
}

export default App;
