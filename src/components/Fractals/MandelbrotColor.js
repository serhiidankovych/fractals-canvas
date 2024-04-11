import React, { useEffect, useRef } from "react";

const MandelbrotColor = ({ initialWidth, recursionDepth }) => {
  // Create a reference to the canvas element
  const canvasRef = useRef(null);

  useEffect(() => {
    // Retrieve the canvas element and its 2D rendering context
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Define the width and height of the canvas
    const width = canvas.width;
    const height = canvas.height;

    // Define the range of values on the complex plane
    const w = 4; // Initial width of the complex plane
    const h = (w * height) / width; // Calculate corresponding height
    const xmin = -w / 2; // Left boundary of the complex plane
    const ymin = -h / 2; // Top boundary of the complex plane
    const maxiterations = 100; // Maximum number of iterations for each point
    const xmax = xmin + w; // Right boundary of the complex plane
    const ymax = ymin + h; // Bottom boundary of the complex plane
    const dx = (xmax - xmin) / width; // Increment for real component (x)
    const dy = (ymax - ymin) / height; // Increment for imaginary component (y)

    // Loop through each pixel on the canvas
    for (let j = 0; j < height; j++) {
      let y = ymin + j * dy; // Calculate the corresponding imaginary component
      for (let i = 0; i < width; i++) {
        let x = xmin + i * dx; // Calculate the corresponding real component
        let a = x; // Initialize the real component of the complex number
        let b = y; // Initialize the imaginary component of the complex number
        let n = 0; // Initialize the iteration count
        let max = 4.0; // Maximum squared magnitude for convergence
        let absOld = 0.0; // Initialize the previous absolute value
        let convergeNumber = maxiterations; // Initialize the convergence value

        // Iterate the Mandelbrot function for each pixel
        while (n < maxiterations) {
          let aa = a * a; // Real component squared
          let bb = b * b; // Imaginary component squared
          let abs = Math.sqrt(aa + bb); // Absolute value of the complex number
          if (abs > max) {
            // Check if the absolute value exceeds the threshold
            let diffToLast = abs - absOld; // Difference from the previous absolute value
            let diffToMax = max - absOld; // Difference from the maximum threshold
            convergeNumber = n + diffToMax / diffToLast; // Calculate the convergence value
            break; // Exit the loop if the absolute value exceeds the threshold
          }
          let twoab = 2.0 * a * b; // Intermediate value for the imaginary part
          a = aa - bb + x; // Update the real component using the Mandelbrot formula (z = z^2 + c)
          b = twoab + y; // Update the imaginary component using the Mandelbrot formula (z = z^2 + c)
          n++; // Increment the iteration count
          absOld = abs; // Update the previous absolute value
        }

        // Set the color of the pixel based on convergence
        if (n === maxiterations) {
          // If the maximum iterations are reached
          ctx.fillStyle = "black"; // Set color to black (point is within the set)
          ctx.fillRect(i, j, 1, 1); // Draw a black pixel at (i, j)
        } else {
          // If the point escaped within the maximum iterations
          let hue = (360 * (convergeNumber / maxiterations)) % 360; // Calculate hue based on convergence
          ctx.fillStyle = `hsl(${hue}, 100%, 50%)`; // Set color based on hue
          ctx.fillRect(i, j, 1, 1); // Draw a colored pixel at (i, j)
        }
      }
    }
  }, []);

  // Return the canvas element
  return (
    <canvas
      ref={canvasRef}
      width={1000}
      height={500}
      style={{ border: "1px solid #202122", borderRadius: "10px" }}
    />
  );
};

export default MandelbrotColor;
