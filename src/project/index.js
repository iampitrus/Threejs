import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

// we are creating a solar system
export function renderProject() {
  // initialize the pane
  const pane = new Pane();

  // initialize the scene
  const scene = new THREE.Scene();

  // initialize the light
  const light = new THREE.AmbientLight(0xffffff, 1);
  scene.add(light);

  const pointLight = new THREE.PointLight(0xffffff, 200);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  // initialize the camera
  const camera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    0.1,
    400
  );
  camera.position.z = 10;

  // initialize the renderer
  const canvas = document.querySelector("canvas.threejs");
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // instantiate the controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // render the scene
  const renderloop = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(renderloop);
  };

  renderloop();
}
