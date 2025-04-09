import Display from "./Pages/Display";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import PrivateRoute from "./utils/PrivateRoute";
import Register from "./Pages/Register";
import Navbar from "./Components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="/display" element={<Display />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
