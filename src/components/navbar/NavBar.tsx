import React from "react";
import NavLinks from "./NavLinks";

export default function NavBar() {
  return (
    <header className="flex h-[7vh] sticky top-0 justify-around items-center bg-background">
      <NavLinks />
    </header>
  );
}
