import React from "react";
import { ScaleLoader } from "react-spinners";

const Loader = () => {
  return (
    <ScaleLoader
      color='#D46E0D'
      size={300}
      aria-label='Loading Spinner'
      data-testid='loader'
    />
  );
};

export default Loader;
