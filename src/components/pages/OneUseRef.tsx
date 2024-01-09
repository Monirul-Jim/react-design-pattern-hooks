import React, { useRef, useState } from "react";

const OneUseRef = () => {
  const [count, setCount] = useState(0);
  const myRef = useRef(0);
  const increment = () => {
    myRef.current = myRef.current + 1;
    setCount(count + 1);
  };
  return (
    <div>
      <h1 className="text-2xl font-bold">Explore use Ref hook</h1>
      <button
        onClick={() => increment()}
        className="bg-blue-700 text-4xl text-white px-4 ml-4 py-2 rounded-md"
      >
        {myRef.current}
      </button>
    </div>
  );
};

export default OneUseRef;
