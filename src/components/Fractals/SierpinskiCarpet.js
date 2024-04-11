import React, { useEffect, useRef } from "react";

const SierpinskiCarpet = ({ initialWidth, recursionDepth }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function drawSquare(ctx, x, y, size) {
      ctx.fillStyle = "#0081ff";
      ctx.fillRect(x - size / 2, y - size / 2, size, size);
    }

    function drawSierpinskiCarpet(ctx, x, y, size, depth) {
      if (depth === 0) {
        return;
      }

      const newSize = size / 3;

      drawSquare(ctx, x, y, newSize);

      drawSierpinskiCarpet(ctx, x - newSize, y - newSize, newSize, depth - 1);
      drawSierpinskiCarpet(ctx, x, y - newSize, newSize, depth - 1);
      drawSierpinskiCarpet(ctx, x + newSize, y - newSize, newSize, depth - 1);
      drawSierpinskiCarpet(ctx, x - newSize, y, newSize, depth - 1);
      drawSierpinskiCarpet(ctx, x + newSize, y, newSize, depth - 1);
      drawSierpinskiCarpet(ctx, x - newSize, y + newSize, newSize, depth - 1);
      drawSierpinskiCarpet(ctx, x, y + newSize, newSize, depth - 1);
      drawSierpinskiCarpet(ctx, x + newSize, y + newSize, newSize, depth - 1);
    }

    const clearCanvas = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const drawSierpinskiCarpetOnCanvas = () => {
      clearCanvas();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      drawSierpinskiCarpet(ctx, 0, 0, initialWidth, recursionDepth);
    };

    drawSierpinskiCarpetOnCanvas();
  }, [initialWidth, recursionDepth]);

  return (
    <canvas
      ref={canvasRef}
      width={1000}
      height={500}
      style={{ border: "1px solid #202122", borderRadius: "10px" }}
    />
  );
};

export default SierpinskiCarpet;
