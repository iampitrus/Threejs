import { useEffect } from "react";
import "./App.css";
import { renderTexture } from "./lessons/texture";

function App() {
  useEffect(() => {
    renderTexture();
  }, []);

  return <canvas className="threejs"></canvas>;
}

export default App;
