import background from "../assets/videoplayback.mp4";

const Home = () => {
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
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 text-white p-10">
       <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-xl shadow-lg text-white w-[90%] max-w-md">
                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                   <div>
                     <label>Email:</label>
                     <input
                       className="w-full px-4 py-2 rounded bg-white bg-opacity-20 text-white"
                       required
                       type="email"
                       {...register("email", { required: true })}
                     />
                   </div>
       
                   <div>
                     <label>Password:</label>
                     <input
                       className="w-full px-4 py-2 rounded bg-white bg-opacity-20 text-white"
                       type="password"
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

export default Home;