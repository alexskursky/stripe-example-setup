import React from "react";

const ItemsCounter = ({ counter, setCounter, setStep, step }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <button onClick={() => setCounter(counter - 1)}>-</button>
        <p>{counter}</p>
        <button onClick={() => setCounter(counter + 1)}>+</button>
      </div>
      <button onClick={() => setStep(step + 1)}>Buy items</button>
    </>
  );
};

export default ItemsCounter;
