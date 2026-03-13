import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const packageJsonPath = path.join(repoRoot, 'package.json');
const shaderPath = path.join(repoRoot, 'components', 'GlobeShaderMaterial.ts');
const globePath = path.join(repoRoot, 'components', 'GlobeCanvas.tsx');
const animatedGlobePath = path.join(repoRoot, 'components', 'AnimatedGlobe.tsx');

test('site dependencies include the R3F packages required by the provided globe source', () => {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  assert.equal(typeof packageJson.dependencies?.['@react-three/fiber'], 'string');
  assert.equal(typeof packageJson.dependencies?.['@react-three/drei'], 'string');
});

test('ported shader file preserves the provided globe shader structure', () => {
  assert.equal(fs.existsSync(shaderPath), true, 'expected GlobeShaderMaterial.ts to exist');

  const shaderSource = fs.readFileSync(shaderPath, 'utf8');

  assert.match(shaderSource, /export const GlobeMaterial = shaderMaterial\(/);
  assert.match(shaderSource, /float swoosh_phi = 0\.52 \* theta \* theta \+ 0\.38 \* theta - 0\.5;/);
  assert.match(shaderSource, /float swooshAnimTime = uTime \* 0\.35;/);
  assert.match(shaderSource, /float starTheta = -0\.2;/);
  assert.match(shaderSource, /float preHit = swooshEndTheta - starTheta;/);
  assert.match(shaderSource, /float burstWindow = smoothstep\(-0\.03, 0\.03, preHit\) \* \(1\.0 - smoothstep\(0\.03, 0\.18, preHit\)\);/);
  assert.match(shaderSource, /float diagonalStar =/);
  assert.match(shaderSource, /float glintFadeOut = swooshFadeOut;/);
  assert.match(shaderSource, /float starMask = smoothstep\(-0\.05, 0\.05, preHit\) \* glintFadeOut;/);
  assert.match(shaderSource, /color = mix\(color, vec3\(1\.0\), combinedStar \* starMask\);/);
  assert.match(shaderSource, /float glintBloom = 1\.0 - smoothstep\(0\.0, 0\.7, dCenter\);/);
  assert.match(shaderSource, /float burstCore = 1\.0 - smoothstep\(0\.0, 0\.16, distance\(n, starPos\)\);/);
  assert.doesNotMatch(shaderSource, /shockwave/);
  assert.doesNotMatch(shaderSource, /ripple/);
  assert.match(shaderSource, /float starCore = 1\.0 - smoothstep\(0\.0, 0\.05, dCenter\);/);
  assert.match(shaderSource, /float starHotCore = 1\.0 - smoothstep\(0\.0, 0\.022, dCenter\);/);
  assert.match(shaderSource, /float glintView = pow\(smoothstep\(0\.12, 0\.92, dot\(starPos, viewDir\)\), 1\.6\);/);
  assert.match(shaderSource, /float chromaFringe = smoothstep\(0\.035, 0\.085, dCenter\) \* \(1\.0 - smoothstep\(0\.085, 0\.18, dCenter\)\);/);
  assert.match(shaderSource, /float t2 = 1\.15; float p2 = 0\.45;/);
});

test('ported globe canvas keeps the source scene structure', () => {
  assert.equal(fs.existsSync(globePath), true, 'expected GlobeCanvas.tsx to exist');

  const globeSource = fs.readFileSync(globePath, 'utf8');

  assert.match(globeSource, /sphereGeometry args=\{\[2, 64, 64\]\}/);
  assert.match(globeSource, /cameraZ\?: number;/);
  assert.match(globeSource, /camera=\{\{ position: \[0, 0, cameraZ\], fov: 45 \}\}/);
  assert.match(globeSource, /OrbitControls enableZoom=\{false\} enablePan=\{false\}/);
});

test('animated globe uses a less aggressive camera distance so the orb is not clipped', () => {
  assert.equal(fs.existsSync(animatedGlobePath), true, 'expected AnimatedGlobe.tsx to exist');

  const animatedGlobeSource = fs.readFileSync(animatedGlobePath, 'utf8');

  assert.match(animatedGlobeSource, /<GlobeCanvas transparentBackground cameraZ=\{5\.8\} \/>/);
});
