import React from "react";

const SmallSpinner = ({ borderColor = "border-white" }) => {
  return (
    <div className="flex justify-center">
      <div
        className={`w-5 h-5 border-2 border-dashed rounded-full animate-spin ${borderColor}`}
      ></div>
    </div>
  );
};

export default SmallSpinner;
