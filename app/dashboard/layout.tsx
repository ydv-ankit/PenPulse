import React from "react";
import Navlinks from "./components/Navlinks";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navlinks />
      {children}
    </div>
  );
}
