import React from "react";

function Card({ header, data }) {
  function toCamelCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  return (
    <div className="flex flex-1 justify-between flex-col w-full bg-blue-200 rounded-lg shadow-lg hover:scale-105 duration-200">
      <div className="flex bg-blue-300 rounded-md hover:bg-blue-400 duration-200 ">
        <span className="m-2 font-mono font-extrabold text-xl">
          {header}
        </span>
      </div>
      <div className="overflow-hidden flex flex-col divide-y-2 divide-blue-800/50 gap-2 ml-10 m-2">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex gap-4 ml-2">
            <span className="font-bold flex w-32">{`${toCamelCase(key.replace(/_/g, " "))}:`}</span>
            <span className="font-semibold">{value}</span>
          </div>
        ))}
      </div>
      <div className="flex-grow"></div>
      <div className="h-4 bg-blue-300 rounded-md"></div>
    </div>
  );
}

export default Card;
