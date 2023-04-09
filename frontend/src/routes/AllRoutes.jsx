import React from "react";
import { Route, Routes } from "react-router-dom";
import Products from "../pages/Products";
import Login from "../pages/Login";
import AddProduct from "../pages/AddProduct";
import SingleProduct from "../pages/SingleProduct";
import Signup from "../pages/Signup";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/add" element={<AddProduct />} />
      <Route path="/singleProduct/:id" element={<SingleProduct />} />
    </Routes>
  );
};

export default AllRoutes;
