import React from "react";

function Card({ current_card }) {
  console.log(current_card);
  return (
    <div className="h-32 w-24 bg-yellow-600 flex justify-center items-center mb-3 mt-3">
      <h3 className="text-lg text-white">{current_card}</h3>
    </div>
  );
}

export default Card;
