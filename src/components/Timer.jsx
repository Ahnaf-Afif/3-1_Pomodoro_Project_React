// import { useEffect, useState } from "react";

// export default function Timer() {
//   const [secondsLeft, setSecondsLeft] = useState(25 * 60);
//   const [running, setRunning] = useState(false);

//   useEffect(() => {
//     if (!running) return;

//     const interval = setInterval(() => {
//       setSecondsLeft((prev) => {
//         if (prev === 0) {
//           clearInterval(interval);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [running]);

//   const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
//   const seconds = String(secondsLeft % 60).padStart(2, "0");

//   return (
//     <div className="flex-1 flex flex-col items-center justify-center">
//       <div className="text-[18rem] font-bold">
//         {minutes}:{seconds}
//       </div>

//       <button
//         onClick={() => setRunning(!running)}
//         className="glass-btn mt-6 text-xl"
//       >
//         {running ? "Pause" : "Start"}
//       </button>
//     </div>
//   );
// }

import { useEffect, useState } from "react";

export default function Timer() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [orientation, setOrientation] = useState("portrait"); // Current orientation track korar jonno

  // 1. Timer Logic (Proti second e kombe)
  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  // 2. Gyroscope/Orientation Logic (Phone ghurale timer change hobe)
  useEffect(() => {
    const handleOrientation = (event) => {
      const { beta, gamma } = event;
      let newOrientation = orientation;

      // Direction detect korar logic
      if (beta > 45 && Math.abs(gamma) < 30) {
        newOrientation = "portrait"; // Soja
      } else if (Math.abs(beta) < 30 && gamma > 45) {
        newOrientation = "landscape-right"; // Dane
      } else if (Math.abs(beta) < 30 && gamma < -45) {
        newOrientation = "landscape-left"; // Bame
      } else if (beta < -45 && Math.abs(gamma) < 30) {
        newOrientation = "upside-down"; // Ulto
      }

      // Sudhu jodi orientation change hoy, tobei timer set hobe
      if (newOrientation !== orientation) {
        setOrientation(newOrientation);
        setRunning(true); // Mode change hole timer pause kora bhalo

        if (newOrientation === "portrait") setSecondsLeft(25 * 60);
        else if (newOrientation === "landscape-right") setSecondsLeft(50 * 60);
        else if (newOrientation === "landscape-left") setSecondsLeft(5 * 60);
        else if (newOrientation === "upside-down") setSecondsLeft(10 * 60);
      }
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () =>
      window.removeEventListener("deviceorientation", handleOrientation);
  }, [orientation]);

  // Time format korar logic
  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  const rotationClasses = {
    portrait: "rotate-0",
    "landscape-right": "-rotate-90 scale-90", // ডানে ৯০ ডিগ্রি
    "landscape-left": "rotate-90 scale-90", // বামে ৯০ ডিগ্রি
    "upside-down": "rotate-180", // ১৮০ ডিগ্রি উল্টো
  };

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${rotationClasses[orientation]}`}
    >
      {/* Bortoman orientation screen e dekhabe (testing er jonno bhalo) */}
      <p className="text-white/50 mb-4 uppercase tracking-widest">
        {orientation}
      </p>

      <div className="text-[18rem] font-bold leading-none">
        {minutes}:{seconds}
      </div>

      <button
        onClick={() => setRunning(!running)}
        className="glass-btn mt-12 text-2xl px-12 py-4"
      >
        {running ? "PAUSE" : "START"}
      </button>

      <button
        onClick={() => setSecondsLeft(25 * 60)}
        className="mt-4 text-white/30 hover:text-white transition-colors"
      >
        Reset Timer
      </button>
    </div>
  );
}
