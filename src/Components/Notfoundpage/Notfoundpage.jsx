import React, { useEffect, useState } from "react";
import Style from "./Notfoundpage.module.css";

import errorImage from "../../assets/images/error.svg";
export default function Notfoundpage() {
  return (
    <>
      <div className="flex items-center justify-center">
        <img src={errorImage} alt="errorPage" className="w-[50%]" />
      </div>
    </>
  );
}
