import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Edit from './components/Edit';
import Details from './components/Details';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/view/:id" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
