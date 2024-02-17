import React from "react";

export default function SidebarQuery({ projects, handleClick }) {
  return (
    <>
      {projects.map((e) => (
        <button key={e._id} onClick={() => handleClick(e._id)}>
          <li>{e.name}</li>
        </button>
      ))}
    </>
  );
}
