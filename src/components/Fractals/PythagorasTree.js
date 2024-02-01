import React, { useEffect, useRef } from "react";

const degToRad = (degrees) => degrees * (Math.PI / 180);

const PythagorasTree = ({ initialAngle, initialWidth, recursionDepth }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function drawPythagorasTree(depth, branchWidth, branchAngle) {
      if (depth <= 0) {
        return;
      }

      ctx.strokeStyle = "#0081ff";
      ctx.beginPath();
      ctx.rect(0, 0, branchWidth, -branchWidth);
      ctx.stroke();

      ctx.beginPath();
      ctx.fillStyle = "#0081ff";
      ctx.arc(0, 0, 3, 0, 2 * Math.PI);
      ctx.fill();

      let rotatedAngle = degToRad(branchAngle);
      let complementaryAngle = degToRad(90 - branchAngle);
      let leftBranchWidth = Math.cos(rotatedAngle) * branchWidth;
      let rightBranchWidth = Math.cos(complementaryAngle) * branchWidth;
      let rightBranchHeight = Math.sin(complementaryAngle) * rightBranchWidth;
      let horizontalOffset = Math.sqrt(
        Math.pow(leftBranchWidth, 2) - Math.pow(rightBranchHeight, 2)
      );
      let rightBranchRotation =
        (Math.asin(rightBranchHeight / rightBranchWidth) / Math.PI) * 180;

      console.log(
        `
        Iteration: ${depth.toFixed(2)}
        Root: ${branchWidth.toFixed(2)} X ${branchWidth.toFixed(2)}
        Left branch: ${leftBranchWidth.toFixed(2)} X ${leftBranchWidth.toFixed(
          2
        )}
        Right branch: ${rightBranchWidth.toFixed(
          2
        )} X ${rightBranchWidth.toFixed(2)}
        Angle: ${branchAngle.toFixed(2)} / ${rightBranchRotation.toFixed(2)}
 
        `
      );

      ctx.save();
      ctx.translate(0, -branchWidth);

      ctx.rotate(-rotatedAngle);
      drawPythagorasTree(depth - 1, leftBranchWidth, branchAngle);
      ctx.beginPath();
      ctx.fillStyle = "#0081ff";
      ctx.arc(0, 0, 3, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.translate(horizontalOffset, -branchWidth - rightBranchHeight);

      ctx.rotate(rightBranchRotation * (Math.PI / 180));
      drawPythagorasTree(depth - 1, rightBranchWidth, branchAngle);
      ctx.beginPath();
      ctx.fillStyle = "#0081ff";
      ctx.arc(0, 0, 3, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();
    }

    const clearCanvas = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const drawPythagorasTreeOnCanvas = () => {
      clearCanvas();
      ctx.translate(
        canvas.width / 2 - initialWidth / 2,
        canvas.height / 2 + 200
      );
      drawPythagorasTree(recursionDepth, initialWidth, initialAngle);
    };

    drawPythagorasTreeOnCanvas();
  }, [initialAngle, initialWidth, recursionDepth]);

  return (
    <canvas
      ref={canvasRef}
      width="1000px"
      height="500px"
      style={{ borderRadius: "10px" }}
    />
  );
};

export default PythagorasTree;
