import { Suspense, lazy } from 'react';
import './style.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './component/Layout';

const Home = lazy(() => import('./page/Home'));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<div style={{ height: '100vh' }}></div>}>
                <Home />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
