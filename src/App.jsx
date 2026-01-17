import Navbar from "./components/Navbar";
import Timer from "./components/Timer";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <Timer />
      <Footer />
    </div>
  );
}
