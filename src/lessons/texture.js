import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";
// freepbr.com -for free 3d models

export function renderTexture() {
  const scene = new THREE.Scene();
  const pane = new Pane();

  //   initialize the textureloader
  const textureLoader = new THREE.TextureLoader();

  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
  const planeGeometry = new THREE.PlaneGeometry(1, 1);
  const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);

  // initialize the texture
  const grassTexture = textureLoader.load(
    "/assets/textures/badlands-boulders-bl/badlands-boulders_albedo.png"
  );
  grassTexture.repeat.set(10, 10);
  grassTexture.wrapS = THREE.MirroredRepeatWrapping;
  grassTexture.wrapT = THREE.MirroredRepeatWrapping;

  //   initialize the material
  const material = new THREE.MeshBasicMaterial();
  // material.color = new THREE.Color("white");
  material.map = grassTexture;

  const plane = new THREE.Mesh(planeGeometry, material);

  scene.add(plane);

  //   initialize the light

  const camera = new THREE.PerspectiveCamera(
    20,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
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
    // scene.children.forEach((child) => {
    //   if (child instanceof THREE.Mesh) {
    //     child.rotation.y += 0.02;
    //   }
    // });

    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(renderloop);
  };

  renderloop();
}
