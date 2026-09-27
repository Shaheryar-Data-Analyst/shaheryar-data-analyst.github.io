import { useEffect, useRef } from 'react';
import './HeroAtmosphere.css';

const TEXTURE_SIZE = 160;
const FRAME_INTERVAL = 1000 / 30;

function noise(x: number, y: number, seed: number) {
  const hash = (a: number, b: number) => {
    const value = Math.sin(a * 127.1 + b * 311.7 + seed * 74.7) * 43758.5453;
    return value - Math.floor(value);
  };
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  const top = hash(ix, iy) * (1 - sx) + hash(ix + 1, iy) * sx;
  const bottom = hash(ix, iy + 1) * (1 - sx) + hash(ix + 1, iy + 1) * sx;
  return top * (1 - sy) + bottom * sy;
}

// Only these small textures are computed pixel by pixel. Animation draws them
// as softly stretched, overlapping wisps rather than recalculating noise.
function createSmokeTexture(seed: number) {
  const texture = document.createElement('canvas');
  texture.width = TEXTURE_SIZE;
  texture.height = TEXTURE_SIZE;
  const context = texture.getContext('2d');
  if (!context) return texture;

  const pixels = context.createImageData(TEXTURE_SIZE, TEXTURE_SIZE);
  for (let y = 0; y < TEXTURE_SIZE; y += 1) {
    for (let x = 0; x < TEXTURE_SIZE; x += 1) {
      const u = x / TEXTURE_SIZE;
      const v = y / TEXTURE_SIZE;
      const warpX = noise(u * 3, v * 3, seed + 1) - 0.5;
      const warpY = noise(u * 3, v * 3, seed + 2) - 0.5;
      let cloud = 0;
      let frequency = 3;
      let weight = 0.55;
      for (let octave = 0; octave < 4; octave += 1) {
        cloud += noise((u + warpX * 0.28) * frequency, (v + warpY * 0.28) * frequency, seed) * weight;
        frequency *= 2;
        weight *= 0.5;
      }
      const edge = Math.pow(Math.max(0, Math.sin(Math.PI * u) * Math.sin(Math.PI * v)), 1.5);
      const density = Math.pow(Math.max(0, cloud - 0.28), 1.45);
      const index = (y * TEXTURE_SIZE + x) * 4;
      pixels.data[index] = 232;
      pixels.data[index + 1] = 218;
      pixels.data[index + 2] = 188;
      pixels.data[index + 3] = Math.min(150, density * edge * 370);
    }
  }
  context.putImageData(pixels, 0, 0);
  return texture;
}

export default function HeroAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    const textures = [createSmokeTexture(13), createSmokeTexture(31), createSmokeTexture(59)];
    const mask = document.createElement('canvas');
    const maskContext = mask.getContext('2d');
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let elapsed = 0;
    let lastFrame = 0;
    let frame: number | null = null;
    let visible = false;
    let disposed = false;

    function draw() {
      if (!context || !canvas || width === 0 || height === 0) return;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = 'source-over';
      const mobile = width < 768;

      for (let index = 0; index < 23; index += 1) {
        const floor = index < 14;
        const offset = ((index * 0.61803398875) % 1);
        const phase = (elapsed / (floor ? 28 + index : 22 + index) + offset) % 1;
        const envelope = Math.pow(Math.sin(phase * Math.PI), 1.3);
        const wave = Math.sin(elapsed * 0.16 + index * 1.7);
        const x = floor
          ? (mobile ? 0.03 : 0.29) + offset * (mobile ? 0.94 : 0.73) + (phase - 0.5) * 0.18
          : (mobile ? 0.69 : 0.83) + Math.sin(index * 2.4) * 0.10 + wave * 0.035;
        const y = floor ? 0.92 + Math.sin(index * 2.3) * 0.05 - phase * 0.035 : 1.12 - phase * 0.74;
        const puffWidth = width * (floor ? 0.33 + offset * 0.25 : 0.18 + phase * 0.17);
        const puffHeight = height * (floor ? 0.13 + offset * 0.10 : 0.30 + phase * 0.18);
        const spotlight = floor ? 0.75 + 0.25 * Math.max(0, 1 - Math.abs(x - 0.76) * 3) : 1;

        context.save();
        context.translate(x * width, (y + wave * 0.014) * height);
        context.rotate(floor ? wave * 0.055 : wave * 0.11 - 0.14);
        context.globalAlpha = envelope * spotlight * (floor ? 0.34 : 0.24);
        context.drawImage(textures[index % textures.length], -puffWidth / 2, -puffHeight / 2, puffWidth, puffHeight);
        context.restore();
      }

      if (maskContext) {
        context.globalAlpha = 1;
        context.globalCompositeOperation = 'destination-in';
        context.drawImage(mask, 0, 0, width, height);
      }
      context.globalCompositeOperation = 'source-over';
    }

    function resize() {
      if (!canvas || disposed) return;
      const bounds = canvas.getBoundingClientRect();
      width = Math.round(bounds.width);
      height = Math.round(bounds.height);
      if (width === 0 || height === 0) return;

      // Keep the smoke inexpensive even on large high-density displays.
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.25, 1100 / width, 850 / height);
      canvas.width = Math.max(1, Math.round(width * pixelRatio));
      canvas.height = Math.max(1, Math.round(height * pixelRatio));
      mask.width = canvas.width;
      mask.height = canvas.height;

      if (maskContext) {
        maskContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        const verticalFade = maskContext.createLinearGradient(0, 0, 0, height);
        verticalFade.addColorStop(0, 'rgba(255,255,255,0)');
        verticalFade.addColorStop(0.28, 'rgba(255,255,255,0)');
        verticalFade.addColorStop(0.48, 'rgba(255,255,255,0.5)');
        verticalFade.addColorStop(0.70, 'rgba(255,255,255,1)');
        verticalFade.addColorStop(1, 'rgba(255,255,255,0.8)');
        maskContext.fillStyle = verticalFade;
        maskContext.fillRect(0, 0, width, height);

        if (width >= 768) {
          maskContext.globalCompositeOperation = 'destination-in';
          const leftFade = maskContext.createLinearGradient(0, 0, width * 0.55, 0);
          leftFade.addColorStop(0, 'rgba(255,255,255,0)');
          leftFade.addColorStop(0.36, 'rgba(255,255,255,0.03)');
          leftFade.addColorStop(1, 'rgba(255,255,255,1)');
          maskContext.fillStyle = leftFade;
          maskContext.fillRect(0, 0, width, height);
        }

        // Reserve clear space around the portrait's face and shoulders.
        maskContext.globalCompositeOperation = 'destination-out';
        maskContext.save();
        maskContext.translate(width * (width < 768 ? 0.5 : 0.62), height * 0.25);
        maskContext.scale(width * 0.20, height * 0.29);
        const faceFade = maskContext.createRadialGradient(0, 0, 0, 0, 0, 1);
        faceFade.addColorStop(0, 'rgba(255,255,255,1)');
        faceFade.addColorStop(0.55, 'rgba(255,255,255,1)');
        faceFade.addColorStop(1, 'rgba(255,255,255,0)');
        maskContext.fillStyle = faceFade;
        maskContext.fillRect(-1, -1, 2, 2);
        maskContext.restore();
        maskContext.globalCompositeOperation = 'source-over';
      }
      draw();
    }

    function shouldAnimate() {
      return !disposed && visible && !document.hidden && !motionPreference.matches;
    }

    function tick(now: number) {
      frame = null;
      if (!shouldAnimate()) return;
      if (lastFrame === 0 || now - lastFrame >= FRAME_INTERVAL) {
        if (lastFrame !== 0) elapsed += Math.min((now - lastFrame) / 1000, 0.1);
        lastFrame = now;
        draw();
      }
      frame = window.requestAnimationFrame(tick);
    }

    function syncPlayback() {
      if (frame !== null) window.cancelAnimationFrame(frame);
      frame = null;
      lastFrame = 0;
      if (shouldAnimate()) frame = window.requestAnimationFrame(tick);
      else if (motionPreference.matches) draw();
    }

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });
    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', syncPlayback);
    motionPreference.addEventListener('change', syncPlayback);
    resize();

    return () => {
      disposed = true;
      if (frame !== null) window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', syncPlayback);
      motionPreference.removeEventListener('change', syncPlayback);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-atmosphere" aria-hidden="true" />;
}
