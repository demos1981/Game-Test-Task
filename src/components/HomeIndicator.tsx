import React from "react";

const HomeIndicator: React.FC = () => {
  return (
    <div className="flex justify-center items-center mt-2">
      <img
        className="h-2 w-[139px]"
        src="assets/HomeIndicator.svg"
        alt="Home"
      />
    </div>
  );
};

export default HomeIndicator;
