import Display from "./Pages/Display";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import PrivateRoute from "./utils/PrivateRoute";
import Register from "./Pages/Register";
import { useAuth } from "./utils/AuthContext";
import Spinner from "./Components/Spinner";

const App = () => {
  const { loading } = useAuth();
  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      ) : (
        <>
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<PrivateRoute />}>
              <Route path="/display" element={<Display />} />
            </Route>
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
