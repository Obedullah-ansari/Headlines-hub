"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Hero from "@/customcomponents/HeroSection/Hero";
import { WobbleCardHero } from "@/customcomponents/featuresSection/WobbleCardHero";
import Review from "@/customcomponents/ReviewSection/Review";
import Carousel from "@/customcomponents/ReviewSection/Carousel";
import { Provider } from "react-redux";
import store from "@/redux/store";
import Image from "next/image";
import logo from "@/public/newspaper.png";
import Topfeeds from "@/customcomponents/Topfeeds";

export default function Home() {
  const [sideSlider, setSideSlider] = useState(false);

  function handleSideSlider() {
    setSideSlider((prev) => !prev);
  }

  const variants = {
    initial: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    animate: {
      x: "-100%",
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <Provider store={store}>
        <Hero />
        <div className="h-[10rem] flex flex-col justify-center items-center">
          <h1 className="textheadline max-sm:text-lg">
            Designed to Elevate Your Experience
          </h1>
        </div>
        <WobbleCardHero />


        <section className="w-full pt-10 max-sm:h-auto h-[30rem] flex-col flex justify-start gap-8  items-center ">
        <h1 className="text-[2rem]">Top Fives News For You</h1>
        <Topfeeds/>
      </section>

        <div className="h-[100vh] w-full flex  relative flex-col justify-start items-center">
          <div className="h-[8rem] max-sm:h-[4rem] flex flex-col justify-center items-center">
            <h1 className="textheadline max-sm:text-lg">
              See what our users say about us
            </h1>
          </div>
          <motion.div
            variants={variants}
            animate={sideSlider ? "animate" : "initial"}
            className="flex justify-center items-center  h-[75%] w-full z-40"
          >
            <Carousel />
          </motion.div>
          <Review />
          <button
            onClick={handleSideSlider}
            className="p-3 bg-gray-700 rounded-lg  "
          >
            {sideSlider ? "reviews" : "review us"}
          </button>
        </div>
      </Provider>
        
       
      <div className=" w-full border-t-2 border-gray-800 justify-center items-center pt-[5%] flex max-sm:flex-col max-sm:h-full h-[40vh]">
        <div className=" flex  max-sm:w-full justify-center items-start  pt-8 w-[30%] h-full">
          <div className="flex justify-center max-sm:justify-start max-sm:w-full max-sm:p-3 items-center max-sm:pb-3 gap-3 pt-3">
            <Image className="w-[3rem] max-sm:w-[2rem]" src={logo} alt="" />
            <span className=" max-sm:text-[1rem] md:text-[1.5rem] text-[2rem] ">
              {" "}
              Headlines Hub
            </span>
          </div>
        </div>
        <div className=" w-[70%] max-sm:w-full max-sm:flex-col flex  justify-end items-center h-full">
          <div className="flex pt-8 max-sm:pt-0 b max-sm:w-full flex-col text-neutral-400 gap-4  h-full w-[30%] max-sm:items-start p-3  justify-start items-center">
            <span>Linkeden</span>
            <span>Git hub</span>
            <span>More of my works</span>
            <span>share</span>
          </div>
          <div className="flex pt-8 max-sm:pt-0 flex-col max-sm:w-full text-neutral-400 p-3 gap-4 h-full w-[30%] max-sm:items-start justify-start items-center">
            <span>support</span>
            <span>query</span>
          </div>
        </div>
      </div>

   
    </>
  );
}
