import React, { useContext } from "react";
// import { ColorConsumer } from "../contexts/color";
import ColorContext from "../contexts/color";

const ColorBox = () => {
  const { state } = useContext(ColorContext);
  return (
    // <ColorConsumer>
    //   {({ state }) => (
    <>
      <div
        style={{
          width: "64px",
          height: "64px",
          background: state.color
        }}
      />
      <div
        style={{
          width: "32px",
          height: "32px",
          background: state.subcolor
        }}
      />
    </>
    //   )}
    // </ColorConsumer>
  );
};

export default ColorBox;
