import searchIcon from "../assets/search.svg";
import { useEffect, useRef, useState } from "react";

type searchProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const Search: React.FC<searchProps> = ({ searchTerm, setSearchTerm }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [manualSearchTerm, setManual] = useState<string>(searchTerm);

  useEffect(() => {
    const handleSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleSize();
    window.addEventListener("resize", handleSize);
    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  const handleSearch = () => {
    setSearchTerm(manualSearchTerm);
  };

  const handleFocus = () => {
    inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex gap-2 bg-white px-4 py-3 rounded-lg mx-3 mt-10 max-w-2xl mx-auto ">
        <img src={searchIcon} alt="search" />
        <input
          ref={inputRef}
          placeholder="Search For Movie"
          value={searchTerm}
          onChange={(e) =>
            isMobile ? setManual(e.target.value) : setSearchTerm(e.target.value)
          }
          className=" outline-hidden"
          onFocus={handleFocus}
        />
      </div>
      <div className="w-full flex justify-center mt-4">
        {isMobile && (
          <button
            onClick={handleSearch}
            className="bg-blue-400 p-2 px-20 rounded text-white hover:bg-blue-800   "
          >
            Search
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
