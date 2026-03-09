import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';

import {
  DEFAULT_GLOBE_CONFIG,
  GLOBE_PALETTE,
  createAnimatedGlobeScene,
} from './animatedGlobeScene.js';

test('shared globe palette stays aligned with the CJN brand system', () => {
  assert.deepEqual(GLOBE_PALETTE, {
    shellTop: '#3b8dbf',
    shellBottom: '#165ff2',
    deepBlue: '#03318c',
    halo: '#f2f2f2',
    arc: '#f2f2f2',
    bubble: '#3b8dbf',
    marker: '#f29216',
  });
});

test('shared globe scene exposes the parts needed by live rendering and export rendering', () => {
  const scene = new THREE.Scene();
  const globe = createAnimatedGlobeScene(scene);

  assert.ok(globe.group instanceof THREE.Group);
  assert.ok(globe.shellMaterial);
  assert.ok(globe.arcMaterial);
  assert.equal(typeof globe.update, 'function');
  assert.equal(typeof globe.dispose, 'function');
});

test('shared globe scene uses deterministic defaults', () => {
  assert.equal(DEFAULT_GLOBE_CONFIG.cameraZ, 4.6);
  assert.equal(DEFAULT_GLOBE_CONFIG.shellRadius, 1);
  assert.equal(DEFAULT_GLOBE_CONFIG.haloOpacity, 0.5);
});
