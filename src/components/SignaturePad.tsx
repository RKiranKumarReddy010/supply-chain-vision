import { useEffect, useRef, useState, useCallback } from "react";
import { Eraser, Fingerprint, Sparkles } from "lucide-react";

type Point = { x: number; y: number };

interface SignaturePadProps {
  onInkChange?: (hasInk: boolean) => void;
}

// Helper to evaluate cubic bezier
function cubicBezier(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;

  return {
    x: uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x,
    y: uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y,
  };
}

// Helper to evaluate quadratic bezier
function quadBezier(p0: Point, p1: Point, p2: Point, t: number): Point {
  const u = 1 - t;
  return {
    x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x,
    y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y,
  };
}

function sampleCubic(p0: Point, p1: Point, p2: Point, p3: Point, steps = 24): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i <= steps; i++) {
    pts.push(cubicBezier(p0, p1, p2, p3, i / steps));
  }
  return pts;
}

function sampleQuad(p0: Point, p1: Point, p2: Point, steps = 18): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i <= steps; i++) {
    pts.push(quadBezier(p0, p1, p2, i / steps));
  }
  return pts;
}

// Generate realistic, elegant executive cursive signature
function generateDummySignature(w: number, h: number): Point[][] {
  const strokes: Point[][] = [];

  // ----------------------------------------------------
  // Stroke 1: Executive Monogram / Initial Capital Flourish (e.g. Stylized 'R' / 'K')
  // ----------------------------------------------------
  const stroke1: Point[] = [
    // 1. Entry up-sweep & top loop
    ...sampleCubic(
      { x: w * 0.14, y: h * 0.68 },
      { x: w * 0.16, y: h * 0.36 },
      { x: w * 0.20, y: h * 0.18 },
      { x: w * 0.24, y: h * 0.22 },
      16
    ),
    // 2. Loop down the main spine
    ...sampleCubic(
      { x: w * 0.24, y: h * 0.22 },
      { x: w * 0.26, y: h * 0.28 },
      { x: w * 0.21, y: h * 0.54 },
      { x: w * 0.18, y: h * 0.74 },
      18
    ),
    // 3. Loop back up into upper lobe
    ...sampleCubic(
      { x: w * 0.18, y: h * 0.74 },
      { x: w * 0.20, y: h * 0.44 },
      { x: w * 0.28, y: h * 0.28 },
      { x: w * 0.29, y: h * 0.42 },
      18
    ),
    // 4. Center knot and flourish kick-out leg
    ...sampleCubic(
      { x: w * 0.29, y: h * 0.42 },
      { x: w * 0.27, y: h * 0.52 },
      { x: w * 0.22, y: h * 0.53 },
      { x: w * 0.27, y: h * 0.62 },
      14
    ),
    ...sampleCubic(
      { x: w * 0.27, y: h * 0.62 },
      { x: w * 0.31, y: h * 0.72 },
      { x: w * 0.33, y: h * 0.68 },
      { x: w * 0.35, y: h * 0.58 },
      14
    ),
  ];
  strokes.push(stroke1);

  // ----------------------------------------------------
  // Stroke 2: Cursive Connected Script with Authentic Loops
  // ----------------------------------------------------
  const stroke2: Point[] = [
    // 1. Tall ascender loop (like cursive 'l' or 't')
    ...sampleCubic(
      { x: w * 0.35, y: h * 0.58 },
      { x: w * 0.37, y: h * 0.42 },
      { x: w * 0.40, y: h * 0.24 },
      { x: w * 0.39, y: h * 0.22 },
      14
    ),
    ...sampleCubic(
      { x: w * 0.39, y: h * 0.22 },
      { x: w * 0.36, y: h * 0.28 },
      { x: w * 0.38, y: h * 0.52 },
      { x: w * 0.41, y: h * 0.64 },
      16
    ),
    // 2. Smooth cursive arch ('r' / 'n')
    ...sampleQuad(
      { x: w * 0.41, y: h * 0.64 },
      { x: w * 0.44, y: h * 0.44 },
      { x: w * 0.47, y: h * 0.47 },
      12
    ),
    ...sampleQuad(
      { x: w * 0.47, y: h * 0.47 },
      { x: w * 0.49, y: h * 0.65 },
      { x: w * 0.52, y: h * 0.62 },
      12
    ),
    // 3. Flowing mid loop ('e' / 'a')
    ...sampleCubic(
      { x: w * 0.52, y: h * 0.62 },
      { x: w * 0.55, y: h * 0.42 },
      { x: w * 0.58, y: h * 0.44 },
      { x: w * 0.55, y: h * 0.66 },
      16
    ),
    // 4. Secondary rhythm arch & ascender sweep
    ...sampleCubic(
      { x: w * 0.55, y: h * 0.66 },
      { x: w * 0.58, y: h * 0.60 },
      { x: w * 0.62, y: h * 0.34 },
      { x: w * 0.65, y: h * 0.30 },
      14
    ),
    ...sampleCubic(
      { x: w * 0.65, y: h * 0.30 },
      { x: w * 0.63, y: h * 0.40 },
      { x: w * 0.66, y: h * 0.64 },
      { x: w * 0.70, y: h * 0.62 },
      14
    ),
    // 5. Elegant terminal trailing flick
    ...sampleCubic(
      { x: w * 0.70, y: h * 0.62 },
      { x: w * 0.73, y: h * 0.48 },
      { x: w * 0.76, y: h * 0.52 },
      { x: w * 0.81, y: h * 0.48 },
      14
    ),
  ];
  strokes.push(stroke2);

  // ----------------------------------------------------
  // Stroke 3: Dynamic Underline Flourish with Graceful Curve
  // ----------------------------------------------------
  const stroke3: Point[] = [
    ...sampleCubic(
      { x: w * 0.16, y: h * 0.82 },
      { x: w * 0.38, y: h * 0.86 },
      { x: w * 0.65, y: h * 0.84 },
      { x: w * 0.86, y: h * 0.72 },
      26
    ),
  ];
  strokes.push(stroke3);

  // ----------------------------------------------------
  // Stroke 4: Signature Accent / Dot
  // ----------------------------------------------------
  const dot1X = w * 0.39;
  const dot1Y = h * 0.17;
  strokes.push([
    { x: dot1X, y: dot1Y },
    { x: dot1X + 1.2, y: dot1Y + 1.2 },
  ]);

  const dot2X = w * 0.89;
  const dot2Y = h * 0.71;
  strokes.push([
    { x: dot2X, y: dot2Y },
    { x: dot2X + 1.5, y: dot2Y + 1.5 },
  ]);

  return strokes;
}

export default function SignaturePad({ onInkChange }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokesRef = useRef<Point[][]>([]);
  const drawingRef = useRef(false);
  const inkRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);

  const [hasInk, setHasInk] = useState(false);
  const [holding, setHolding] = useState(false);
  const [holdCoords, setHoldCoords] = useState<{ x: number; y: number } | null>(null);

  // Long press tracking refs
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressStartPosRef = useRef<Point | null>(null);
  const autoSignedRef = useRef(false);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const sx = canvas.width / Math.max(1, rect.width);
    const sy = canvas.height / Math.max(1, rect.height);
    ctx.setTransform(sx, 0, 0, sy, 0, 0);
    ctx.strokeStyle = "hsl(0 0% 96%)";
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    for (const stroke of strokesRef.current) {
      if (!stroke || stroke.length === 0) continue;
      if (stroke.length === 1) {
        ctx.beginPath();
        ctx.arc(stroke[0].x, stroke[0].y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = "hsl(0 0% 96%)";
        ctx.fill();
        continue;
      }
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      for (let i = 1; i < stroke.length - 1; i++) {
        const mx = (stroke[i].x + stroke[i + 1].x) / 2;
        const my = (stroke[i].y + stroke[i + 1].y) / 2;
        ctx.quadraticCurveTo(stroke[i].x, stroke[i].y, mx, my);
      }
      ctx.lineTo(stroke[stroke.length - 1].x, stroke[stroke.length - 1].y);
      ctx.stroke();
    }
  }, []);

  const autoSign = useCallback((animate = true) => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(1, rect.width);
    const h = Math.max(1, rect.height);

    const generatedStrokes = generateDummySignature(w, h);

    if (!animate) {
      strokesRef.current = generatedStrokes;
      inkRef.current = true;
      setHasInk(true);
      onInkChange?.(true);
      redraw();
      return;
    }

    // Smooth progressive cursive drawing animation
    strokesRef.current = [];
    let currentStrokeIdx = 0;
    let currentPointIdx = 0;

    const stepDraw = () => {
      if (currentStrokeIdx >= generatedStrokes.length) {
        inkRef.current = true;
        setHasInk(true);
        onInkChange?.(true);
        redraw();
        animFrameRef.current = null;
        return;
      }

      if (!strokesRef.current[currentStrokeIdx]) {
        strokesRef.current[currentStrokeIdx] = [];
      }

      const targetStroke = generatedStrokes[currentStrokeIdx];
      const pointsToAdd = Math.min(3, targetStroke.length - currentPointIdx);

      for (let i = 0; i < pointsToAdd; i++) {
        strokesRef.current[currentStrokeIdx].push(targetStroke[currentPointIdx]);
        currentPointIdx++;
      }

      redraw();

      if (currentPointIdx >= targetStroke.length) {
        currentStrokeIdx++;
        currentPointIdx = 0;
      }

      animFrameRef.current = requestAnimationFrame(stepDraw);
    };

    animFrameRef.current = requestAnimationFrame(stepDraw);
    inkRef.current = true;
    setHasInk(true);
    onInkChange?.(true);
  }, [onInkChange, redraw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      redraw();
    };
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [redraw]);

  const getPos = (e: React.PointerEvent): Point => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const cancelLongPress = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    setHolding(false);
    setHoldCoords(null);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    canvasRef.current?.setPointerCapture(e.pointerId);

    const pos = getPos(e);
    longPressStartPosRef.current = pos;
    autoSignedRef.current = false;
    setHolding(true);
    setHoldCoords(pos);

    // 450ms long press threshold
    longPressTimerRef.current = setTimeout(() => {
      autoSignedRef.current = true;
      drawingRef.current = false;
      cancelLongPress();
      try {
        if (typeof navigator !== "undefined" && navigator.vibrate) {
          navigator.vibrate([25, 20, 25]);
        }
      } catch {
        // ignore vibration permission errors
      }
      autoSign(true);
    }, 450);

    drawingRef.current = true;
    strokesRef.current.push([pos]);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!drawingRef.current || autoSignedRef.current) return;
    const pos = getPos(e);

    // Cancel long press if user deliberately drags to draw (> 8px movement)
    if (longPressStartPosRef.current) {
      const dx = pos.x - longPressStartPosRef.current.x;
      const dy = pos.y - longPressStartPosRef.current.y;
      if (Math.hypot(dx, dy) > 8) {
        cancelLongPress();
      }
    }

    const strokes = strokesRef.current;
    if (strokes.length > 0) {
      strokes[strokes.length - 1].push(pos);
      redraw();
      if (!inkRef.current) {
        inkRef.current = true;
        setHasInk(true);
        onInkChange?.(true);
      }
    }
  };

  const endStroke = (e: React.PointerEvent) => {
    cancelLongPress();
    drawingRef.current = false;
    const canvas = canvasRef.current;
    if (canvas) {
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        // capture may already be released
      }
    }
  };

  const clear = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    strokesRef.current = [];
    inkRef.current = false;
    setHasInk(false);
    onInkChange?.(false);
    redraw();
  };

  return (
    <div>
      <div className="relative rounded-lg border border-border bg-background overflow-hidden select-none">
        <canvas
          ref={canvasRef}
          className="block w-full h-36 sm:h-40 touch-none cursor-crosshair"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endStroke}
          onPointerCancel={endStroke}
        />

        {/* Long Press Visual Feedback */}
        {holding && holdCoords && (
          <div
            className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
            style={{ left: holdCoords.x, top: holdCoords.y }}
          >
            <div className="h-14 w-14 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            <div className="absolute h-8 w-8 rounded-full bg-primary/20 animate-ping" />
          </div>
        )}

        {!hasInk && !holding && (
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center gap-2 text-muted-foreground/60">
            <Fingerprint className="h-6 w-6" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em]">
              Sign or press &amp; hold to auto-sign
            </span>
          </div>
        )}

        <div
          className="absolute inset-x-6 bottom-3 border-b-2 border-dashed border-border-strong/70 pointer-events-none"
          aria-hidden
        />
      </div>

      <div className="mt-2 flex items-center justify-between gap-2 flex-wrap">
        <span className="text-[11px] font-mono text-muted-foreground/70 uppercase tracking-wider">
          Long press pad or button
        </span>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => autoSign(true)}
            className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-primary hover:text-primary/80 transition-colors font-semibold"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Auto-Sign
          </button>

          <button
            type="button"
            onClick={clear}
            disabled={!hasInk}
            className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
          >
            <Eraser className="h-3.5 w-3.5" />
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
