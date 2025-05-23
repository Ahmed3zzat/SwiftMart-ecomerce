import React, { useEffect, useState } from "react";
import Style from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-14 p-10">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
