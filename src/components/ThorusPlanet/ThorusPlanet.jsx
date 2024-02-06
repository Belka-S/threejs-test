import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useEffect, useRef } from 'react';

import spaceBg from 'assets/images/space.jpg';
import moonBg from 'assets/images/moon.jpg';
import surfaceBg from 'assets/images/surface.jpg';

const ThorusPlanet = () => {
  const refPlanet = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    refPlanet.current && refPlanet.current.appendChild(renderer.domElement);

    camera.position.setZ(60);
    // camera.position.setZ(1.5);
    // camera.position.setY(0);
    // camera.position.setX(-1.5);

    const controls = new OrbitControls(camera, renderer.domElement);

    const pointLight = new THREE.PointLight(0xffffff);
    const ambientLight = new THREE.AmbientLight(0xffffff);

    scene.add(pointLight, ambientLight);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      // thorus.rotation.x += 0.001;
      // thorus.rotation.y += 0.005;
      // thorus.rotation.z += 0.001;
      controls.update();
    };

    animate();

    // background
    const spaceTexture = new THREE.TextureLoader().load(spaceBg);
    scene.background = spaceTexture;

    // thorus
    const addThorus = () => {
      const geometry = new THREE.TorusGeometry(6, 2, 16, 100);
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
      });
      const thorus = new THREE.Mesh(geometry, material);

      thorus.rotateY(Math.PI / 2);
      thorus.position.set(-25, 0, 0);

      scene.add(thorus);
    };

    addThorus();

    // sphere
    const addSphere = () => {
      const geometry = new THREE.SphereGeometry(0.25, 4, 4);
      const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const sphere = new THREE.Mesh(geometry, material);

      const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100));

      sphere.position.set(x, y, z);

      scene.add(sphere);
    };

    Array(400).fill().forEach(addSphere);

    // moon
    const addMoon = () => {
      const geometry = new THREE.SphereGeometry(12, 32, 32);
      const moonTexture = new THREE.TextureLoader().load(moonBg);
      const normalTexture = new THREE.TextureLoader().load(surfaceBg);
      const material = new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture,
      });

      const moon = new THREE.Mesh(geometry, material);

      scene.add(moon);
    };

    addMoon();
  }, []);

  return <div ref={refPlanet}></div>;
};

export default ThorusPlanet;
