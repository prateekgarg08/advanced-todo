import React, { useMemo, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
export default function Task({ isCompleted, title }) {
  const [show, setShow] = useState(isCompleted);

  return (
    <div className="text-[#fff] flex text-lg  gap-2">
      <div className="flex grow gap-2">
        <button className="border border-white rounded  p-1 w-[25px]" onClick={() => setShow(!show)}>
          {show && (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
              <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" style={{ fill: "white" }} />
            </svg>
          )}
        </button>
        <div>
          <span>{title}</span>
        </div>
      </div>
      <div className="flex gap-2 items-center ">
        <span className="font-bold ">Time</span>

        <BsFillTrashFill />
      </div>
    </div>
  );
}
