import { NavLink } from "react-router-dom";

import { useAuth } from "../utils/AuthContext";
const Navbar = () => {
  const { user, logoutUser } = useAuth();

  return (
    <div className=" flex flex-row  justify-end gap-5 max-w-6xl mx-auto  bg-blue-100 p-3 text-white font-bold rounded-lg">
      {user ? (
        <>
          <NavLink to="/display" className="text-white">
            Movies
          </NavLink>
          <button onClick={logoutUser} className="btn">
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to="/">LogIn</NavLink>
        </>
      )}
    </div>
  );
};

export default Navbar;
