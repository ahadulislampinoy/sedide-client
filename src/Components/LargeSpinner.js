import React from "react";

const LargeSpinner = ({ height = "h-screen" }) => {
  return (
    <div className={`flex justify-center items-center w-full ${height}`}>
      <div className="w-14 h-14 border-4 border-dashed rounded-full animate-spin border-white"></div>
    </div>
  );
};

export default LargeSpinner;
