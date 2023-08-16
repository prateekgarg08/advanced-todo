import React from "react";

export default function Button({ disabled = false, children, onClick, className = "" }) {
  return (
    <button className={`bg-purple-500 text-white px-10 py-2 ${className}`} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
