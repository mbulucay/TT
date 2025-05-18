import React from "react";

function TraceCard({ icon, header, count, time }) {
  return (
    <div className="grid place-content-center gap-4">
      <div className="flex gap-12">
        <div className="flex gap-2">
          <div className="grid content-center justify-center">
            {/* <TiTick fontSize={36} color="white" /> */}
            {icon}
          </div>
          <div className="font-semibold text-white text-2xl mt-2">
            {/* 200 Response */}
            {header}
          </div>
        </div>

        <div className="font-bold text-white text-4xl">{count}</div>
      </div>
      <div className="text-white text-lg">Updated: {time}</div>
    </div>
  );
}

export default TraceCard;
