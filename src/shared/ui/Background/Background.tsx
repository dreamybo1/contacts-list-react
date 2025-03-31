import React, { useRef, useMemo, useEffect, FC } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MouseRef {
  x: number;
  y: number;
}

const Particles: FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const mouse = useRef<MouseRef>({ x: 0, y: 0 });
  const velocitiesRef = useRef<number[]>([]);

  // Генерируем позиции, цвета и скорости один раз при инициализации компонента
  const [positions, colors] = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    const velocities: number[] = [];
    for (let i = 0; i < 300; i++) {
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 15;
      const z = (Math.random() - 0.5) * 15;
      positions.push(x, y, z);
      colors.push(Math.random(), Math.random(), Math.random());
      velocities.push(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      );
    }
    velocitiesRef.current = velocities;
    return [new Float32Array(positions), new Float32Array(colors)];
  }, []);

  // Обработчик движения мыши для обновления координат относительно центра экрана
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = event.clientX - window.innerWidth / 2;
      mouse.current.y = event.clientY - window.innerHeight / 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Обновляем позиции частиц и вращение каждый кадр
  useFrame(() => {
    const points = pointsRef.current;
    if (!points) return;
  
    points.rotation.y += (mouse.current.x * 0.0005 - points.rotation.y) * 0.55;
    points.rotation.x += (mouse.current.y * 0.0005 - points.rotation.x) * 0.55;
  
    const geometry = points.geometry;
    const positionAttribute = geometry?.attributes['position'];
    if (!positionAttribute || !(positionAttribute.array instanceof Float32Array)) return;
    const positionsArray = positionAttribute.array as Float32Array;
  
    const velocities = velocitiesRef.current;
    // Если вдруг длины не совпадают, можно добавить проверку:
    if (velocities.length < positionsArray.length) return;
  
    for (let i = 0; i < positionsArray.length; i += 3) {
      // Используем оператор non-null (!) для явного указания, что значение определено
      positionsArray[i]!     += velocities[i]!;
      positionsArray[i + 1]! += velocities[i + 1]!;
      positionsArray[i + 2]! += velocities[i + 2]!;
  
      if (positionsArray[i]! > 7.5 || positionsArray[i]! < -7.5) {
        velocities[i] = -velocities[i]!;
      }
      if (positionsArray[i + 1]! > 7.5 || positionsArray[i + 1]! < -7.5) {
        velocities[i + 1] = -velocities[i + 1]!;
      }
      if (positionsArray[i + 2]! > 7.5 || positionsArray[i + 2]! < -7.5) {
        velocities[i + 2] = -velocities[i + 2]!;
      }
    }
    positionAttribute.needsUpdate = true;
  });
  

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
          />
          <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.8}
      />
    </points>
  );
};

export const ParticleScene: FC = () => {
  return (
    <Canvas style={{ position: 'absolute', filter: "blur(6px)", zIndex: -1, top: 0, left: 0 }} camera={{ position: [0, 0, 5] }}>
      <Particles />
    </Canvas>
  );
};

export default ParticleScene;
