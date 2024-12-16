"use client";
import createGlobe from "cobe";
import { useEffect, useRef } from "react";

function Cobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let phi = 0;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.1, 0.7, 0.8], // Medium blue base color
      markerColor: [0.1, 1, 0.1], // Green marker color
      glowColor: [0.5, 0.8, 1],
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.01;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="App">

      <canvas
        ref={canvasRef}
        style={{ width: "100%", maxWidth: "400px", height: "auto", aspectRatio: 0.9 }}
      />
    </div>
  );
}

export default Cobe;
