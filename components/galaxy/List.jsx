"use client";

import { useState } from "react";

const List = ({ galaxy }) => {
  const [active, setActive] = useState(0);

  return (
    <ul className="fixed z-10 flex flex-col gap-4 top-24 left-8">
      {galaxy.map((item, index) => {
        const { title, model, board } = item;
        return (
          <li key={index}>
            <button
              onClick={() => setActive(index)}
              className={`${active === index && "font-semibold italic"}`}
            >
              {title}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
