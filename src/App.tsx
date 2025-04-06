import Home from "./Pages/Home";
import Display from "./Pages/Display";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import PrivateRoute from "./utils/PrivateRoute";
import Register from "./Pages/Register";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="Regiter" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="home" element={<Home />} />
          <Route path="Display" element={<Display />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
