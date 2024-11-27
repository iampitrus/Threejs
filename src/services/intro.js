import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function renderCube() {
  const scene = new THREE.Scene();
  //  The Scene - Holds everything that can be viewable by the user

  // add objects to the scene
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red" });

  const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
  const cubeMesh2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
  const cubeMesh3 = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cubeMesh2.position.y = 1.5;
  cubeMesh3.position.x = -1;

  // const group = new THREE.Group();
  // group.add(cubeMesh);
  // group.add(cubeMesh2);
  // group.add(cubeMesh3);

  // group.position.y = 1;

  // scene.add(group);

  //   cubeMesh.position.y = -1;
  const axesHelper = new THREE.AxesHelper(2);
  cubeMesh.add(axesHelper);

  scene.add(cubeMesh);
  scene.add(cubeMesh2);
  // The Camera - Determines what is viewed
  // inside camera - const camera = new THREE.PerspectiveCamera(fov,aspect-ratio,near,far)
  // fov - field of view, it's just like a zoom, it's measured in degree, the smaller the value, the more the zoom
  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    30
  );

  //   const aspectRatio = window.innerWidth / window.innerHeight;

  //   const camera = new THREE.OrthographicCamera(
  //     -1 * aspectRatio,
  //     1 * aspectRatio,
  //     1,
  //     -1,
  //     0.1,
  //     200
  //   );

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

  // initialize the clock
  const clock = new THREE.Clock();
  let previousTime = 0;

  // incharge of triggering a render when we have a new image
  // window.requestAnimationFrame(renderloop);
  const renderloop = () => {
    const currentTime = clock.getElapsedTime();
    const delta = currentTime - previousTime;
    previousTime = currentTime;

    cubeMesh.rotation.y += THREE.MathUtils.degToRad(1) * delta * 20;
    // cubeMesh.rotation.y += THREE.MathUtils.degToRad(0.1);
    cubeMesh2.scale.x = Math.sin(currentTime) * 0.5 + 2;

    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(renderloop);
  };

  renderloop();
}
