import pause from "../assets/pause.png";
import threedot from "../assets/threedot-icon.png";
import statistics from "../assets/statistics-icon.png";
import settings from "../assets/settings-icon.png";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4">
      <div className="flex gap-3">
        <button className="glass-btn">
          <img src={pause} alt="" />
        </button>
        <button className="glass-btn">🏆 Lv 1</button>
      </div>

      <input
        className="glass-btn w-96 text-center"
        placeholder="Distracted? Leave Your Thoughts.."
      />

      <div className="flex gap-3">
        <button className="glass-btn">
          <img src={threedot} alt="" />
        </button>
        <button className="glass-btn">
          <img src={statistics} alt="" />
        </button>
        <button className="glass-btn">
          <img src={settings} alt="" />
        </button>
      </div>
    </nav>
  );
}
