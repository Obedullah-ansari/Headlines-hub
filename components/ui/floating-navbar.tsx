"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import Link from "next/link";
import Image from "next/image";
import type { StaticImageData } from "next/image";

export const FloatingNav = ({
  navItems,
  className,
  showmodal,
  authetification,
  photo
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;

  }[];
  className?: string;
  showmodal: () => void;
  photo:string|StaticImageData,
  authetification: string | null;
}) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>(0);
  useEffect(() => {
    // Check if the code is running on the client-side (browser)
    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth); // Set initial screen width

      const handleResize = () => setScreenWidth(window.innerWidth); // Update screen width on resize
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize); // Clean up event listener
    }
  }, []);

  const getWidth = () => {
    if (screenWidth < 670) return "90%"; 
    if (screenWidth < 850) return "87%";// Mobile
    if (screenWidth < 1024) return "60%"; // Tablet
    return "45%"; // Desktop
  };
  useEffect(() => {
    // Check for saved scroll state in sessionStorage
    const savedScrollState = sessionStorage.getItem("isScrolled");
    if (savedScrollState) {
      setIsScrolled(JSON.parse(savedScrollState));
    }

    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
      // Save the scroll state in sessionStorage
      sessionStorage.setItem("isScrolled", JSON.stringify(scrolled));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0)",
      }}
      animate={{
        width: isScrolled ? getWidth() : "100%",
        backgroundColor: isScrolled
          ? "rgba(147, 112, 219, 0.9)" // Simulating gradient with indigo/violet
          : "rgba(255, 255, 255, 0)", // Fully transparent when at the top
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      className={cn(
        `flex h-[8%] fixed items-center top-10 inset-x-0 mx-auto rounded-full z-[5000] pr-2 pl-12 py-2 space-x-4`,
        className
      )}
    >
      {navItems.map((navItem, idx) => (
        <Link
          key={`link=${idx}`}
          href={navItem.link}
          className={cn(
            "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
          )}
        >
          <span className="block sm:hidden">{navItem.icon}</span>
          <span className="hidden sm:block text-sm">{navItem.name}</span>
        </Link>
      ))}

      <motion.div
        className={`${
          isScrolled
            ? "lg:pl-[40%] sm:pl-[48%] md:pl-[50%] max-sm:pl-[20%]"
            : "max-sm:pl-[45%] sm:pl-[60%] md:pl-[65%] lg:pl-[75%]"
        } transition-all duration-500`} // Added transition for padding
      >
        {authetification ? (
          <>
            <button onClick={showmodal}>
              <Image 
               src={photo} 
               alt=""
               className="w-14 h-14 rounded-full object-cover"
               width={128}
               height={128} />
            </button>
          </>
        ) : (
          <Link
            href="/auth"
            className={`p-3 rounded-full ${
              isScrolled
                ? "bg-transparent"
                : "bg-gradient-to-r from-pink-500  to-violet-500"
            }`}
          >
            SignUp
          </Link>
        )}
      </motion.div>
    </motion.div>
  );
};
