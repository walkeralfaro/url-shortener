import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon, X } from "lucide-react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Logo from "./Logo"
import Link from "next/link"
import { Separator } from "../ui/separator"


export default function Menu() {
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="top" className="bg-purple-950 border-none">

        <div className="flex justify-between p-4">
          <SheetHeader className="p-0">
            <SheetTitle>
              <p className="text-white text-sm font-black">Shortly</p>
            </SheetTitle>
          </SheetHeader>

          <SheetClose className="text-white">
            <X />
          </SheetClose>
        </div>

        <div className="flex flex-col items-center gap-8 pb-8">
          <div>
            <button className="text-xl text-white font-black">Feature</button>
          </div>
          <div>
            <button className="text-xl text-white font-black">Pricing</button>
          </div>
          <div>
            <button className="text-xl text-white font-black">Resource</button>
          </div>

          <hr className="w-4/5" />
          <div>
            <button className="text-xl text-white font-black">Login</button>
          </div>
          <div className="w-full text-center">
            <Button variant='blue400' className="text-xl p-8 rounded-full w-4/5">Sing Up</Button>
          </div>
        </div>

      </SheetContent>
    </Sheet>
  )
}