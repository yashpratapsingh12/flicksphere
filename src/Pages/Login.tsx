import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import videobg from "../assets/videoplayback.mp4";

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
    <div className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src={videobg} type="video/mp4" />
      </video>

      <div className=" flex flex-col items-center justify-center h-screen  backdrop-blur-md p-6 rounded-lg">
        <h1 className="text-6xl   mb-10 font-under font-bold text-white ">
          FlickSphere
        </h1>

        <div className=" bg-opacity-50 backdrop-blur-md p-8 rounded-xl shadow-lg text-white">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label>Email:</label>
              <input
                className="w-full px-4 py-2 rounded bg-white  text-black"
                required
                placeholder="Email"
                type="email"
                {...register("email", { required: true })}
              />
            </div>

            <div>
              <label>Password:</label>
              <input
                className="w-full px-4 py-2 rounded bg-white  text-black"
                type="password"
                placeholder="password"
                {...register("password", { required: true })}
              />
            </div>

            <button className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded">
              Submit
            </button>
          </form>

          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <Link className="text-blue-300 underline" to="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
