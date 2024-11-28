import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

// we are creating a solar system
export function renderProject() {
  // initialize the pane
  const pane = new Pane();

  // initialize the scene
  const scene = new THREE.Scene();

  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
  const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xfff700 });

  const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
  sun.scale.setScalar(5);
  scene.add(sun);

  const earthMaterial = new THREE.MeshBasicMaterial({ color: "blue" });
  const earth = new THREE.Mesh(sphereGeometry, earthMaterial);
  earth.position.x = 10;
  scene.add(earth);

  const moonMaterial = new THREE.MeshBasicMaterial({ color: "grey" });
  const moon = new THREE.Mesh(sphereGeometry, moonMaterial);
  moon.scale.setScalar(0.3);
  moon.position.x = 2;
  earth.add(moon);

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
  camera.position.y = 100;
  camera.position.z = 5;

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

  //   initialize the clock
  const clock = new THREE.Clock();
  const solarOrbitRadius = 10;
  const moonOrbitRadius = 2;
  // render the scene
  const renderloop = () => {
    const elapsedTime = clock.getElapsedTime();

    // add animation here
    earth.rotation.y += 0.01;

    earth.position.x = Math.sin(elapsedTime) * solarOrbitRadius;
    earth.position.z = Math.cos(elapsedTime) * solarOrbitRadius;

    moon.position.x = Math.sin(elapsedTime) * moonOrbitRadius;
    moon.position.z = Math.cos(elapsedTime) * moonOrbitRadius;

    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(renderloop);
  };

  renderloop();
}
