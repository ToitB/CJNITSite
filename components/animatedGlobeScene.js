import * as THREE from 'three';

export const GLOBE_PALETTE = Object.freeze({
  shellTop: '#3b8dbf',
  shellBottom: '#165ff2',
  deepBlue: '#03318c',
  halo: '#f2f2f2',
  arc: '#f2f2f2',
  bubble: '#3b8dbf',
  marker: '#f29216',
});

export const DEFAULT_GLOBE_CONFIG = Object.freeze({
  cameraFov: 35,
  cameraZ: 4.6,
  shellRadius: 1,
  shellSegments: 96,
  haloOpacity: 0.5,
});

function createShellMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      colorTop: { value: new THREE.Color(GLOBE_PALETTE.shellTop) },
      colorBottom: { value: new THREE.Color(GLOBE_PALETTE.shellBottom) },
      deepBlue: { value: new THREE.Color(GLOBE_PALETTE.deepBlue) },
    },
    vertexShader: /* glsl */ `
      varying vec3 vNormal;
      varying vec3 vWorld;

      void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vWorld = world.xyz;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform vec3 colorTop;
      uniform vec3 colorBottom;
      uniform vec3 deepBlue;

      varying vec3 vNormal;
      varying vec3 vWorld;

      void main() {
        vec3 viewDir = normalize(cameraPosition - vWorld);
        float fresnel = pow(1.0 - max(dot(viewDir, normalize(vNormal)), 0.0), 1.8);

        float baseMix = smoothstep(-0.95, 0.5, vNormal.y);
        vec3 gradient = mix(colorBottom, colorTop, baseMix);
        gradient = mix(gradient, deepBlue, smoothstep(0.25, 1.0, -vNormal.y + 0.55));

        float refractionPulse = 0.08 * sin(uTime * 1.6 + vWorld.y * 5.5 + vWorld.x * 2.0);
        vec3 tint = gradient + refractionPulse;
        vec3 color = mix(tint, vec3(0.9, 0.97, 1.0), fresnel * 0.65);

        gl_FragColor = vec4(color, 1.0);
      }
    `,
  });
}

function createArcMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      glowColor: { value: new THREE.Color(GLOBE_PALETTE.arc) },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform vec3 glowColor;

      varying vec2 vUv;

      void main() {
        float body = smoothstep(0.03, 0.0, abs(vUv.y - 0.5));
        float traveling = smoothstep(0.0, 0.2, vUv.x) * (1.0 - smoothstep(0.8, 1.0, vUv.x));
        float glintHead = exp(-pow((vUv.x - fract(uTime * 0.15 + 0.1)) * 18.0, 2.0));
        float intensity = body * (0.45 + traveling * 0.5 + glintHead * 1.8);

        gl_FragColor = vec4(glowColor * intensity, intensity);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
}

function disposeMaterial(material) {
  if (Array.isArray(material)) {
    material.forEach(disposeMaterial);
    return;
  }

  material.dispose();
}

export function createAnimatedGlobeScene(scene, overrides = {}) {
  const config = { ...DEFAULT_GLOBE_CONFIG, ...overrides };
  const group = new THREE.Group();

  const shellMaterial = createShellMaterial();
  const shell = new THREE.Mesh(
    new THREE.SphereGeometry(config.shellRadius, config.shellSegments, config.shellSegments),
    shellMaterial
  );
  group.add(shell);

  const halo = new THREE.Mesh(
    new THREE.SphereGeometry(0.65, 64, 64),
    new THREE.MeshBasicMaterial({
      color: GLOBE_PALETTE.halo,
      transparent: true,
      opacity: config.haloOpacity,
    })
  );
  halo.position.set(0, 0.34, 0.71);
  halo.scale.set(1.28, 0.72, 0.35);
  group.add(halo);

  const arcMaterial = createArcMaterial();
  const arc = new THREE.Mesh(
    new THREE.TorusGeometry(0.78, 0.025, 24, 120, 2.1),
    arcMaterial
  );
  arc.position.set(0.04, -0.43, 0.47);
  arc.rotation.set(0.05, 0.15, -0.22);
  group.add(arc);

  const marker = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.12, 0),
    new THREE.MeshBasicMaterial({
      color: GLOBE_PALETTE.marker,
      transparent: true,
      opacity: 0.92,
    })
  );
  marker.position.set(0.1, -0.67, 0.54);
  group.add(marker);

  const bubbleConfig = [
    { position: [-0.52, -0.08, 0.85], scale: 0.23, opacity: 0.22 },
    { position: [-0.73, 0.04, 0.76], scale: 0.15, opacity: 0.2 },
    { position: [0.67, 0.27, 0.77], scale: 0.06, opacity: 0.52 },
    { position: [0.76, -0.05, 0.72], scale: 0.03, opacity: 0.6 },
  ];

  const bubbles = bubbleConfig.map((bubble) => {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshBasicMaterial({
        color: GLOBE_PALETTE.bubble,
        transparent: true,
        opacity: bubble.opacity,
      })
    );

    mesh.position.set(bubble.position[0], bubble.position[1], bubble.position[2]);
    mesh.scale.setScalar(bubble.scale);
    group.add(mesh);
    return mesh;
  });

  scene.add(group);

  const update = (time) => {
    group.rotation.y = time * 0.18;
    group.rotation.x = Math.sin(time * 0.35) * 0.04;
    shellMaterial.uniforms.uTime.value = time;
    arcMaterial.uniforms.uTime.value = time;
    marker.position.y = -0.67 + Math.sin(time * 1.4) * 0.025;

    bubbles.forEach((bubble, index) => {
      const scale = bubbleConfig[index].scale * (1 + Math.sin(time * 1.1 + index) * 0.06);
      bubble.scale.setScalar(scale);
    });
  };

  const dispose = () => {
    group.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        disposeMaterial(child.material);
      }
    });

    scene.remove(group);
  };

  return {
    config,
    group,
    shell,
    shellMaterial,
    halo,
    arc,
    arcMaterial,
    marker,
    bubbles,
    update,
    dispose,
  };
}

export function addAnimatedGlobeLights(scene) {
  const ambient = new THREE.AmbientLight(0xffffff, 0.75);
  const key = new THREE.DirectionalLight(0xffffff, 1.1);
  key.position.set(2, 3, 3);

  const rim = new THREE.DirectionalLight(new THREE.Color(GLOBE_PALETTE.shellTop), 0.55);
  rim.position.set(-2.5, -1.2, 2.4);

  scene.add(ambient, key, rim);

  return {
    ambient,
    key,
    rim,
    dispose() {
      scene.remove(ambient, key, rim);
    },
  };
}
