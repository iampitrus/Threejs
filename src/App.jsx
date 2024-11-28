import { useEffect } from "react";
import "./App.css";
import { renderProject } from "./project";

function App() {
  useEffect(() => {
    renderProject();
  }, []);

  return <canvas className="threejs"></canvas>;
}

export default App;
