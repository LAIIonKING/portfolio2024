import React, { useRef } from "react";
import LoadGlb from "../component/LoadGlb.js";

export default function Project() {
  const canvasParentRef = useRef();
  return (
    <div>
      {/* <h1 className="text-8xl text-white text-center font-dm font-normal my-6">
        SILVER FACTORY
      </h1> */}
      <div
        className="border border-white mt-8"
        style={{ height: "calc(100vh - 150px)" }}
        ref={canvasParentRef}
      >
        <LoadGlb canvasParentRef={canvasParentRef} />
      </div>
    </div>
  );
}
