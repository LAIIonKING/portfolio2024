import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="bg-gradient-to-r from-main-green from-0% via-main-blue via-35% to-sub-blue to-90% ">
      <Navbar />
      <Outlet />
    </div>
  );
}
