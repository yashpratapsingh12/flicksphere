import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import videobg from "../assets/videoplayback (1) (1).mp4";

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
    <div className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={videobg} type="video/mp4" />
      </video>
      <div className="relative flex flex-col items-center justify-center h-screen p-6 backdrop-blur-md">
        <h1 className="text-6xl  font-under font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mt-40">
          Register
        </h1>
        <div className="backdrop-blur-md p-8 rounded-xl shadow-lg mb-30 text-white mt-10 ">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label>Name:</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded bg-white  text-black"
                placeholder="Enter name..."
                {...register("name", { required: true })}
              />
            </div>

            <div>
              <label>Email:</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded bg-white  text-black"
                placeholder="Enter email..."
                {...register("email", { required: true })}
              />
            </div>

            <div>
              <label>Password:</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded bg-white  text-black"
                placeholder="Enter password..."
                {...register("password1", { required: true })}
              />
            </div>

            <div className="form-field-wrapper">
              <label>Confirm Password:</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded bg-white  text-black"
                placeholder="Confirm password..."
                {...register("password2", { required: true })}
              />
            </div>

            <div>
              <button className="w-full bg-blue-500 hover:bg-blue-600 py-2 mt-2 rounded text-white">
                Submit
              </button>
            </div>
          </form>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link className="text-blue-300 underline" to="/">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
