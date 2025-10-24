import Image from "next/image"

export default function Logo() {
  return (
    <div className="relative w-24 aspect-3/1">
      <Image
        src="/logo.svg"
        alt="logo"
        fill
        priority
        className="object-contain"
      />
    </div>
  )
}
