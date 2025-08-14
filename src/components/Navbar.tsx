import React from "react";
import StatusBar from "./StatusBar";

const Navbar: React.FC = () => {
  return (
    <>
      <section className="flex flex-col items-center">
        <StatusBar />
        <div>
          <div className=" h-6  flex  justify-center items-center mt-6">
            <img
              className=""
              src="src/assets/WhiteGreenLogo.svg"
              alt="Exclude"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Navbar;
