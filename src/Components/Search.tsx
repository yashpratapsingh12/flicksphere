import searchIcon from "../assets/search.svg";

type searchProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const Search: React.FC<searchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="w-full bg-white px-4 py-3 rounded-lg mx-3 mt-10 max-w-2xl mx-auto">
      <div className="flex gap-2">
        <img src={searchIcon} alt="search" />
        <input
          placeholder="Search For Movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className=" outline-hidden"
        />
      </div>
    </div>
  );
};

export default Search;
