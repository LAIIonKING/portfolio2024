import { Suspense, lazy } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./component/Layout";

const Home = lazy(() => import("./page/Home"));
const Project = lazy(() => import("./page/Project"));

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
            path="/project/:title"
            element={
              <Suspense fallback={<div style={{ height: "100vh" }}></div>}>
                <Project />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
