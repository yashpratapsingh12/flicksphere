import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

type data = {
  name: string;
  email: string;
  password1: string;
  password2: string;
};

const Register = () => {
  const { registerUser, user } = useAuth();
  const navigate = useNavigate();

  const form = useForm<data>();

  const { handleSubmit, register } = form;

  useEffect(() => {
    if (user) {
      navigate("/display");
    }
  }, [user]);

  const onSubmit = (data: data) => {
    const name = data.name;
    const email = data.email;
    const password1 = data.password1;
    const password2 = data.password2;

    if (password1 != password2) {
      alert("confirm Pass");
      return;
    }

    const userInfo = {
      name,
      email,
      password1,
      password2,
    };
    registerUser(userInfo);
  };

  return (
    <div className="bg-blue-200">
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              placeholder="Enter name..."
              {...register("name", { required: true })}
            />
          </div>

          <div className="form-field-wrapper">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter email..."
              {...register("email", { required: true })}
            />
          </div>

          <div className="form-field-wrapper">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter password..."
              {...register("password1", { required: true })}
            />
          </div>

          <div className="form-field-wrapper">
            <label>Confirm Password:</label>
            <input
              type="password"
              placeholder="Confirm password..."
              {...register("password2", { required: true })}
            />
          </div>

          <div className="form-field-wrapper">
            <button>Submit</button>
          </div>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
