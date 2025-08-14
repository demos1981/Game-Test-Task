import React from "react";

const StatusBar: React.FC = () => {
  return (
    <section className="flex  items-center h-[3rem] ">
      <div className="flex ml-7 w-[13rem]">
        <img src="/src/assets/Time.svg" alt="timeIcon" />
      </div>
      <div className="flex flex-row justify-end mr-3  w-[11rem]">
        <img
          className="mr-1"
          src="/src/assets/CellularConnection.svg"
          alt="cellularIcon"
        />
        <img className="mr-1" src="/src/assets/Wifi.svg" alt="wifiIcon" />
        <img className="mr-1" src="/src/assets/Battery.svg" alt="batteryIcon" />
      </div>
    </section>
  );
};

export default StatusBar;
