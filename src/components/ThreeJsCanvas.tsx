'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeJsCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 2, 85);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(0x6366f1, 35, 300, 1.8);
    keyLight.position.set(40, 20, 60);
    scene.add(keyLight);

    const goldLight = new THREE.PointLight(0x06b6d4, 28, 250, 1.8);
    goldLight.position.set(-35, -15, 50);
    scene.add(goldLight);

    const rimLight = new THREE.PointLight(0x7c3aed, 18, 200, 2);
    rimLight.position.set(0, -50, 40);
    scene.add(rimLight);

    // --- Core Geometries ---

    // Central glowing core - more complex than before
    const coreGroup = new THREE.Group();
    group.add(coreGroup);

    // Inner icosahedron
    const innerCore = new THREE.Mesh(
      new THREE.IcosahedronGeometry(6, 1),
      new THREE.MeshPhysicalMaterial({
        color: 0x6366f1,
        emissive: 0x4338ca,
        emissiveIntensity: 0.8,
        roughness: 0.1,
        metalness: 0.9,
        clearcoat: 1,
        clearcoatRoughness: 0.15,
        transparent: true,
        opacity: 0.92,
      })
    );
    coreGroup.add(innerCore);

    // Outer wireframe dodecahedron
    const wireframeOuter = new THREE.Mesh(
      new THREE.DodecahedronGeometry(9, 0),
      new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        wireframe: true,
        transparent: true,
        opacity: 0.18,
      })
    );
    coreGroup.add(wireframeOuter);

    // Glowing inner sphere
    const glowSphere = new THREE.Mesh(
      new THREE.SphereGeometry(4, 16, 16),
      new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.1,
      })
    );
    coreGroup.add(glowSphere);

    // --- Orbiting rings ---
    const ringColors = [0x6366f1, 0x06b6d4, 0x7c3aed, 0x0ea5e9];
    const rings = ringColors.map((color, index) => {
      const radius = 16 + index * 5;
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.05 + index * 0.02, 16, 200),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.3 - index * 0.04,
        })
      );
      ring.rotation.x = Math.PI / 2 + (index * 0.2);
      ring.rotation.y = index * 0.5;
      group.add(ring);
      return ring;
    });

    // Thin ring glow
    const glowRing = new THREE.Mesh(
      new THREE.RingGeometry(26, 27, 120),
      new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.06,
        side: THREE.DoubleSide,
      })
    );
    glowRing.rotation.x = Math.PI / 3;
    group.add(glowRing);

    // --- Particle System (nodes + connections) ---
    const nodeCount = 60;
    const nodeGeometry = new THREE.SphereGeometry(0.3, 12, 12);
    const nodeMaterials = [
      new THREE.MeshStandardMaterial({ color: 0x6366f1, emissive: 0x6366f1, emissiveIntensity: 0.8 }),
      new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x06b6d4, emissiveIntensity: 0.6 }),
      new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x7c3aed, emissiveIntensity: 0.4 }),
    ];

    const nodes: THREE.Mesh[] = [];
    const nodeData: Array<{
      radius: number;
      speed: number;
      angle: number;
      verticalSpeed: number;
      verticalPhase: number;
      materialIndex: number;
    }> = [];

    for (let i = 0; i < nodeCount; i++) {
      const matIndex = i % 3;
      const node = new THREE.Mesh(nodeGeometry, nodeMaterials[matIndex]);
      const radius = 14 + (i % 9) * 3 + Math.random() * 6;
      const speed = 0.003 + Math.random() * 0.008;
      const angle = (i / nodeCount) * Math.PI * 2 + Math.random() * 0.5;
      const verticalSpeed = 0.003 + Math.random() * 0.01;
      const verticalPhase = Math.random() * Math.PI * 2;

      node.position.set(
        Math.cos(angle) * radius,
        Math.sin(verticalPhase) * 7,
        Math.sin(angle) * radius
      );

      nodeData.push({ radius, speed, angle, verticalSpeed, verticalPhase, materialIndex: matIndex });
      nodes.push(node);
      group.add(node);
    }

    // --- Connection lines ---
    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
    });
    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(lineSegments);

    // --- Floating shimmer particles (small dots) ---
    const shimmerCount = 200;
    const shimmerGeo = new THREE.BufferGeometry();
    const shimmerPos = new Float32Array(shimmerCount * 3);
    const shimmerSizes = new Float32Array(shimmerCount);
    for (let i = 0; i < shimmerCount; i++) {
      shimmerPos[i * 3] = (Math.random() - 0.5) * 120;
      shimmerPos[i * 3 + 1] = (Math.random() - 0.5) * 80;
      shimmerPos[i * 3 + 2] = (Math.random() - 0.5) * 80 - 20;
      shimmerSizes[i] = Math.random() * 2 + 0.5;
    }
    shimmerGeo.setAttribute('position', new THREE.BufferAttribute(shimmerPos, 3));
    shimmerGeo.setAttribute('size', new THREE.BufferAttribute(shimmerSizes, 1));

    const shimmerMat = new THREE.PointsMaterial({
      color: 0xe8c84a,
      size: 0.18,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const shimmerPoints = new THREE.Points(shimmerGeo, shimmerMat);
    scene.add(shimmerPoints);

    // Mouse tracking
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetX = (event.clientX - window.innerWidth / 2) * 0.003;
      targetY = (event.clientY - window.innerHeight / 2) * 0.003;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();
    let animationFrameId = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse follow
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;

      // Rotate entire group
      group.rotation.y = elapsed * 0.06 + currentX * 0.8;
      group.rotation.x = Math.sin(elapsed * 0.15) * 0.15 + currentY * 0.8;
      group.rotation.z = Math.sin(elapsed * 0.1) * 0.08;

      // Core animations
      coreGroup.rotation.y = elapsed * 0.5;
      coreGroup.rotation.x = elapsed * 0.3;
      innerCore.rotation.x = elapsed * 0.7;
      innerCore.rotation.z = elapsed * 0.4;
      wireframeOuter.rotation.y = -elapsed * 0.6;
      wireframeOuter.rotation.x = elapsed * 0.2;
      wireframeOuter.scale.setScalar(1 + Math.sin(elapsed * 0.8) * 0.02);
      glowSphere.scale.setScalar(1 + Math.sin(elapsed * 1.2) * 0.05);

      // Rings
      rings.forEach((ring, index) => {
        ring.rotation.z = elapsed * (0.12 + index * 0.04) + currentX * 0.3;
        ring.rotation.y = elapsed * (0.08 + index * 0.03) + currentY * 0.3;
      });

      glowRing.rotation.x = Math.PI / 3 + Math.sin(elapsed * 0.2) * 0.1;
      glowRing.rotation.y = elapsed * 0.15;

      // Node particles
      nodes.forEach((node, index) => {
        const data = nodeData[index];
        data.angle += data.speed;
        const verticalPos = Math.sin(elapsed * data.verticalSpeed + data.verticalPhase) * 8;

        node.position.set(
          Math.cos(data.angle) * data.radius,
          verticalPos + Math.sin(data.angle * 1.3) * 2,
          Math.sin(data.angle) * data.radius
        );
        const pulse = 0.7 + Math.sin(elapsed * 2 + index) * 0.3;
        node.scale.setScalar(pulse);
      });

      // Connection lines
      const linePositions: number[] = [];
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i].position;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j].position;
          const dist = a.distanceTo(b);
          if (dist < 24) {
            linePositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
          }
        }
      }
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

      // Shimmer particles slowly drift
      const shimmerPosAttr = shimmerPoints.geometry.attributes.position;
      const shimmerArray = shimmerPosAttr.array as Float32Array;
      for (let i = 0; i < shimmerCount; i++) {
        shimmerArray[i * 3 + 1] += Math.sin(elapsed * 0.2 + i) * 0.003;
        shimmerArray[i * 3] += Math.cos(elapsed * 0.15 + i * 0.5) * 0.003;
      }
      shimmerPosAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      // Dispose geometries/materials
      nodeGeometry.dispose();
      nodeMaterials.forEach(m => m.dispose());
      lineGeometry.dispose();
      lineMaterial.dispose();
      shimmerGeo.dispose();
      shimmerMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ minHeight: '100vh' }}
    />
  );
}
