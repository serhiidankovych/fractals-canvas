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
        />
      )}

      <SliderInput
        label="Recursion"
        value={recursion}
        onChange={(event, newValue) => setRecursion(newValue)}
        min={0}
        max={
          activeComponent === "sierpinskiCarpet" ||
          activeComponent === "sierpinskiTriangle"
            ? 5
            : 10
        }
        step={1}
      />
      <SliderInput
        label="Width"
        value={width}
        onChange={(event, newValue) => setWidth(newValue)}
        min={0}
        max={
          activeComponent === "sierpinskiCarpet" ||
          activeComponent === "sierpinskiTriangle"
            ? 500
            : 200
        }
        step={10}
      />
    </>
  );
}
