"use client";
import React, { useEffect, useState } from "react";
import topfeed from "@/app/topfeeds/topfeed";
import { motion, AnimatePresence } from "framer-motion";
import cross from  "@/public/up.png"
import Image from "next/image";

type FeedDataItem = {
  topheadline: string; // Update this with the correct type based on your API response
};

const Topfeeds: React.FC<{
  open: () => void;
  value : boolean
}> = ({open,value}) => {
  const [feedData, setFeedData] = useState<FeedDataItem[] | null>(null);
  const [topNewsId, setTopNewsId] = useState("INDIA");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const slidearray = ["INDIA", "SPORTS", "EDUCATION", "TECHNOLOGY"];

  const changeCategory = (newDirection: "next" | "prev") => {
    setDirection(newDirection); 
    setCurrentIndex((prevIndex) => {
      const newIndex =
        newDirection === "next"
          ? (prevIndex + 1) % slidearray.length
          : (prevIndex - 1 + slidearray.length) % slidearray.length;

      setTopNewsId(slidearray[newIndex]);
    
      return newIndex;
    });
  };

  useEffect(() => {
    async function handeltopfeed() {
      try {
        const data = await topfeed({ topNewsId });
        if (data) {
          setFeedData(data);
        }
      } catch (error) {
        console.error("Error fetching top feeds:", error);
      }
    }
    handeltopfeed();
  }, [topNewsId]);

  const variants = {
    enter: (direction: "next" | "prev") => ({
      x: direction === "next" ? "-100%" : "100%",
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: "next" | "prev") => ({
      x: direction === "next" ? "100%" : "-100",
    }),
  };

  return (
    <>
      <motion.div
        className="h-full z-[100] absolute flex flex-col justify-center items-center w-full"
        initial={{ y: "-100%" }}
        animate={ value? { y: "0%", transition: { duration: 0.4 } }: {y: "-100%", transition: { duration: 0.4 }} }
      >
        <div className="flex relative w-full bg-gradient-to-r from-indigo-500 to bg-purple-400 gap-10 justify-center items-center">
          <button onClick={() => changeCategory("prev")}>Prev</button>
          <span className="w-[10rem] text-center ">{topNewsId}</span>
          <button onClick={() => changeCategory("next")}>Next</button>
          <button onClick={open} className="absolute right-0" >

            <Image src={cross} alt="" className="w-[1.4rem]" />
          </button>
        </div>


        <div className="topfeed bg-transparent backdrop-blur-[4px] flex flex-col justify-start  items-center w-full h-full">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={topNewsId}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.63 }}
              className=" pt-4 pl-[3%] max-sm:pl-2  md:gap-4 lg:gap-8 flex flex-col max-sm:gap-4 h-full    w-full"
            >
              {Array.isArray(feedData) ? (
                feedData.map((data, index) => (
                  <li
                    className="list-decimal   text-justify  text-[0.9rem] "
                    key={index}
                  >
    
                   {data.topheadline}
                   
    
                  </li>
                ))
              ) : (
                <p className="">Loading...</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
};

export default Topfeeds;
