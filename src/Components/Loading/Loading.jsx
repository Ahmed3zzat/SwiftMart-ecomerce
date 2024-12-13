import React, { useEffect, useState } from "react";
import "./Loading.css";

export default function Loading() {
  return (
    <>
      <div className="load flex justify-center items-center h-[50vh]">
      <span className="loader"></span>
      </div>
    </>
  );
}
