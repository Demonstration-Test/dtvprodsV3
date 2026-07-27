import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroLens({ paused }: { paused: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.z = 7;
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    host.append(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);
    const materials = [
      new THREE.MeshBasicMaterial({
        color: 0x2d6bff,
        transparent: true,
        opacity: 0.22,
        wireframe: true,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x7b2cbf,
        transparent: true,
        opacity: 0.18,
        wireframe: true,
      }),
      new THREE.MeshBasicMaterial({
        color: 0xf4f0e8,
        transparent: true,
        opacity: 0.09,
        wireframe: true,
      }),
    ];
    [2.55, 2.05, 1.58].forEach((radius, index) => {
      const geometry = new THREE.TorusGeometry(radius, 0.035, 8, 96);
      const ring = new THREE.Mesh(geometry, materials[index]);
      ring.rotation.x = index * 0.35;
      ring.rotation.y = index * 0.25;
      group.add(ring);
    });

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(host);

    let animationFrame = 0;
    const start = performance.now();
    const render = (time: number) => {
      const elapsed = (time - start) / 1000;
      group.rotation.z = elapsed * 0.055;
      group.rotation.x = Math.sin(elapsed * 0.22) * 0.1;
      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(render);
    };
    if (paused) {
      renderer.render(scene, camera);
    } else {
      animationFrame = window.requestAnimationFrame(render);
    }

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
      group.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
        }
      });
      materials.forEach((material) => material.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [paused]);

  return <div ref={hostRef} className="hero-lens" aria-hidden="true" />;
}
