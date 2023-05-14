import { ToastContainer } from "react-toastify";
import Register from "./pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import CreateTransaction from "./pages/CreateTransaction";
import EntryItem from "./components/EntryItem";
import EntryPage from "./pages/EntryPage";
import Footer from "./components/Footer";
import UpdateTransaction from "./pages/UpdateTransaction";

function App() {
  return (
    <div className="w-full h-screen bg-[#F6F6F6] mx-auto scrollbar-hide">
      <Router>
        <Navbar />
        <div className="w-[90%] mx-auto h-full">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="/create" element={<PrivateRoute />}>
              <Route path="/create" element={<CreateTransaction />} />
            </Route>
            <Route path="/transaction/:id" element={<PrivateRoute />}>
              <Route path="/transaction/:id" element={<EntryPage />} />
            </Route>
            <Route path="/transaction/update/:id" element={<PrivateRoute />}>
              <Route
                path="/transaction/update/:id"
                element={<UpdateTransaction />}
              />
            </Route>
          </Routes>
        </div>
        <Footer />
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
