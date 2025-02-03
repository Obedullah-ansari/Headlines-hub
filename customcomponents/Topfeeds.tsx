"use client";
import React, { useEffect, useState } from "react";
import topfeed from "@/app/topfeeds/topfeed";
// import { motion, AnimatePresence } from "framer-motion";
// import cross from  "@/public/up.png"
// import Image from "next/image";

interface FeedDataItem {
  topheadline: string;
}

const Topfeeds: React.FC<{}> = () => {
  const [feedData, setFeedData] = useState<FeedDataItem[] | null>();
  const [topNewsId, setTopNewsId] = useState("INDIA");
  const [, setCurrentIndex] = useState(0);
  const [, setDirection] = useState<"next" | "prev">("next");
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
        console.log("Error fetching top feeds:", error);
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
      <div className="h-full z-[100]  flex flex-col justify-center items-center w-full">
        <div className="flex w-full bg-gradient-to-r from-indigo-500 to bg-purple-400 gap-10 justify-center items-center">
          <button onClick={() => changeCategory("prev")}>Prev</button>
          <span className="w-[10rem] text-center ">{topNewsId}</span>
          <button onClick={() => changeCategory("next")}>Next</button>
        </div>

        <div className="  flex flex-col justify-center  items-center w-full h-full">
          <div className="  flex flex-col justify-center items-center gap-7 p-3 h-full    w-full">
            {feedData && Array.isArray(feedData) ? (
              feedData.map((data, index) => (
                <li
                  className="list-decimal text-justify  text-[1rem] "
                  key={index}
                >
                  {data.topheadline}
                </li>
              ))
            ) : (
              <p className="">Loading...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Topfeeds;
