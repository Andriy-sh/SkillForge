import React from "react";
import NavLinks from "./NavLinks";

export default function NavBar() {
  return (
    <header className="flex border-b-1 border-black sticky top-0 justify-around items-center p-4 bg-background">
      <NavLinks />
    </header>
  );
}
