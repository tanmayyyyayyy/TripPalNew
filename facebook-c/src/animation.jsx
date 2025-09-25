// import React, { useEffect, useRef } from "react";
// import * as THREE from "three";

// const ThreeAnimation = () => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     let scene, camera, renderer, geometry, material, mesh, animationFrameId;

//     if (canvasRef.current) {
//       scene = new THREE.Scene();

//       // Camera
//       camera = new THREE.PerspectiveCamera(
//         75,
//         window.innerWidth / window.innerHeight,
//         0.1,
//         1000
//       );
//       camera.position.z = 25;

//       // Renderer
//       renderer = new THREE.WebGLRenderer({
//         antialias: true,
//         alpha: true,
//         canvas: canvasRef.current,
//       });
//       renderer.setPixelRatio(window.devicePixelRatio);
//       renderer.setSize(window.innerWidth, window.innerHeight);

//       // Uniforms
//       const uniforms = {
//         u_time: { value: 0.0 },
//         u_resolution: {
//           value: new THREE.Vector2(window.innerWidth, window.innerHeight),
//         },
//         u_mouse: { value: new THREE.Vector2(0, 0) }, // mouse uniform
//         u_click: { value: 0.0 }, // click uniform
//       };

//       // Handle resize
//       const handleResize = () => {
//         camera.aspect = window.innerWidth / window.innerHeight;
//         camera.updateProjectionMatrix();
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
//       };
//       window.addEventListener("resize", handleResize);

//       // Mouse move
//       const handleMouseMove = (e) => {
//         uniforms.u_mouse.value.x = (e.clientX / window.innerWidth) * 2 - 1;
//         uniforms.u_mouse.value.y = (e.clientY / window.innerHeight) * 2 - 1;
//       };
//       window.addEventListener("mousemove", handleMouseMove);

//       // Click
//       const handleClick = () => {
//         uniforms.u_click.value = Math.random() * 2.0; // random effect on click
//       };
//       window.addEventListener("click", handleClick);

//       // Shaders
//       const vertexShader = `
//         uniform float u_time;
//         uniform vec2 u_mouse;
//         uniform float u_click;
//         varying vec3 vNormal;

//         void main() {
//           vNormal = normal;
//           vec3 transformed = position;
//           // Interactive morphing
//           float wave = sin(transformed.y * 0.5 + u_time * 0.5 + u_mouse.x * 5.0) * 2.0;
//           wave += cos(transformed.x * 0.5 + u_time * 0.3 + u_mouse.y * 5.0) * 1.5;
//           wave += sin(u_click + length(transformed)) * 2.0; // click effect
//           transformed += normal * wave * 0.3;
//           gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
//         }
//       `;

//       const fragmentShader = `
//         uniform float u_time;
//         varying vec3 vNormal;

//         void main() {
//           vec3 color = vec3(0.2, 0.4, 1.0) * (sin(vNormal.x * 3.0 + u_time) * 0.5 + 0.5);
//           gl_FragColor = vec4(color, 1.0);
//         }
//       `;

//       // Geometry + Material
//       geometry = new THREE.IcosahedronGeometry(15, 8);
//       material = new THREE.ShaderMaterial({
//         uniforms,
//         vertexShader,
//         fragmentShader,
//         wireframe: true,
//         transparent: true,
//         opacity: 0.3,
//       });

//       mesh = new THREE.Mesh(geometry, material);
//       scene.add(mesh);

//       // Animate
//       const animate = () => {
//         animationFrameId = requestAnimationFrame(animate);
//         uniforms.u_time.value += 0.01;
//         mesh.rotation.x += 0.001;
//         mesh.rotation.y += 0.002;
//         renderer.render(scene, camera);
//       };
//       animate();

//       // Cleanup
//       return () => {
//         window.removeEventListener("resize", handleResize);
//         window.removeEventListener("mousemove", handleMouseMove);
//         window.removeEventListener("click", handleClick);
//         cancelAnimationFrame(animationFrameId);
//         renderer.dispose();
//       };
//     }
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="fixed bg-gradient-to-br from-[#11676a] via-black to-[#1b9986] transition-colors duration-1000 top-0 left-0 w-full h-full -z-10"
//     />
//   );
// };

// export default ThreeAnimation;



// import React, { useEffect, useRef } from "react";
// import * as THREE from "three";

// const ThreeAnimation = () => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     let scene, camera, renderer, geometry, material, mesh, animationFrameId;

//     if (canvasRef.current) {
//       scene = new THREE.Scene();

//       // Camera
//       camera = new THREE.PerspectiveCamera(
//         75,
//         window.innerWidth / window.innerHeight,
//         0.1,
//         1000
//       );
//       camera.position.z = 25;

//       // Renderer
//       renderer = new THREE.WebGLRenderer({
//         antialias: true,
//         alpha: true,
//         canvas: canvasRef.current,
//       });
//       renderer.setPixelRatio(window.devicePixelRatio);
//       renderer.setSize(window.innerWidth, window.innerHeight);

//       // Uniforms
//       const uniforms = {
//         u_time: { value: 0.0 },
//         u_resolution: {
//           value: new THREE.Vector2(window.innerWidth, window.innerHeight),
//         },
//         u_mouse: { value: new THREE.Vector2(0, 0) },
//         u_click: { value: 0.0 },
//       };

//       // Responsive Icosahedron size
//       const getGeometrySize = () => {
//         if (window.innerWidth < 640) return 7;   // small screens
//         if (window.innerWidth < 1024) return 11;  // medium screens
//         return 14;                               // large screens
//       };

//       geometry = new THREE.IcosahedronGeometry(getGeometrySize(), 6);
//       material = new THREE.ShaderMaterial({
//         uniforms,
//         vertexShader: `
//           uniform float u_time;
//           uniform vec2 u_mouse;
//           uniform float u_click;
//           varying vec3 vNormal;

//           void main() {
//             vNormal = normal;
//             vec3 transformed = position;
//             float wave = sin(transformed.y * 0.5 + u_time * 0.5 + u_mouse.x * 5.0) * 2.0;
//             wave += cos(transformed.x * 0.5 + u_time * 0.3 + u_mouse.y * 5.0) * 1.5;
//             wave += sin(u_click + length(transformed)) * 2.0;
//             transformed += normal * wave * 0.3;
//             gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
//           }
//         `,
//         fragmentShader: `
//           uniform float u_time;
//           varying vec3 vNormal;

//           void main() {
//             vec3 color = vec3(0.1, 0.9, 1.0) * (sin(vNormal.x * 3.0 + u_time) * 0.5 + 0.5);
//             gl_FragColor = vec4(color, 1.0);
//           }
//         `,
//         wireframe: true,
//         transparent: true,
//         opacity: 0.3,
//       });

//       mesh = new THREE.Mesh(geometry, material);
//       scene.add(mesh);

//       // Handle resize
//       const handleResize = () => {
//         camera.aspect = window.innerWidth / window.innerHeight;
//         camera.updateProjectionMatrix();
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);

//         // update geometry size
//         const newGeo = new THREE.IcosahedronGeometry(getGeometrySize(), 6);
//         mesh.geometry.dispose();
//         mesh.geometry = newGeo;
//       };
//       window.addEventListener("resize", handleResize);

//       // Mouse move
//       const handleMouseMove = (e) => {
//         uniforms.u_mouse.value.x = (e.clientX / window.innerWidth) * 2 - 1;
//         uniforms.u_mouse.value.y = (e.clientY / window.innerHeight) * 2 - 1;
//       };
//       window.addEventListener("mousemove", handleMouseMove);

//       // Click
//       const handleClick = () => {
//         uniforms.u_click.value = Math.random() * 2.0;
//       };
//       window.addEventListener("click", handleClick);

//       // Animate
//       const animate = () => {
//         animationFrameId = requestAnimationFrame(animate);
//         uniforms.u_time.value += 0.01;
//         mesh.rotation.x += 0.001;
//         mesh.rotation.y += 0.002;
//         renderer.render(scene, camera);
//       };
//       animate();

//       // Cleanup
//       return () => {
//         window.removeEventListener("resize", handleResize);
//         window.removeEventListener("mousemove", handleMouseMove);
//         window.removeEventListener("click", handleClick);
//         cancelAnimationFrame(animationFrameId);
//         renderer.dispose();
//       };
//     }
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="fixed bg-gradient-to-br from-black via-[#45a29e] to-[#66fcf1] transition-colors duration-1000 top-0 left-0 w-full h-full -z-10"
//     />
//   );
// };

// export default ThreeAnimation;

 
// import React, { useEffect, useRef } from "react";
// import * as THREE from "three";

// const ThreeAnimation = () => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     let scene, camera, renderer, geometry, material, mesh, animationFrameId;

//     if (canvasRef.current) {
//       scene = new THREE.Scene();

//       // Camera
//       camera = new THREE.PerspectiveCamera(
//         75,
//         window.innerWidth / window.innerHeight,
//         0.1,
//         1000
//       );
//       camera.position.z = 28;

//       // Renderer
//       renderer = new THREE.WebGLRenderer({
//         antialias: true,
//         alpha: true,
//         canvas: canvasRef.current,
//       });
//       renderer.setPixelRatio(window.devicePixelRatio);
//       renderer.setSize(window.innerWidth, window.innerHeight);

//       // Uniforms
//       const uniforms = {
//         u_time: { value: 0.0 },
//         u_resolution: {
//           value: new THREE.Vector2(window.innerWidth, window.innerHeight),
//         },
//         u_mouse: { value: new THREE.Vector2(0, 0) },
//         u_click: { value: 0.0 },
//       };

//       // Responsive size
//       const getGeometrySize = () => {
//         if (window.innerWidth < 640) return 9;
//         if (window.innerWidth < 1024) return 14;
//         return 16; // larger by default
//       };

//       geometry = new THREE.IcosahedronGeometry(getGeometrySize(), 7);

//       // Shaders (teal/green/blue tones)
//       const vertexShader = `
//         uniform float u_time;
//         uniform vec2 u_mouse;
//         uniform float u_click;
//         varying vec3 vNormal;
//         varying float vDistortion;

//         void main() {
//           vNormal = normal;
//           vec3 transformed = position;

//           // Wave distortions
//           float wave = sin(transformed.y * 0.6 + u_time * 0.8 + u_mouse.x * 5.0) * 1.5;
//           wave += cos(transformed.x * 0.6 + u_time * 0.4 + u_mouse.y * 5.0) * 1.2;

//           // Pulse effect on click
//           wave += sin(u_click + length(transformed) * 1.5 - u_time * 3.0) * 1.5;

//           transformed += normal * wave * 0.3;
//           vDistortion = wave;

//           gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
//         }
//       `;

//       const fragmentShader = `
//         uniform float u_time;
//         varying vec3 vNormal;
//         varying float vDistortion;

//         void main() {
//           // Base teal/blue color shifting with time
//           float t = u_time * 0.5;
//           vec3 baseColor = mix(vec3(0.07, 0.4, 0.41), vec3(0.4, 0.6, 0.92), 0.5 + 0.5 * sin(t));

//           // Glow effect
//           float glow = pow(abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))), 1.5);
//           vec3 finalColor = baseColor * (0.6 + glow * 0.8);

//           // Subtle shimmer
//           finalColor += 0.15 * abs(sin(vDistortion + u_time));

//           gl_FragColor = vec4(finalColor, 1.0);
//         }
//       `;

//       material = new THREE.ShaderMaterial({
//         uniforms,
//         vertexShader,
//         fragmentShader,
//         wireframe: true,
//         transparent: true,
//         opacity: 0.9,
//       });

//       mesh = new THREE.Mesh(geometry, material);
//       scene.add(mesh);

//       // Handle resize
//       const handleResize = () => {
//         camera.aspect = window.innerWidth / window.innerHeight;
//         camera.updateProjectionMatrix();
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);

//         const newGeo = new THREE.IcosahedronGeometry(getGeometrySize(), 7);
//         mesh.geometry.dispose();
//         mesh.geometry = newGeo;
//       };
//       window.addEventListener("resize", handleResize);

//       // Mouse move
//       const handleMouseMove = (e) => {
//         uniforms.u_mouse.value.x = (e.clientX / window.innerWidth) * 2 - 1;
//         uniforms.u_mouse.value.y = (e.clientY / window.innerHeight) * 2 - 1;
//       };
//       window.addEventListener("mousemove", handleMouseMove);

//       // Click pulse
//       const handleClick = () => {
//         uniforms.u_click.value = uniforms.u_time.value;
//       };
//       window.addEventListener("click", handleClick);

//       // Animate
//       const animate = () => {
//         animationFrameId = requestAnimationFrame(animate);
//         uniforms.u_time.value += 0.02;
//         mesh.rotation.x += 0.0012;
//         mesh.rotation.y += 0.002;
//         renderer.render(scene, camera);
//       };
//       animate();

//       // Cleanup
//       return () => {
//         window.removeEventListener("resize", handleResize);
//         window.removeEventListener("mousemove", handleMouseMove);
//         window.removeEventListener("click", handleClick);
//         cancelAnimationFrame(animationFrameId);
//         renderer.dispose();
//       };
//     }
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="fixed bg-gradient-to-br from-[#11676a] via-gray-900 to-[#1b9986] transition-colors duration-1000 top-0 left-0 w-full h-full -z-10"
//     />
//   );
// };

// export default ThreeAnimation;

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, geometry, material, mesh, animationFrameId;

    if (!canvasRef.current) return;

    // SCENE SETUP
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 28;

    // Renderer
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: canvasRef.current,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Uniforms
    const uniforms = {
      u_time: { value: 0.0 },
      u_resolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      u_mouse: { value: new THREE.Vector2(0, 0) },
      u_click: { value: 0.0 },
    };

    // Responsive size
    const getGeometrySize = () => {
      if (window.innerWidth < 640) return 9;
      if (window.innerWidth < 1024) return 14;
      return 16; // larger by default
    };

    geometry = new THREE.IcosahedronGeometry(getGeometrySize(), 7);

    // Shaders (teal/green/blue tones)
    const vertexShader = `
        uniform float u_time;
        uniform vec2 u_mouse;
        uniform float u_click;
        varying vec3 vNormal;
        varying float vDistortion;

        void main() {
            vNormal = normal;
            vec3 transformed = position;

            // More complex wave distortions
            float wave1 = sin(transformed.y * 0.8 + u_time * 1.0 + u_mouse.x * 5.0) * 1.5;
            float wave2 = cos(transformed.x * 0.8 + u_time * 0.7 + u_mouse.y * 5.0) * 1.2;
            float wave3 = sin(transformed.z * 0.9 + u_time * 0.6) * 1.0;
            
            float combinedWave = wave1 + wave2 + wave3;

            // Pulse effect on click
            combinedWave += sin(u_click + length(transformed) * 1.5 - u_time * 3.0) * 1.5;

            transformed += normal * combinedWave * 0.3;
            vDistortion = combinedWave;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
        }
    `;

    const fragmentShader = `
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform vec2 u_mouse;
        varying vec3 vNormal;
        varying float vDistortion;

        void main() {
            // Base teal/blue color shifting with time
            float t = u_time * 0.5;
            vec3 baseColor = mix(vec3(0.07, 0.4, 0.41), vec3(0.4, 0.6, 0.92), 0.5 + 0.5 * sin(t));
            
            // Glow effect
            float glow = pow(abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))), 1.5);
            vec3 finalColor = baseColor * (0.6 + glow * 0.8);
            
            // Mouse-driven accent glow
            float mouseGlow = 1.0 - length(gl_FragCoord.xy / u_resolution.xy - vec2(0.5, 0.5));
            finalColor += 0.2 * baseColor * pow(mouseGlow, 3.0) * (1.0 + sin(u_time));

            // Subtle shimmer
            finalColor += 0.15 * abs(sin(vDistortion + u_time));

            gl_FragColor = vec4(finalColor, 1.0);
        }
    `;

    material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      wireframe: true,
      transparent: true,
      opacity: 0.9,
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);

      const newGeo = new THREE.IcosahedronGeometry(getGeometrySize(), 7);
      mesh.geometry.dispose();
      mesh.geometry = newGeo;
    };
    window.addEventListener("resize", handleResize);

    // Mouse move
    const handleMouseMove = (e) => {
      uniforms.u_mouse.value.x = (e.clientX / window.innerWidth) * 2 - 1;
      uniforms.u_mouse.value.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Click pulse
    const handleClick = () => {
      uniforms.u_click.value = uniforms.u_time.value;
    };
    window.addEventListener("click", handleClick);

    // Animate
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Camera parallax
      camera.position.x = uniforms.u_mouse.value.x * 2;
      camera.position.y = uniforms.u_mouse.value.y * 2;
      camera.lookAt(scene.position);

      uniforms.u_time.value += 0.02;
      mesh.rotation.x += 0.0012;
      mesh.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed bg-gradient-to-br from-[#11676a] via-gray-900 to-[#1b9986] transition-colors duration-1000 top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default ThreeAnimation;
