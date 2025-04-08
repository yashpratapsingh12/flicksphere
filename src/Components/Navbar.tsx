import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
const Navbar = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();

  const logoutClick = () => {
    navigate("/");
  };
  return (
    <div className=" flex flex-row  justify-end gap-5 max-w-6xl mx-auto  bg-teal-950 p-3 text-white font-bold rounded-lg">
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
          <NavLink to="/" className="text-white">
            Home
          </NavLink>
          <NavLink to="/login">LogIn</NavLink>
        </>
      )}
    </div>
  );
};

export default Navbar;
