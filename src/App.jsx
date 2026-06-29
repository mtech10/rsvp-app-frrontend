import React from "react";
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="min-h-screen bg-linear-to-t from-slate-50  to-blue-100">
      <Topbar />
      <Footer />
    </div>
  );
};

export default App;
