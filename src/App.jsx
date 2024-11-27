import { useEffect } from "react";
import "./App.css";
import { renderCube } from "./services/intro";
import { renderBuffer } from "./services/buffer";
import { renderMaterial } from "./services/material";

function App() {
  useEffect(() => {
    // renderCube();
    renderMaterial();
  }, []);

  return <canvas className="threejs"></canvas>;
}

export default App;
