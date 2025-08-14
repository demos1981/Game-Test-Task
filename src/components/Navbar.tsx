import React from "react";
import StatusBar from "./StatusBar";

const Navbar: React.FC = () => {
  return (
    <>
      <section>
        <StatusBar />
        <div>
          <div className="relative  left-[-2rem] h-6  flex flex-row justify-center items-center ml-7">
            <img
              className="relative left-[51px] top-[-2px] z-10 "
              src="src/assets/Exclude.svg"
              alt="Exclude"
            />
            <img
              className="relative  z-20"
              src="src/assets/LogoText.svg"
              alt="LogoText"
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <img src="src/assets/Industry.svg" alt="Logo" />
        </div>
      </section>
    </>
  );
};

export default Navbar;
