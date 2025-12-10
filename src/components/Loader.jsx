import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const Loader = ({ className }) => {
  return (
    <div
      className={`${
        className ? className : ""
      } fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-50 z-50`}
    >
      <ThreeCircles
        visible={true}
        height="50"
        width="50"
        color="#1976d2"
        radius="9"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
