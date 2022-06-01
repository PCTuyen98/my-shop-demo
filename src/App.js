import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Product from "./views/Product";
import About from "./views/About";
import Navbar from "./components/Navbar";
import "./assets/App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/products/:id" element={<Product/>} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
