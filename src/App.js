import { Suspense, lazy } from "react";
import "./style.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./component/Layout";

const Home = lazy(() => import("./page/Home"));
const SilverFactory = lazy(() => import("./page/SilverFactory"));
const Bricks = lazy(() => import("./page/Bricks"));

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
        </Route>
      </Routes>
    </>
  );
}

export default App;
