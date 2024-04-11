import React, { useEffect, useRef } from "react";

const Mandelbrot = () => {
  // Reference to the canvas element
  const canvasRef = useRef(null);

  // Function to map a value from one range to another
  function mapRange(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
  }

  useEffect(() => {
    // Accessing the canvas element
    const canvas = canvasRef.current;
    // Getting the 2D rendering context
    const ctx = canvas.getContext("2d");
    // Canvas dimensions
    const width = 1000;
    const height = 500;
    // Maximum number of iterations to determine if a point is in the Mandelbrot set
    const maxIterations = 500;

    // Loop through each pixel on the canvas
    for (let pixelX = 0; pixelX < width; pixelX++) {
      for (let pixelY = 0; pixelY < height; pixelY++) {
        // Map pixel coordinates to the complex plane
        let real = mapRange(pixelX, 0, width, -2.5, 2.5);
        let imaginary = mapRange(pixelY, 0, height, -2.5, 2.5);

        let constantReal = real;
        let constantImaginary = imaginary;

        let iterationCount = 0;

        // Iterate the complex function z = z^2 + c until it diverges or max iterations are reached
        while (iterationCount < maxIterations) {
          let realSquared = real * real - imaginary * imaginary * 6;
          let imaginarySquared = 2 * real * imaginary;
          real = realSquared + constantReal;
          imaginary = imaginarySquared + constantImaginary;
          // Check if the point diverges (exits a certain radius)
          if (real * real + imaginary * imaginary > 16) {
            break;
          }
          iterationCount++;
        }

        // Color the pixel based on whether it diverged or not
        if (iterationCount === maxIterations) {
          ctx.fillStyle = "black";
          ctx.fillRect(pixelX, pixelY, 1, 1);
        } else {
          ctx.fillStyle = "#0081ff";
          ctx.fillRect(pixelX, pixelY, 1, 1);
        }
      }
    }
  }, []);

  // Render the canvas element
  return (
    <canvas
      ref={canvasRef}
      width={1000}
      height={500}
      style={{
        border: "1px solid #202122",
        borderRadius: "10px",
        backgroundColor: "#0081ff",
      }}
    />
  );
};

export default Mandelbrot;
