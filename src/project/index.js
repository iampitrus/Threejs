import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

// we are creating a solar system
export function renderProject() {
  // initialize the pane
  const pane = new Pane();

  // initialize the scene
  const scene = new THREE.Scene();

  // add textureLoader
  const textureLoader = new THREE.TextureLoader();

  // add textures
  const sunTexture = textureLoader.load("assets/textures/2k_sun.jpg");
  //   sunTexture.colorSpace = THREE.SRGBColorSpace;
  const mercuryTexture = textureLoader.load("assets/textures/2k_mercury.jpg");
  //   mercuryTexture.colorSpace = THREE.SRGBColorSpace;
  const venusTexture = textureLoader.load(
    "assets/textures/2k_venus_surface.jpg"
  );
  //   venusTexture.colorSpace = THREE.SRGBColorSpace;
  const earthTexture = textureLoader.load(
    "assets/textures/2k_earth_daymap.jpg"
  );
  //   earthTexture.colorSpace = THREE.SRGBColorSpace;
  const marsTexture = textureLoader.load("assets/textures/2k_mars.jpg");
  //   marsTexture.colorSpace = THREE.SRGBColorSpace;
  const moonTexture = textureLoader.load("assets/textures/2k_moon.jpg");
  //   moonTexture.colorSpace = THREE.SRGBColorSpace;

  //   add materials
  const mercuryMaterial = new THREE.MeshStandardMaterial({
    map: mercuryTexture,
  });
  const venusMaterial = new THREE.MeshStandardMaterial({
    map: venusTexture,
  });
  const earthMaterial = new THREE.MeshStandardMaterial({
    map: earthTexture,
  });
  const marsMaterial = new THREE.MeshStandardMaterial({
    map: marsTexture,
  });
  const moonMaterial = new THREE.MeshStandardMaterial({
    map: moonTexture,
  });

  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
  const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });

  const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
  sun.scale.setScalar(5);
  scene.add(sun);

  const planets = [
    {
      name: "Mercury",
      radius: 0.5,
      distance: 10,
      speed: 0.01,
      material: mercuryMaterial,
      moons: [],
    },
    {
      name: "Venus",
      radius: 0.8,
      distance: 15,
      speed: 0.007,
      material: venusMaterial,
      moons: [],
    },
    {
      name: "Earth",
      radius: 1,
      distance: 20,
      speed: 0.005,
      material: earthMaterial,
      moons: [
        {
          name: "Moon",
          radius: 0.3,
          distance: 3,
          speed: 0.015,
        },
      ],
    },
    {
      name: "Mars",
      radius: 0.7,
      distance: 25,
      speed: 0.003,
      material: marsMaterial,
      moons: [
        {
          name: "Phobos",
          radius: 0.1,
          distance: 2,
          speed: 0.02,
        },
        {
          name: "Deimos",
          radius: 0.2,
          distance: 3,
          speed: 0.015,
          color: 0xffffff,
        },
      ],
    },
  ];

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
  camera.position.z = 100;
  camera.position.y = 5;

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
