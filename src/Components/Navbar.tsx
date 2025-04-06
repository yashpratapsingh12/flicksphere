import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div className=" flex flex-row  justify-end gap-5 max-w-6xl mx-auto  bg-teal-950 p-3 text-white font-bold rounded-lg">
      <NavLink to="/">Login</NavLink>
      <NavLink to="Home" className="text-white">
        Home
      </NavLink>
      <NavLink to="Display" className="text-white">
        Movies
      </NavLink>
    </div>
  );
};

export default Navbar;
