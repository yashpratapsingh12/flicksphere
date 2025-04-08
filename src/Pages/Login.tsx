import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type data = {
  email: string;
  password: string;
};

const Login = () => {
  const { user, loginUser } = useAuth();

  const navigate = useNavigate();

  const form = useForm<data>();
  const { register, handleSubmit } = form;

  useEffect(() => {
    if (user) {
      navigate("/display");
    }
  }, [user]);

  const onSubmit = (data: data) => {
    const email = data.email;
    const password = data.password;
    const userInfo = {
      email,
      password,
    };
    loginUser(userInfo);
  };

  return (
    <div className="bg-blue-300">
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Email:</label>
            <input
              required
              type="email"
              {...register("email", { required: true })}
            />
          </div>

          <div>
            <label>Password:</label>
            <input
              type="password"
              {...register("password", { required: true })}
            />
          </div>
          <button>Submit</button>

          <div></div>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
