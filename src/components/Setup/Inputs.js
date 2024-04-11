import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";

const Input = styled(MuiInput)`
  width: 42px;
`;

const SliderInput = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  inputProps,
  disabled, // Add disabled prop
}) => (
  <Box sx={{ width: 250 }}>
    <Typography id={`${label}-input-slider`} gutterBottom>
      {label}
    </Typography>
    <Grid container spacing={2} alignItems="center">
      <Grid item></Grid>
      <Grid item xs>
        <Slider
          value={typeof value === "number" ? value : 0}
          onChange={onChange}
          aria-labelledby={`${label}-input-slider`}
          step={step}
          min={min}
          max={max}
          disabled={disabled} // Pass disabled prop to Slider component
        />
      </Grid>
      <Grid item>
        <Input
          value={value}
          size="small"
          inputProps={{
            step,
            min,
            max,
            type: "number",
            "aria-labelledby": `${label}-input-slider`,
            ...inputProps,
          }}
          onChange={(event) =>
            onChange(event.target.value === "" ? 0 : Number(event.target.value))
          }
          disabled={disabled} // Pass disabled prop to Input component
        />
      </Grid>
    </Grid>
  </Box>
);

export default function InputSlider({
  setAngle,
  setWidth,
  setRecursion,
  angle,
  width,
  recursion,
  activeComponent,
}) {
  const maxMap = {
    pythagorasTree: { max: 100, min: 50, disabled: false },
    sierpinskiCarpet: { max: 500, min: 50, disabled: false },
    sierpinskiTriangle: { max: 500, min: 50, disabled: false },
    kochSnowflake: { max: 500, min: 50, disabled: false },
    kochAntiSnowflake: { max: 500, min: 10, disabled: false },
    mandelbrot: { max: 500, min: 50, disabled: true },
    mandelbrotColor: { max: 500, min: 50, disabled: true },
  };
  const recursionMap = {
    pythagorasTree: { max: 5, min: 40, disabled: false },
    sierpinskiCarpet: { max: 5, min: 0, disabled: false },
    sierpinskiTriangle: { max: 5, min: 0, disabled: false },
    kochSnowflake: { max: 5, min: 0, disabled: false },
    kochAntiSnowflake: { max: 6, min: 0, disabled: false },
    mandelbrot: { max: 1000, min: 0, disabled: false },
    mandelbrotColor: { max: 10, min: 0, disabled: true },
  };

  return (
    <>
      {activeComponent === "pythagorasTree" && (
        <SliderInput
          label="Angle"
          value={angle}
          onChange={(event, newValue) => setAngle(newValue)}
          min={0}
          max={90}
          step={5}
          disabled={maxMap[activeComponent].disabled} // Pass disabled prop
        />
      )}

      <SliderInput
        label="Recursion"
        value={recursion}
        onChange={(event, newValue) => setRecursion(newValue)}
        min={recursionMap[activeComponent].min}
        max={recursionMap[activeComponent].max}
        step={1}
        disabled={recursionMap[activeComponent].disabled} // Pass disabled prop
      />
      <SliderInput
        label="Width"
        value={width}
        onChange={(event, newValue) => setWidth(newValue)}
        min={maxMap[activeComponent].min}
        max={maxMap[activeComponent].max}
        step={10}
        disabled={maxMap[activeComponent].disabled} // Pass disabled prop
      />
    </>
  );
}
