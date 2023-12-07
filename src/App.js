import { Suspense, lazy } from "react";
import "./style.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./component/Layout";

const Home = lazy(() => import("./page/Home"));
const SilverFactory = lazy(() => import("./page/SilverFactory"));
const Bricks = lazy(() => import("./page/Bricks"));
const Glass = lazy(() => import("./page/Glass"));
const Cloth = lazy(() => import("./page/Cloth"));
const Light = lazy(() => import("./page/Light"));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<div style={{ height: "100vh" }}></div>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/project/silverfactory"
            element={
              <Suspense fallback={<div style={{ height: "100vh" }}></div>}>
                <SilverFactory />
              </Suspense>
            }
          />
          <Route
            path="/project/bricks"
            element={
              <Suspense fallback={<div style={{ height: "100vh" }}></div>}>
                <Bricks />
              </Suspense>
            }
          />
          <Route
            path="/project/glass"
            element={
              <Suspense fallback={<div style={{ height: "100vh" }}></div>}>
                <Glass />
              </Suspense>
            }
          />
          <Route
            path="/project/cloth"
            element={
              <Suspense fallback={<div style={{ height: "100vh" }}></div>}>
                <Cloth />
              </Suspense>
            }
          />
          <Route
            path="/project/light"
            element={
              <Suspense fallback={<div style={{ height: "100vh" }}></div>}>
                <Light />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
