import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import Link from "next/link";

export function BackgroundBeamsWithCollisionHero() {
  return (
    <BackgroundBeamsWithCollision>
      <div className="flex  max-sm:w-full flex-col justify-center items-center gap-2 ">
        <h2 className=" text-2xl  relative z-20 md:text-4xl lg:text-7xl font-bold text-center font-sans tracking-tight">
          Introducing Headlineshub
        </h2>
        <p className="font-sans max-sm:text-sm  text-lg text-center">
          Headlines hub offers you latest news from trusted sources like
          Hindustan Times, Times of India, and The Hindu 
          Explore breaking news and in depth articles
        </p>

        <Link
        className="p-[3px] relative"
        href="/headlines"
        >
          <div className="absolute inset-0  bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
            Let&apos;s go
          </div>
        </Link>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
