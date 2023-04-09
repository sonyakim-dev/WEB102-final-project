import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./routes/NavBar";
import Home from "./routes/Home";
import Event from "./routes/Event";
import Create from "./routes/Create";
import Posts from "./routes/Posts";
import styles from "./style";

function App() {
  return (
    <div className="w-full overflow-hidden pb-10">
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index path="/" element={<Home />} />
            <Route path="/event/:id" element={<Event />} />
            <Route path="/create" element={<Create />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="*" element={<div>Error</div>} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
