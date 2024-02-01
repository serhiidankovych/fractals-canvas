import React, { useEffect, useRef } from "react";

const SierpinskiTriangle = ({ initialWidth, recursionDepth }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function drawTriangle(ctx, x, y, size) {
      ctx.beginPath();
      ctx.strokeStyle = "#0081ff";
      ctx.lineWidth = 2;
      ctx.moveTo(x, y);
      ctx.lineTo(x + size / 2, y + size);
      ctx.lineTo(x - size / 2, y + size);
      ctx.closePath();
      ctx.stroke();
    }

    function drawSierpinskiTriangle(ctx, x, y, size, depth) {
      if (depth === 0) {
        drawTriangle(ctx, x, y, size);
      } else {
        const newSize = size / 2;

        drawSierpinskiTriangle(ctx, x, y, newSize, depth - 1);
        drawSierpinskiTriangle(
          ctx,
          x + newSize / 2,
          y + newSize,
          newSize,
          depth - 1
        );
        drawSierpinskiTriangle(
          ctx,
          x - newSize / 2,
          y + newSize,
          newSize,
          depth - 1
        );
      }
    }

    const clearCanvas = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const drawSierpinskiTriangleOnCanvas = () => {
      clearCanvas();
      ctx.translate(canvas.width / 2, (canvas.height - initialWidth) / 2);
      drawSierpinskiTriangle(ctx, 0, 0, initialWidth, recursionDepth);
    };

    drawSierpinskiTriangleOnCanvas();
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

export default SierpinskiTriangle;
