import { shaderMaterial } from "@react-three/drei";

export const GlobeMaterial = shaderMaterial(
  {
    uTime: 0,
  },
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
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vLocalNormal;
    varying vec3 vViewPosition;
    uniform float uTime;

    void main() {
      vec3 n = normalize(vNormal);
      vec3 ln = normalize(vLocalNormal);
      vec3 viewDir = normalize(vViewPosition);
      
      vec3 refracted = refract(-viewDir, n, 1.0 / 1.33);
      float innerGradient = smoothstep(-1.0, 1.0, refracted.y);
      vec3 innerColor = mix(vec3(0.0, 0.1, 0.4), vec3(0.0, 0.6, 0.9), innerGradient);
      
      float caustics1 = pow(max(0.0, sin(refracted.x * 8.0 + uTime * 0.5) * sin(refracted.z * 8.0 - uTime * 0.3)), 4.0);
      float caustics2 = pow(max(0.0, sin(refracted.y * 12.0 - uTime * 0.4) * cos(refracted.x * 10.0 + uTime * 0.6)), 4.0);
      innerColor += vec3(0.4, 0.8, 1.0) * caustics1 * 1.5;
      innerColor += vec3(0.2, 0.6, 1.0) * caustics2 * 1.0;

      vec3 darkBlue = vec3(0.0, 0.06, 0.33);
      vec3 cyan = vec3(0.0, 0.73, 1.0);
      float gradientY = n.y;
      vec3 surfaceColor = mix(cyan, darkBlue, smoothstep(-0.8, 0.2, gradientY));
      
      float bottomGlow = smoothstep(0.5, 1.0, -n.y);
      surfaceColor = mix(surfaceColor, vec3(0.4, 0.9, 1.0), bottomGlow * 0.8);

      float fresnel = pow(1.0 - max(dot(n, viewDir), 0.0), 2.0);
      vec3 color = mix(innerColor, surfaceColor, fresnel * 0.6 + 0.4);

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

      vec3 leftRefl1Pos = normalize(vec3(-0.8, -0.1, 0.5));
      float leftRefl1 = 1.0 - smoothstep(0.1, 0.15, distance(n, leftRefl1Pos));
      color = mix(color, vec3(0.3, 0.6, 0.9), leftRefl1 * 0.4);

      vec3 leftRefl2Pos = normalize(vec3(-0.6, -0.2, 0.7));
      float leftRefl2 = 1.0 - smoothstep(0.15, 0.25, distance(n, leftRefl2Pos));
      color = mix(color, vec3(0.3, 0.6, 0.9), leftRefl2 * 0.3);

      vec3 rightReflPos = normalize(vec3(0.7, 0.3, 0.5));
      float rightRefl = 1.0 - smoothstep(0.1, 0.3, distance(n, rightReflPos));
      color = mix(color, vec3(0.2, 0.5, 0.8), rightRefl * 0.3);

      vec3 topRightDot = normalize(vec3(0.5, 0.8, 0.4));
      float dTopRight = 1.0 - smoothstep(0.02, 0.03, distance(n, topRightDot));
      color = mix(color, vec3(0.8, 0.9, 1.0), dTopRight * 0.8);

      float theta = atan(n.x, n.z);
      float phi = asin(n.y);
      
      float swoosh_phi = 0.52 * theta * theta + 0.38 * theta - 0.5;
      float d_phi = abs(phi - swoosh_phi);
      float d_theta = 2.0 * 0.52 * theta + 0.38;
      float perp_d = d_phi / sqrt(1.0 + d_theta * d_theta);
      
      float thickness = mix(0.0, 0.03, smoothstep(1.0, -1.2, theta));
      float swoosh = 1.0 - smoothstep(thickness * 0.8, thickness * 1.2, perp_d);
      
      float swooshAnimTime = uTime * 0.35;
      float swooshDrawProgress = fract(swooshAnimTime); 
      float swooshDrawState = smoothstep(0.0, 0.4, swooshDrawProgress);
      float swooshEndTheta = mix(-1.2, 1.0, swooshDrawState);
      
      float swooshMask = smoothstep(-1.4, -1.2, theta) * smoothstep(swooshEndTheta + 0.05, swooshEndTheta - 0.05, theta);
      swoosh *= swooshMask;
      
      float swooshFadeOut = 1.0 - smoothstep(0.8, 1.0, swooshDrawProgress);
      swoosh *= swooshFadeOut;
      
      color = mix(color, vec3(1.0), swoosh);

      float starTheta = -0.2;
      float starPhi = 0.52 * starTheta * starTheta + 0.38 * starTheta - 0.5;
      vec3 starPos = vec3(sin(starTheta)*cos(starPhi), sin(starPhi), cos(starTheta)*cos(starPhi));
      
      vec3 burstTangent = normalize(cross(starPos, vec3(0.0, 1.0, 0.0)));
      vec3 burstBitangent = cross(burstTangent, starPos);
      
      vec3 dStar = n - starPos;
      float xStar = dot(dStar, burstTangent);
      float yStar = dot(dStar, burstBitangent);
      
      float angle = uTime * 2.2;
      float s = sin(angle);
      float c = cos(angle);
      float rx = xStar * c - yStar * s;
      float ry = xStar * s + yStar * c;

      float drx = (rx + ry) * 0.70710678;
      float dry = (ry - rx) * 0.70710678;
      
      float starShape = (1.0 - smoothstep(0.0, 0.02, abs(rx))) * (1.0 - smoothstep(0.0, 0.32, abs(ry))) +
                        (1.0 - smoothstep(0.0, 0.02, abs(ry))) * (1.0 - smoothstep(0.0, 0.32, abs(rx)));
      float diagonalStar = (1.0 - smoothstep(0.0, 0.018, abs(drx))) * (1.0 - smoothstep(0.0, 0.24, abs(dry))) +
                           (1.0 - smoothstep(0.0, 0.018, abs(dry))) * (1.0 - smoothstep(0.0, 0.24, abs(drx)));
      float pinStar = (1.0 - smoothstep(0.0, 0.012, abs(rx))) * (1.0 - smoothstep(0.0, 0.12, abs(ry))) +
                      (1.0 - smoothstep(0.0, 0.012, abs(ry))) * (1.0 - smoothstep(0.0, 0.12, abs(rx)));
      float dCenter = distance(n, starPos);
      
      starShape *= 1.0 - smoothstep(0.0, 0.34, dCenter);
      diagonalStar *= 1.0 - smoothstep(0.0, 0.34, dCenter);
      pinStar *= 1.0 - smoothstep(0.0, 0.24, dCenter);
      
      float preHit = swooshEndTheta - starTheta;
      float burstWindow = smoothstep(-0.03, 0.03, preHit) * (1.0 - smoothstep(0.03, 0.18, preHit));
      float glintFadeOut = swooshFadeOut;
      float burstIntensity = burstWindow * glintFadeOut;
      
      float spotShape = 1.0 - smoothstep(0.0, 0.2, distance(n, starPos));
      float burstCore = 1.0 - smoothstep(0.0, 0.16, distance(n, starPos));
      float burstHalo = 1.0 - smoothstep(0.0, 0.34, distance(n, starPos));
      color += vec3(0.48, 0.96, 1.0) * spotShape * burstIntensity * 1.6;
      color += vec3(0.82, 1.0, 1.0) * burstHalo * burstIntensity * 1.25;
      color += vec3(1.0, 1.0, 1.0) * burstCore * burstIntensity * 2.8;

      float combinedStar = clamp(starShape * 1.0 + diagonalStar * 0.85 + pinStar * 0.65, 0.0, 1.0);
      float starMask = smoothstep(-0.05, 0.05, preHit) * glintFadeOut;
      float starCore = 1.0 - smoothstep(0.0, 0.05, dCenter);
      float starHotCore = 1.0 - smoothstep(0.0, 0.022, dCenter);
      float glintView = pow(smoothstep(0.12, 0.92, dot(starPos, viewDir)), 1.6);
      float chromaFringe = smoothstep(0.035, 0.085, dCenter) * (1.0 - smoothstep(0.085, 0.18, dCenter));
      color = mix(color, vec3(1.0), combinedStar * starMask);

      float glintIntensity = smoothstep(-0.02, 0.08, preHit) * (1.0 - smoothstep(0.08, 0.32, preHit)) * glintFadeOut;
      float starGlow = 1.0 - smoothstep(0.0, 0.45, dCenter);
      float halo = smoothstep(0.18, 0.3, dCenter) * (1.0 - smoothstep(0.3, 0.48, dCenter));
      float glintBloom = 1.0 - smoothstep(0.0, 0.7, dCenter);
      float glintOuterBloom = 1.0 - smoothstep(0.0, 1.0, dCenter);
      
      color += vec3(1.0, 0.99, 0.98) * starHotCore * glintIntensity * glintView * 2.1;
      color += vec3(0.96, 0.98, 1.0) * starCore * glintIntensity * glintView * 1.35;
      color += vec3(0.7, 0.9, 1.0) * starGlow * glintIntensity * (0.9 + 0.5 * glintView);
      color += vec3(0.5, 0.85, 1.0) * halo * glintIntensity * 0.95;
      color += vec3(0.6, 0.82, 1.0) * chromaFringe * glintIntensity * 0.7;
      color += vec3(0.48, 0.94, 1.0) * glintBloom * glintIntensity * 0.9;
      color += vec3(0.3, 0.72, 1.0) * glintOuterBloom * glintIntensity * 0.45;

      float t1 = 1.0; float p1 = 0.4;
      vec3 d1P = vec3(sin(t1)*cos(p1), sin(p1), cos(t1)*cos(p1));
      float dot1 = 1.0 - smoothstep(0.02, 0.025, distance(n, d1P));
      float dot1Mask = smoothstep(0.9, 1.0, swooshEndTheta);
      color = mix(color, vec3(0.3, 0.6, 1.0), dot1 * dot1Mask * glintFadeOut);
      
      float t2 = 1.15; float p2 = 0.45;
      vec3 d2P = vec3(sin(t2)*cos(p2), sin(p2), cos(t2)*cos(p2));
      float dot2 = 1.0 - smoothstep(0.01, 0.015, distance(n, d2P));
      float dot2Mask = smoothstep(1.05, 1.15, swooshEndTheta);
      color = mix(color, vec3(0.3, 0.6, 1.0), dot2 * dot2Mask * glintFadeOut);

      gl_FragColor = vec4(color, 1.0);
    }
  `
);
