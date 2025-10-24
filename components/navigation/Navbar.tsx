"use client"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Logo from "./Logo"
import Link from "next/link"
import { Button } from "../ui/button"
import Menu from "./Menu"

export function Navbar() {

  return (

    <div className="container mx-auto max-w-7xl p-4">
      <div className="flex justify-between">

        <div className="flex gap-6 items-center">
          {/* Logo */}
          <div>
            <Link
              href={'/'}
            >
              <div>
                <Logo />
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <div>

            <NavigationMenu viewport={false} className="hidden md:flex">
              <NavigationMenuList className="flex-wrap">

                <NavigationMenuItem>
                  <NavigationMenuLink asChild className="text-sm font-black text-gray-400 hover:text-gray-800 hover:bg-transparent">
                    <Link href="#">Features</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild className="text-sm font-black text-gray-400 hover:text-gray-800 hover:bg-transparent">
                    <Link href="#">Pricing</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild className="text-sm font-black text-gray-400 hover:text-gray-800 hover:bg-transparent">
                    <Link href="#">Resources</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>
              
            
          </div>
        </div>

        {/* Log */}
        <div className="hidden gap-4 md:flex">
          <Button variant="gray">
            Login
          </Button>

          <Button variant="blue400">
            Sign Up
          </Button>
        </div>

        {/* Menú */}
        <div className="flex md:hidden">
          <Menu />
        </div>

      </div>
    </div>
  )
}
