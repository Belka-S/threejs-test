import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useEffect, useRef } from 'react';

import spaceBg from 'assets/space.jpg';
import moonBg from 'assets/moon.jpg';

const Three = () => {
  const refContainer = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    refContainer.current &&
      refContainer.current.appendChild(renderer.domElement);

    camera.position.setZ(60);

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

      thorus.position.set(0, 0, 25);

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

    Array(200).fill().forEach(addSphere);

    // moon
    const addMoon = () => {
      const moonTexture = new THREE.TextureLoader().load(moonBg);

      const moon = new THREE.Mesh(
        new THREE.SphereGeometry(12, 32, 32),
        new THREE.MeshStandardMaterial({ map: moonTexture }),
      );

      scene.add(moon);
    };

    addMoon();
  }, []);

  return <div ref={refContainer}></div>;
};

export default Three;
