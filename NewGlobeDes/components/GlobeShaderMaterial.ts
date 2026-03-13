import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';

export const GlobeMaterial = shaderMaterial(
  {
    uTime: 0,
  },
  // vertex shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vLocalNormal;
    varying vec3 vViewPosition;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vLocalNormal = normalize(normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  // fragment shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vLocalNormal;
    varying vec3 vViewPosition;
    uniform float uTime;

    void main() {
      vec3 n = normalize(vNormal); // For lighting/reflections
      vec3 ln = normalize(vLocalNormal); // For swoosh/surface details
      vec3 viewDir = normalize(vViewPosition);
      
      // --- Inner Refraction & Caustics ---
      vec3 refracted = refract(-viewDir, n, 1.0 / 1.33);
      float innerGradient = smoothstep(-1.0, 1.0, refracted.y);
      vec3 innerColor = mix(vec3(0.0, 0.1, 0.4), vec3(0.0, 0.6, 0.9), innerGradient);
      
      // Internal caustics/lightspots
      float caustics1 = pow(max(0.0, sin(refracted.x * 8.0 + uTime * 0.5) * sin(refracted.z * 8.0 - uTime * 0.3)), 4.0);
      float caustics2 = pow(max(0.0, sin(refracted.y * 12.0 - uTime * 0.4) * cos(refracted.x * 10.0 + uTime * 0.6)), 4.0);
      innerColor += vec3(0.4, 0.8, 1.0) * caustics1 * 1.5;
      innerColor += vec3(0.2, 0.6, 1.0) * caustics2 * 1.0;

      // --- Base Surface Color ---
      vec3 darkBlue = vec3(0.0, 0.06, 0.33);
      vec3 cyan = vec3(0.0, 0.73, 1.0);
      float gradientY = n.y;
      vec3 surfaceColor = mix(cyan, darkBlue, smoothstep(-0.8, 0.2, gradientY));
      
      // Bottom glow
      float bottomGlow = smoothstep(0.5, 1.0, -n.y);
      surfaceColor = mix(surfaceColor, vec3(0.4, 0.9, 1.0), bottomGlow * 0.8);

      // Mix inner and surface using Fresnel
      float fresnel = pow(1.0 - max(dot(n, viewDir), 0.0), 2.0);
      vec3 color = mix(innerColor, surfaceColor, fresnel * 0.6 + 0.4);

      // --- Lightspots / Reflections (Fixed to camera) ---
      // 1. Top Left Reflection
      vec3 topReflPos = normalize(vec3(-0.5, 0.6, 0.6));
      vec3 dRefl = n - topReflPos;
      dRefl.y *= 1.5; 
      dRefl.x *= 0.8;
      float topRefl = 1.0 - smoothstep(0.2, 0.4, length(dRefl));
      color = mix(color, vec3(0.4, 0.66, 1.0), topRefl * 0.6);
      
      vec3 dotA = normalize(vec3(-0.4, 0.75, 0.6));
      float dDotA = 1.0 - smoothstep(0.03, 0.04, distance(n, dotA));
      color = mix(color, vec3(1.0), dDotA);
      
      vec3 dotB = normalize(vec3(-0.55, 0.65, 0.6));
      float dDotB = 1.0 - smoothstep(0.015, 0.025, distance(n, dotB));
      color = mix(color, vec3(1.0), dDotB);

      // 2. Small reflections on the left
      vec3 leftRefl1Pos = normalize(vec3(-0.8, -0.1, 0.5));
      float leftRefl1 = 1.0 - smoothstep(0.1, 0.15, distance(n, leftRefl1Pos));
      color = mix(color, vec3(0.3, 0.6, 0.9), leftRefl1 * 0.4);

      vec3 leftRefl2Pos = normalize(vec3(-0.6, -0.2, 0.7));
      float leftRefl2 = 1.0 - smoothstep(0.15, 0.25, distance(n, leftRefl2Pos));
      color = mix(color, vec3(0.3, 0.6, 0.9), leftRefl2 * 0.3);

      // 3. Additional new lightspots
      vec3 rightReflPos = normalize(vec3(0.7, 0.3, 0.5));
      float rightRefl = 1.0 - smoothstep(0.1, 0.3, distance(n, rightReflPos));
      color = mix(color, vec3(0.2, 0.5, 0.8), rightRefl * 0.3);

      vec3 topRightDot = normalize(vec3(0.5, 0.8, 0.4));
      float dTopRight = 1.0 - smoothstep(0.02, 0.03, distance(n, topRightDot));
      color = mix(color, vec3(0.8, 0.9, 1.0), dTopRight * 0.8);

      // --- The Swoosh (Fixed to camera -> use n) ---
      float theta = atan(n.x, n.z);
      float phi = asin(n.y);
      
      float swoosh_phi = 0.52 * theta * theta + 0.38 * theta - 0.5;
      float d_phi = abs(phi - swoosh_phi);
      float d_theta = 2.0 * 0.52 * theta + 0.38;
      float perp_d = d_phi / sqrt(1.0 + d_theta * d_theta);
      
      float thickness = mix(0.0, 0.03, smoothstep(1.0, -1.2, theta));
      float swoosh = 1.0 - smoothstep(thickness * 0.8, thickness * 1.2, perp_d);
      
      // Animation: Swoosh draws itself
      float animTime = uTime * 0.5;
      float drawProgress = fract(animTime); 
      float drawState = smoothstep(0.0, 0.4, drawProgress);
      float currentEndTheta = mix(-1.2, 1.0, drawState);
      
      float swooshMask = smoothstep(-1.4, -1.2, theta) * smoothstep(currentEndTheta + 0.05, currentEndTheta - 0.05, theta);
      swoosh *= swooshMask;
      
      float fadeOut = 1.0 - smoothstep(0.8, 1.0, drawProgress);
      swoosh *= fadeOut;
      
      color = mix(color, vec3(1.0), swoosh);

      // --- The Star / Glint (Fixed to camera) ---
      float starTheta = -0.2;
      float starPhi = 0.52 * starTheta * starTheta + 0.38 * starTheta - 0.5;
      vec3 starPos = vec3(sin(starTheta)*cos(starPhi), sin(starPhi), cos(starTheta)*cos(starPhi));
      
      vec3 starTangent = normalize(cross(starPos, vec3(0.0, 1.0, 0.0)));
      vec3 starBitangent = cross(starTangent, starPos);
      
      vec3 dStar = n - starPos;
      float xStar = dot(dStar, starTangent);
      float yStar = dot(dStar, starBitangent);
      
      float angle = uTime * 2.0;
      float s = sin(angle);
      float c = cos(angle);
      float rx = xStar * c - yStar * s;
      float ry = xStar * s + yStar * c;
      
      // Bigger star shape
      float starShape = (1.0 - smoothstep(0.0, 0.02, abs(rx))) * (1.0 - smoothstep(0.0, 0.3, abs(ry))) +
                        (1.0 - smoothstep(0.0, 0.02, abs(ry))) * (1.0 - smoothstep(0.0, 0.3, abs(rx)));
      
      starShape *= 1.0 - smoothstep(0.0, 0.3, distance(n, starPos));
      
      float preHit = currentEndTheta - starTheta;
      
      // Penetrating Light Spot (precedes the glint)
      float spotIntensity = smoothstep(-0.3, -0.05, preHit) * (1.0 - smoothstep(-0.05, 0.1, preHit));
      float spotShape = 1.0 - smoothstep(0.0, 0.1 + 0.15 * spotIntensity, distance(n, starPos));
      float spotCore = 1.0 - smoothstep(0.0, 0.05, distance(n, starPos));
      color += vec3(0.5, 0.8, 1.0) * spotShape * spotIntensity * 2.0 * fadeOut;
      color += vec3(1.0, 1.0, 1.0) * spotCore * spotIntensity * 3.0 * fadeOut;

      // Glint Transition
      float starMask = smoothstep(-0.05, 0.05, preHit);
      color = mix(color, vec3(1.0), clamp(starShape, 0.0, 1.0) * starMask * fadeOut);

      // Glint Glow and Halo
      float glintIntensity = smoothstep(-0.05, 0.1, preHit) * (1.0 - smoothstep(0.1, 0.4, preHit));
      float starGlow = 1.0 - smoothstep(0.0, 0.4, distance(n, starPos));
      float halo = smoothstep(0.2, 0.3, distance(n, starPos)) * (1.0 - smoothstep(0.3, 0.4, distance(n, starPos)));
      
      color += vec3(0.6, 0.8, 1.0) * starGlow * glintIntensity * fadeOut * 1.5;
      color += vec3(0.4, 0.7, 1.0) * halo * glintIntensity * fadeOut * 0.8;

      // --- The Dots (Fixed to camera) ---
      float t1 = 1.0; float p1 = 0.4;
      vec3 d1P = vec3(sin(t1)*cos(p1), sin(p1), cos(t1)*cos(p1));
      float dot1 = 1.0 - smoothstep(0.02, 0.025, distance(n, d1P));
      float dot1Mask = smoothstep(0.9, 1.0, currentEndTheta);
      color = mix(color, vec3(0.3, 0.6, 1.0), dot1 * dot1Mask * fadeOut);
      
      float t2 = 1.15; float p2 = 0.45;
      vec3 d2P = vec3(sin(t2)*cos(p2), sin(p2), cos(t2)*cos(p2));
      float dot2 = 1.0 - smoothstep(0.01, 0.015, distance(n, d2P));
      float dot2Mask = smoothstep(1.05, 1.15, currentEndTheta);
      color = mix(color, vec3(0.3, 0.6, 1.0), dot2 * dot2Mask * fadeOut);

      gl_FragColor = vec4(color, 1.0);
    }
  `
);
