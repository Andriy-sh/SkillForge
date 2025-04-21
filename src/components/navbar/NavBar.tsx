import React from 'react'
import NavLinks from './NavLinks'

export default function NavBar() {
  return (
    <div className="flex sticky top-0 justify-around items-center p-4 bg-background">
      <NavLinks />
    </div>
  )
}