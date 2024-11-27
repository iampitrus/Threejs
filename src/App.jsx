import { useEffect } from "react";
import "./App.css";
import { renderCube } from "./services/intro";
import { renderBuffer } from "./services/buffer";

function App() {
  useEffect(() => {
    // renderCube();
    renderBuffer();
  }, []);

  return <canvas className="threejs"></canvas>;
}

export default App;
