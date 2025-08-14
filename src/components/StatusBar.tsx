import React from "react";

const StatusBar: React.FC = () => {
  return (
    <section className="flex  items-center justify-center h-[3rem] w-[348px]">
      <div className="mr-auto">
        <img src="/src/assets/Time.svg" alt="timeIcon" />
      </div>
      <div className="flex gap-4">
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
