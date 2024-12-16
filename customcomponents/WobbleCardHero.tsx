"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "@/components/ui/wobble-card";
import Cobe from "./Cobe";
import noteimg from  "@/public/notepad.png"
import cardimage from "@/public/cardimage.png"

export function WobbleCardHero() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-gray-900 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Your Personal Notepad
          </h2>
          <p className="mt-4 text-left  text-base/6 text-gray-200">
          Capture your thoughts, note down ideas, and keep track of what's important all in one place. 
          </p>
        </div>
        <Image
          src={noteimg}
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-4 lg:-right-[20%]  -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
        Listen to the News
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
        Turn your top news stories into an audio experience. Our voice feature reads headlines and articles aloud, making it easier to stay informed on the go.
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-gray-900 max-sm:h-[300px]  min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Top Headlines from world wide,Today’s Must Know Stories
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
          Stay up to date with the top five news stories across all genres from sports to entertainment. Get the latest updates all in one place!
          </p>
        </div>
        <Image
          src={cardimage}
          width={500}
          height={300}
          alt="linear demo image"
          className="absolute -right-4 lg:-right-[40%]  max-sm:block sm:hidden max filter -bottom-0 object-contain rounded-2xl"
        />
        <div className="top-[0%]  h-full max-sm:hidden right-[0%] absolute">
          <Cobe />
        </div>
      </WobbleCard>
    </div>
  );
}
