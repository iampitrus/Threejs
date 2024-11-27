import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

export function renderTexture() {
  const scene = new THREE.Scene();
  const pane = new Pane();

  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
  const planeGeometry = new THREE.PlaneGeometry(1, 1);
  const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);

  //   initialize the material
  const material = new THREE.MeshPhysicalMaterial();
  material.color = new THREE.Color("green");

  const mesh = new THREE.Mesh(cubeGeometry, material);
  const torus = new THREE.Mesh(torusKnotGeometry, material);
  torus.position.x = 1.5;

  const plane = new THREE.Mesh(planeGeometry, material);
  plane.position.x = -1.5;

  const sphere = new THREE.Mesh();
  sphere.geometry = sphereGeometry;
  sphere.material = material;
  sphere.position.y = 1.5;

  const cylinder = new THREE.Mesh();
  cylinder.geometry = cylinderGeometry;
  cylinder.material = material;
  cylinder.position.y = -1.5;

  scene.add(mesh, torus, plane, sphere, cylinder);

  //   initialize the light
  const light = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(light);

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
    // make everything rotate
    scene.children.forEach((child) => {
      if (child instanceof THREE.Mesh) {
        child.rotation.x += 0.05;
      }
    });

    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(renderloop);
  };

  renderloop();
}
