import React, { useEffect, useRef } from "react";

const KochAntiSnowflake = ({ initialWidth, recursionDepth }) => {
  // Reference to the canvas element
  const canvasRef = useRef(null);

  useEffect(() => {
    // Function to perform trisection of a line
    function trisection(p1, p2, r) {
      return {
        x: (p1.x + r * p2.x) / (1 + r),
        y: (p1.y + r * p2.y) / (1 + r),
      };
    }

    // Function to rotate a point around another point
    function rotate(p, center, angle) {
      const translation = {
        x: p.x - center.x,
        y: p.y - center.y,
      };
      const theta = Math.atan2(translation.y, translation.x);
      const r = Math.sqrt(
        translation.x * translation.x + translation.y * translation.y
      );
      return {
        x: r * Math.cos(theta + angle) + center.x,
        y: r * Math.sin(theta + angle) + center.y,
      };
    }

    // Function to draw a line between two points
    function drawLine(p0, p1) {
      ctx.beginPath();

      ctx.strokeStyle = "#0081ff"; // Set line color
      ctx.moveTo(p0.x, p0.y); // Move to starting point
      ctx.lineTo(p1.x, p1.y); // Draw line to ending point

      ctx.lineWidth = 2; // Set line width
      ctx.stroke(); // Render the line

      ctx.beginPath();
      ctx.fillStyle = "#0081ff"; // Set point color
      ctx.arc(0, 0, 3, 0, 2 * Math.PI); // Draw a small circle at the end of the line
      ctx.fill(); // Render the point
    }

    // Function to recursively draw the Koch snowflake
    function recursiveKock(p0, p4, recursionDepth) {
      if (recursionDepth <= 0) {
        drawLine(p0, p4); // Draw line if recursion depth reached
      } else {
        const p1 = trisection(p0, p4, 1 / 2); // Find first trisection point
        const p3 = trisection(p0, p4, 2); // Find second trisection point
        const p2 = rotate(p3, p1, Math.PI / 3); // Rotate p3 around p1 by 60 degrees
        
        let points = [p0, p1, p2, p3, p4]; // Array to hold points
        for (let i = 0; i < 4; i++) {
          // Recursively draw smaller segments
          recursiveKock(points[i], points[i + 1], recursionDepth - 1);
        }
      }
    }

    // Canvas setup
    const canvas = canvasRef.current; // Get canvas element
    const ctx = canvas.getContext("2d"); // Get 2D context

    // Initial points of the triangle
    const p1 = { x: 0, y: 0 };
    const p2 = { x: initialWidth, y: 0 };
    const p3 = rotate(p2, p1, Math.PI / 3);

    // Function to clear canvas
    const clearCanvas = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transformation matrix
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    };

    clearCanvas(); // Clear canvas before drawing
    ctx.translate(
      (canvas.width - initialWidth) / 2,
      (canvas.height - initialWidth) / 2
    ); // Translate to center

    // Draw the three segments of the snowflake
    recursiveKock(p1, p2, recursionDepth);
    recursiveKock(p2, p3, recursionDepth);
    recursiveKock(p3, p1, recursionDepth);
  }, [initialWidth, recursionDepth]); // Update effect when initialWidth or recursionDepth changes

  // Return JSX for canvas element
  return (
    <canvas
      ref={canvasRef}
      width={1000}
      height={500}
      style={{ border: "1px solid #202122", borderRadius: "10px" }} // Style for canvas element
    />
  );
};

export default KochAntiSnowflake;
