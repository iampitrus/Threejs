import { useEffect } from "react";
import "./App.css";
import { renderCube } from "./services/intro";

function App() {
  useEffect(() => {
    renderCube();
  }, []);

  return <canvas className="threejs"></canvas>;
}

export default App;
