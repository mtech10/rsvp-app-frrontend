import React from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";
import DiscoverEvents from "./pages/DiscoverEvents";

const App = () => {
  return (
    <div className="min-h-screen bg-linear-to-t from-slate-50 to-blue-100">
      <Topbar />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Routes>
          <Route path="/" element={<DiscoverEvents />} />
          <Route path="/discover" element={<DiscoverEvents />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
