"use client";

import { signOut } from "next-auth/react"
import Link from "next/link";
import Image from "next/image"

type MyImage = {
    image: string
    alt: string
}



const Logged = ( { image, alt }: MyImage ) => {
  return (
      <li className="flex gap-8 items-center">
          <button onClick={() => signOut()} className="uppercase bg-gray-700 text-white text-sm px-6 py-2 rounded-md">
              Sign out
          </button>
          <Link href={"/dashboard"}>
              <Image width={64} height={64} src={image} alt={ alt } className="rounded-full w-14" priority />
          </Link>
    </li>
  )
}

export default Logged