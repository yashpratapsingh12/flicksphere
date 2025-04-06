import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const logoutClick = () => {
    navigate("/");
  };
  return (
    <div className=" flex flex-row  justify-end gap-5 max-w-6xl mx-auto  bg-teal-950 p-3 text-white font-bold rounded-lg">
      {user ? (
        <>
          <NavLink to="Home" className="text-white">
            Home
          </NavLink>
          <NavLink to="Display" className="text-white">
            Movies
          </NavLink>
          <button onClick={logoutClick} className="btn">
            Logout
          </button>
        </>
      ) : (
        <NavLink to="login">LogIn</NavLink>
      )}
    </div>
  );
};

export default Navbar;
