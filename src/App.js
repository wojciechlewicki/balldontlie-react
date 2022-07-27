import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";

import Home from "./pages/Home";
import Players from "./pages/Players";
import Teams from "./pages/Teams";
import Games from "./pages/Games";
import NotFound404 from "./pages/NotFound404"

function App() {
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/players" element={<Players />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/games" element={<Games />} />
        <Route path="/*" element={<NotFound404 />} />
      </Routes>
    </Fragment>
  );
}

export default App;
