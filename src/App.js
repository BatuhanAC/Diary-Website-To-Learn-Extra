import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "components/Login/Login";
import SignUp from "components/SignUp/SignUp"
import Forgot from "components/Forgot/Forgot";
import NoMatch from "components/NoMatch/NoMatch";
import Suspense from "components/Suspense/Suspense";
import Verify from "components/Verify/Verify";
import { AnimatePresence } from "framer-motion";
const LazyPages = React.lazy(() => import('components/Pages/Pages'))
const LazyPage = React.lazy(() => import('components/Page/Page'))
function App() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.key} >
          <Route path="/" element={<Login/>} />

          <Route path="Pages" element={<React.Suspense fallback={<Suspense/>} ><LazyPages/></React.Suspense>} />

          <Route path="Page" element={<React.Suspense fallback={<Suspense/>}><LazyPage/></React.Suspense>} >
            <Route path=":date" element={<React.Suspense fallback={<Suspense/>}><LazyPage/></React.Suspense>}/>
          </Route>

          <Route path="SignUp" element={<SignUp/>} />

          <Route path="Forgot" element={<Forgot/>} />

          <Route path="Verify" element={<Verify/>} />

          <Route path="*" element={<NoMatch/>} />
        </Routes>
      </AnimatePresence>
    </>
  );
} 

export default App;
