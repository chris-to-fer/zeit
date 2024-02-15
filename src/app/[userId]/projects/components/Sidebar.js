"use client";
import React from "react";
import styled from "styled-components";

const LeftBar = styled.aside`
  display: flex;
  flex-direction: column;
  align-content: center;
  gap: 1%;
  align-items: center;
  height: 600px;
  width: 30%;
  border: 0.2rem;
  border-style: solid;
  border-radius: 12px;
  border-color: grey;
  padding: 3%;
`;

export default function Sidebar() {
  return (
    <LeftBar>
      <p>Projects:</p>
      <button>create</button>
      <button>delete</button>
    </LeftBar>
  );
}
