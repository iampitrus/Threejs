import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function renderMaterial() {
  const scene = new THREE.Scene();

  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
  const planeGeometry = new THREE.PlaneGeometry(1, 1);

  //   const material = new THREE.MeshLambertMaterial();
  const material = new THREE.MeshPhongMaterial();
  material.shininess = 100;
  material.color = new THREE.Color("red");

  const mesh = new THREE.Mesh(cubeGeometry, material);
  const mesh2 = new THREE.Mesh(torusKnotGeometry, material);
  const plane = new THREE.Mesh(planeGeometry, material);

  mesh2.position.x = 1.5;
  plane.position.x = -1.5;

  scene.add(mesh);
  scene.add(mesh2);
  scene.add(plane);

  //   initialize the light
  const light = new THREE.AmbientLight(0xffffff, 0.1);
  //   scene.add(light);

  const pointLight = new THREE.PointLight(0xffffff, 50);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  const camera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    0.1,
    200
  );

  // shift the camera back on the z axis
  camera.position.z = 5;

  // Renderer - combines the scene and the camera to display info
  const canvas = document.querySelector("canvas.threejs");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);

  const maxPixelRatio = Math.min(window.devicePixelRatio, 1.5);
  renderer.setPixelRatio(maxPixelRatio);

  // we have orbitControl, pointerLockControl, trackballControls, dragControls

  // Initialize the orbit controls
  const controls = new OrbitControls(camera, canvas);
  //   controls.autoRotate = true;
  controls.enableDamping = true;

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // incharge of triggering a render when we have a new image
  // window.requestAnimationFrame(renderloop);
  const renderloop = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(renderloop);
  };

  renderloop();
}
