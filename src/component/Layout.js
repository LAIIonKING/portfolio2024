import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="bg-slate-950 min-h-screen p-8">
      <Navbar />
      <Outlet />
    </div>
  );
}
