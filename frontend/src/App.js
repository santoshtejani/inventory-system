import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home, Product, Add, Login} from "./pages";

function App() {

  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route  path="/products/:id" element={<Product />} />
        <Route  path="/add" element={<Add />} />
      </Routes>
    </>
  );
}

export default App;
