import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";
// freepbr.com -for free 3d models

export function renderTexture() {
  const scene = new THREE.Scene();
  const pane = new Pane();

  //   initialize the textureloader
  const textureLoader = new THREE.TextureLoader();

  // initialize the geometry
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const uvCube = new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2);
  cubeGeometry.setAttribute("uv2", uvCube);

  const knotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
  const uvKnot = new THREE.BufferAttribute(knotGeometry.attributes.uv.array, 2);
  knotGeometry.setAttribute("uv2", uvKnot);

  const planeGeometry = new THREE.PlaneGeometry(1, 1);
  const uvPlane = new THREE.BufferAttribute(
    planeGeometry.attributes.uv.array,
    2
  );
  planeGeometry.setAttribute("uv2", uvPlane);

  const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const uvSphere = new THREE.BufferAttribute(
    sphereGeometry.attributes.uv.array,
    2
  );
  sphereGeometry.setAttribute("uv2", uvSphere);

  const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
  const uvCylinder = new THREE.BufferAttribute(
    cylinderGeometry.attributes.uv.array,
    2
  );
  cylinderGeometry.setAttribute("uv2", uvCylinder);

  // initialize the texture
  const grassAlbedo = textureLoader.load(
    "/assets/textures/whispy-grass-meadow-bl/wispy-grass-meadow_albedo.png"
  );
  const grassAo = textureLoader.load(
    "/assets/textures/whispy-grass-meadow-bl/wispy-grass-meadow_ao.png"
  );
  const grassHeight = textureLoader.load(
    "/assets/textures/whispy-grass-meadow-bl/wispy-grass-meadow_height.png"
  );
  const grassMetallic = textureLoader.load(
    "/assets/textures/whispy-grass-meadow-bl/wispy-grass-meadow_metallic.png"
  );
  const grassNormal = textureLoader.load(
    "/assets/textures/whispy-grass-meadow-bl/wispy-grass-meadow_normal-ogl.png"
  );
  const grassRoughness = textureLoader.load(
    "/assets/textures/whispy-grass-meadow-bl/wispy-grass-meadow_roughness.png"
  );

  //   initialize the material
  const material = new THREE.MeshStandardMaterial();
  material.map = grassAlbedo;
  material.roughnessMap = grassRoughness;
  material.metalnessMap = grassMetallic;
  material.normalMap = grassNormal; // simulate rough area, so it looks rough
  material.displacementMap = grassHeight; // change shape
  material.displacementScale = 0.1;
  material.aoMap = grassAo; // help shadow cast on objects close

  const cube = new THREE.Mesh(cubeGeometry, material);

  const plane = new THREE.Mesh(planeGeometry, material);
  plane.position.x = -1.5;

  const knot = new THREE.Mesh(knotGeometry, material);
  knot.position.x = 1.5;

  const cylinder = new THREE.Mesh(cylinderGeometry, material);
  cylinder.position.y = -1.5;

  const sphere = new THREE.Mesh(sphereGeometry, material);
  sphere.position.y = 1.5;

  scene.add(plane, knot, cube, sphere, cylinder);

  // initialize the light
  const camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    0.01,
    2000
  );

  // shift the camera back on the z axis
  camera.position.z = 5;

  // light
  const light = new THREE.AmbientLight("white", 0.5);
  scene.add(light);

  const pointLight = new THREE.PointLight("white", 2);
  pointLight.position.z = 1;
  pointLight.position.x = 1;
  pointLight.position.y = 1;

  scene.add(pointLight);

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
