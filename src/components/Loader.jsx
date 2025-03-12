import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center bg-none">
      <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
