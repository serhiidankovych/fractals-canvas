import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import InputSlider from "./Inputs";

const Setup = ({
  isDrawerShown,
  toggleDrawer,
  setAngle,
  setWidth,
  setRecursion,
  angle,
  width,
  recursion,
  setActiveComponent,
  activeComponent,
}) => {
  const handleButtonClick = (component, recursionValue, widthValue) => {
    setActiveComponent(component);
    setRecursion(recursionValue);
    setWidth(widthValue);
  };

  const list = () => (
    <Box
      sx={{ width: 250, padding: "20px" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <InputSlider
        setAngle={setAngle}
        setWidth={setWidth}
        setRecursion={setRecursion}
        angle={angle}
        width={width}
        recursion={recursion}
        activeComponent={activeComponent}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "3px",
          marginTop: "10px",
        }}
      >
        <Button
          onClick={() => handleButtonClick("pythagorasTree", 7, 100)}
          variant="contained"
        >
          Pythagoras Tree
        </Button>
        <Button
          onClick={() => handleButtonClick("sierpinskiCarpet", 5, 450)}
          variant="contained"
        >
          Sierpinski Carpet
        </Button>
        <Button
          onClick={() => handleButtonClick("sierpinskiTriangle", 5, 250)}
          variant="contained"
        >
          Sierpinski Triangle
        </Button>
        <Button
          onClick={() => handleButtonClick("kochSnowflake", 5, 250)}
          variant="contained"
        >
          Koch Snowflake
        </Button>

        <Button
          onClick={() => handleButtonClick("kochAntiSnowflake", 5, 250)}
          variant="contained"
        >
          Koch Anti Snowflake
        </Button>
        <Button
          onClick={() => handleButtonClick("mandelbrot", 500, 0)}
          variant="contained"
        >
          Mandelbrot
        </Button>
        <Button
          onClick={() => handleButtonClick("mandelbrotColor", 5, 250)}
          variant="contained"
        >
          Color Mandelbrot
        </Button>
      </Box>
    </Box>
  );

  return (
    <Drawer
      open={isDrawerShown}
      onClose={() => toggleDrawer(false)}
      anchor="right"
    >
      {list()}
    </Drawer>
  );
};

export default Setup;
