import React, { useEffect, useState } from "react";
import Image from "next/image";
import StarRating from "@/customcomponents/StarRating";
import defaultImage from "@/public/profile.png";


const Reviewcard: React.FC<{
  text: string;
  photo: string | null;
  rating: number;
  name: string;
}> = ({ text, photo, rating, name }) => {
  const userImage =
    photo && !photo.endsWith("default.jpg") ? photo : defaultImage;

  return (
    <div className="main w-full max-sm:h-full flex max-sm:flex-col justify-center items-center embla__slide">
      <div className="max-sm:w-[100%] bg-neutral-700 h-full max-sm:justify-center max-sm:h-[30%] w-[16rem] flex flex-col justify-center items-center">
        <Image
          className="w-[12rem]  max-sm:w-[5rem] rounded-full"
          src={userImage}
          alt="img"
          width={128}
          height={128}
        />
        <div className="p-3 flex justify-center items-center w-full h-[10%]">
          <StarRating onRatingChange={() => null} rating={rating} />
        </div>
      </div>
      <div className="flex max-sm:h-[70%] bg-neutral-800 flex-col max-sm:w-[100%]  text-pretty max-sm:gap-3 gap-3 justify-center items-start p-3 h-full w-[24rem]">
        <h1 className="text-[1.6rem] max-sm:w-full max-sm:text-[1rem]">
         {name?.toUpperCase()}
        </h1>
        <p className="max-sm:text-[0.8rem]">{text}</p>
      </div>
    </div>
  );
};

export default Reviewcard;
