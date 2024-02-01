import React from "react";
import "./App.css";
import PythagorasTree from "./components/Fractals/PythagorasTree";
import SierpinskiCarpet from "./components/Fractals/SierpinskiCarpet";
import SierpinskiTriangle from "./components/Fractals/SierpinskiTriangle";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Setup from "./components/Setup/Setup";
import { Box } from "@mui/material";

function App() {
  const [isDrawerShown, setIsDrawerShown] = React.useState(false);
  const [angle, setAngle] = React.useState(45);
  const [width, setWidth] = React.useState(400);
  const [recursion, setRecursion] = React.useState(4);

  const [activeComponent, setActiveComponent] =
    React.useState("sierpinskiCarpet");

  const componentMap = {
    pythagorasTree: {
      component: PythagorasTree,
      props: {
        initialAngle: angle,
        initialWidth: width,
        recursionDepth: recursion,
      },
    },
    sierpinskiCarpet: {
      component: SierpinskiCarpet,
      props: {
        initialAngle: angle,
        initialWidth: width,
        recursionDepth: recursion,
      },
    },
    sierpinskiTriangle: {
      component: SierpinskiTriangle,
      props: {
        initialAngle: angle,
        initialWidth: width,
        recursionDepth: recursion,
      },
    },
  };

  const renderComponent = () => {
    const componentConfig = componentMap[activeComponent];
    return componentConfig ? (
      <componentConfig.component {...componentConfig.props} />
    ) : null;
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsDrawerShown(open);
  };

  return (
    <Box>
      <Header
        setIsDrawerShown={setIsDrawerShown}
        toggleDrawer={toggleDrawer}
        activeComponent={activeComponent}
      />
      {renderComponent()}
      <Footer />
      <Setup
        isDrawerShown={isDrawerShown}
        toggleDrawer={toggleDrawer}
        setAngle={setAngle}
        setWidth={setWidth}
        setRecursion={setRecursion}
        angle={angle}
        width={width}
        recursion={recursion}
        setActiveComponent={setActiveComponent}
        activeComponent={activeComponent}
      />
    </Box>
  );
}

export default App;
