import React from "react";

const Background: React.FC = () => {
  return (
    <div>
      <img
        src="/src/assets/RectangleGreen.svg"
        alt="Background 1"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <img
        src="/src/assets/Pattern.svg"
        alt="Background 2"
        className="absolute inset-0 w-full h-[443px] object-cover"
      />
    </div>
  );
};

export default Background;
