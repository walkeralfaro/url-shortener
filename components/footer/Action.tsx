import { Button } from "../ui/button";

export function Action() {
  return (
    <section className="bg-[url(/bg-boost-mobile.svg)] sm:bg-[url(/bg-boost-desktop.svg)] bg-purple-950 xs:bg-contain sm:bg-cover  bg-no-repeat bg-top-right">
      <div className="container mx-auto text-center py-20 md:py-12">

        <h3 className="text-2xl text-white font-black md:text-3xl">Boost your links today</h3>
        <Button variant="blue400" className="mt-8 text-lg px-12 py-6">Get Started</Button>
      </div>
    </section>
  )
}