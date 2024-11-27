import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function renderMaterial() {
  const scene = new THREE.Scene();

  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const planeGeometry = new THREE.PlaneGeometry(1, 1);

  const material = new THREE.MeshBasicMaterial();

  material.color = new THREE.Color(0x00ff00);
  //   material.transparent = true;
  //   material.opacity = 0.5;
  material.side = THREE.DoubleSide;

  const fog = new THREE.Fog(0xffffff, 1, 10);
  scene.fog = fog;
  scene.background = new THREE.Color(0xffffff);

  const mesh = new THREE.Mesh(cubeGeometry, material);
  const mesh2 = new THREE.Mesh(cubeGeometry, material);
  const mesh3 = new THREE.Mesh(planeGeometry, material);

  mesh2.position.x = 1.5;
  mesh3.position.x = -1.5;

  scene.add(mesh);
  scene.add(mesh2);
  scene.add(mesh3);

  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    30
  );

  // shift the camera back on the z axis
  camera.position.z = 5;

  // Renderer - combines the scene and the camera to display info
  const canvas = document.querySelector("canvas.threejs");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);

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
