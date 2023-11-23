import React from "react";
import notfound from "../../assets/images/notfound.png";

const Notfound = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="flex-row items-center text-center">
        <img src={notfound} alt="notfound" />
        <p className="text-xl font-light">404 Not Found</p>
      </div>
    </div>
  );
};

export default Notfound;
