import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { AuthProvide } from "./context/provider";

function App() {
  return (
    <>
      <AuthProvide>
        <Navbar />
        <main className="min-h-screen max-w-screen-2xl px-4 py-6 mx-auto">
          <Outlet />
        </main>
        <Footer />
      </AuthProvide>
    </>
  );
}

export default App;
