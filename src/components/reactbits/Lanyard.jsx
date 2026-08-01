/* eslint-disable react/no-unknown-property */
'use client';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

// replace with your own imports, see the usage snippet for details
import cardGLB from './card.glb';
import lanyard from './lanyard.png';

import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

// ── Photo textures ──────────────────────────────────────────────────────────
// The card photos are loaded imperatively (NOT via suspending useTexture).
// If useTexture suspends on a profile switch, the whole Band unmounts out of
// the live rapier world; when it remounts, the rope/spherical joints fail to
// re-establish and the card free-falls out of frame. Loading without suspense
// means the physics scene is never torn down. Textures are cached per URL so
// revisiting a profile is instant.
const PHOTO_TEX_CACHE = new Map();

function usePhotoTexture(url) {
  const [tex, setTex] = useState(null);
  useEffect(() => {
    if (!url) {
      setTex(null);
      return;
    }
    if (PHOTO_TEX_CACHE.has(url)) {
      setTex(PHOTO_TEX_CACHE.get(url));
      return;
    }
    let alive = true;
    new THREE.TextureLoader().load(
      url,
      (t) => {
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = 16;
        PHOTO_TEX_CACHE.set(url, t);
        if (alive) setTex(t);
      },
      undefined,
      () => {}
    );
    return () => {
      alive = false;
    };
  }, [url]);
  return tex;
}

// The card model's front face is UV-mapped to the LEFT half of the texture
// atlas and the back face to the RIGHT half (measured from card.glb). Each
// custom image is composited into its own half so the two faces render
// independently, aspect-preserving (no stretching).
const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

// ── Custom-branded band ──────────────────────────────────────────────────────
// Landscape tile: U scrolls along the strap length, V across its width. The
// design is a white ribbon with black edge borders and a centred white
// logo badge that repeats along the strap. Used as the default band texture.
const STRAP_LOGO_URL = '/logo/1.png';

function buildBrandedStrap() {
  const W = 640; // along the strap (U)
  const H = 128; // across the strap (V)
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // ── Base: white ribbon with very subtle vertical shading for depth ────────
  const base = ctx.createLinearGradient(0, 0, 0, H);
  base.addColorStop(0,    '#eef1f7');
  base.addColorStop(0.18, '#fafbfe');
  base.addColorStop(0.5,  '#ffffff');
  base.addColorStop(0.82, '#fafbfe');
  base.addColorStop(1,    '#eef1f7');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, W, H);

  // ── Subtle weave texture ─────────────────────────────────────────────────
  ctx.fillStyle = 'rgba(0,0,0,0.04)';
  for (let y = 6; y < H - 6; y += 8) ctx.fillRect(0, y, W, 2);
  ctx.fillStyle = 'rgba(0,0,0,0.05)';
  for (let x = 0; x < W; x += 12) ctx.fillRect(x, 0, 1, H);

  // ── Black border lines along both edges ──────────────────────────────────
  ctx.fillStyle = 'rgba(10,12,18,0.92)';
  ctx.fillRect(0, 2, W, 3);     // top border
  ctx.fillRect(0, H - 5, W, 3); // bottom border

  // ── Logo badge (centred in the tile, white rounded rect) ────────────────
  const badgeW = 80;
  const badgeH = 80;
  const bx = W / 2 - badgeW / 2;
  const by = H / 2 - badgeH / 2;
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.55)';
  ctx.shadowBlur = 8;
  ctx.fillStyle = 'rgba(255,255,255,0.96)';
  ctx.beginPath();
  ctx.roundRect(bx, by, badgeW, badgeH, 10);
  ctx.fill();
  ctx.restore();
  // Badge border
  ctx.strokeStyle = 'rgba(41,171,226,0.5)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(bx, by, badgeW, badgeH, 10);
  ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 16;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;

  // Load the logo image into the badge area
  new THREE.TextureLoader().load(
    STRAP_LOGO_URL,
    (img) => {
      // Draw logo centred and fitted inside the badge with 8px padding
      const pad = 8;
      const iw = img.image.width || badgeW;
      const ih = img.image.height || badgeH;
      const scale = Math.min((badgeW - pad * 2) / iw, (badgeH - pad * 2) / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = bx + (badgeW - dw) / 2;
      const dy = by + (badgeH - dh) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(bx, by, badgeW, badgeH, 10);
      ctx.clip();
      ctx.drawImage(img.image, dx, dy, dw, dh);
      ctx.restore();
      tex.needsUpdate = true;
    },
    undefined,
    () => { tex.needsUpdate = true; }
  );
  return tex;
}

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1
}) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const wrapRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={wrapRef} className="lanyard-wrapper">
      <Canvas
        frameloop="always"
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.25 : 1.5]}
        gl={{ alpha: transparent, antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Suspense fallback={null}>
            <Band
              isMobile={isMobile}
              frontImage={frontImage}
              backImage={backImage}
              imageFit={imageFit}
              lanyardImage={lanyardImage}
              lanyardWidth={lanyardWidth}
            />
          </Suspense>
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}
function Band({
  maxSpeed = 20,
  minSpeed = 0,
  isMobile = false,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1
}) {
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef();
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 8, linearDamping: 8 };
  const { nodes, materials } = useGLTF(cardGLB);
  const texture = useTexture(lanyardImage || lanyard);
  // Photos load imperatively (never suspend) so switching profiles can never
  // unmount the physics scene — see usePhotoTexture above.
  const frontTex = usePhotoTexture(frontImage || null);
  const backTex = usePhotoTexture(backImage || null);

  // Custom band image takes priority; otherwise fall back to the branded
  // PQube strap (navy ribbon with the logo printed along it).
  const strapTex = useMemo(() => (lanyardImage ? texture : buildBrandedStrap()), [lanyardImage, texture]);

  // Composite the front/back images into the card's texture atlas (front = left
  // half, back = right half). Each image is drawn aspect-preserving (no stretch).
  const cardMap = useMemo(() => {
    const baseMap = materials.base.map;
    if (!frontImage && !backImage) return baseMap;

    const baseImg = baseMap.image;
    const W = baseImg.width;
    const H = baseImg.height;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return baseMap;
    // Keep the original baked atlas for the card edges and any untouched face.
    ctx.drawImage(baseImg, 0, 0, W, H);

    const drawFitted = (img, rect) => {
      const rx = rect.x * W;
      const ry = rect.y * H;
      const rw = rect.w * W;
      const rh = rect.h * H;
      const pick = imageFit === 'contain' ? Math.min : Math.max;
      const scale = pick(rw / img.width, rh / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = rx + (rw - dw) / 2;
      const dy = ry + (rh - dh) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    };

    if (frontImage && frontTex && frontTex.image) drawFitted(frontTex.image, FRONT_UV_RECT);
    if (backImage && backTex && backTex.image) drawFitted(backTex.image, BACK_UV_RECT);

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [frontImage, backImage, imageFit, frontTex, backTex, materials.base.map]);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  // Preallocated scratch buffers — no per-frame allocations, so the band
  // rebuild never causes GC hiccups.
  const linePoints = useMemo(
    () => Array.from({ length: (isMobile ? 12 : 24) + 1 }, () => new THREE.Vector3()),
    [isMobile]
  );
  const lineDivisions = isMobile ? 12 : 24;
  const tmpPoint = useMemo(() => new THREE.Vector3(), []);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useEffect(() => {
    window.__ldMounts = (window.__ldMounts || 0) + 1;
    return () => { window.__ldUnmounts = (window.__ldUnmounts || 0) + 1; };
  }, []);

  // Debug publisher — exposes live state for QA probes (inert in prod)
  useFrame((state) => {
    try {
      window.__ldFrames = (window.__ldFrames || 0) + 1;
      let cardPos = null;
      try {
        const t = card.current?.translation?.();
        cardPos = t ? [t.x, t.y, t.z].map((v) => +v.toFixed(2)) : 'no-vec';
      } catch (e) { cardPos = 'err:' + String(e).slice(0, 60); }
      window.__lanyardDebug = {
        frames: window.__ldFrames,
        cardPos,
        triangles: state.gl.info.render.triangles,
        mounts: window.__ldMounts || 0,
        unmounts: window.__ldUnmounts || 0,
        camPos: state.camera.position.toArray().map(v => +v.toFixed(1)),
      };
    } catch (e) {
      window.__lanyardDebug = { err: String(e).slice(0, 120) };
    }
  });

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      for (let i = 0; i <= lineDivisions; i++) {
        curve.getPoint(i / lineDivisions, linePoints[i]);
      }
      if (band.current?.geometry) {
        band.current.geometry.setPoints(linePoints);
      }
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  strapTex.wrapS = strapTex.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={e => (
              e.target.setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            )}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardMap}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band} frustumCulled={false} raycast={() => null}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={strapTex}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}
