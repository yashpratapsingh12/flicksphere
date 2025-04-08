
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { useEffect, useRef } from "react";

const Login = () => {
  const { user, loginUser } = useAuth();
  const navigate = useNavigate();
  const logininForm = useRef(null);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = logininForm.current.email.value;
    const password = logininForm.current.password.value;

    const userInfo = {
      email,
      password,
    };
    loginUser(userInfo);
  };

  return (
    <div className="bg-blue-300">
      <div>
        <form ref={logininForm} onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              required
              type="email"
              name="email"
              placeholder="Enter email..."
            />
          </div>

          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password..."
            />
          </div>

          <div>
            <input type="submit" value="Login" className="btn" />
          </div>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
