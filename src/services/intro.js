import * as THREE from "three";

export function renderCube() {
  const scene = new THREE.Scene();
  //  The Scene - Holds everything that can be viewable by the user

  // add objects to the scene
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red" });

  const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

  scene.add(cubeMesh);

  // The Camera - Determines what is viewed
  // inside camera - const camera = new THREE.PerspectiveCamera(fov,aspect-ratio,near,far)
  // fov -field of view, it's just like a zoom, it's measured in degree, the smaller the value, the more the zoom
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
  const renderer = new THREE.WebGLRenderer({ canvas });

  renderer.render(scene, camera);
}
