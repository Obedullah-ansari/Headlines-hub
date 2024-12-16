import React from "react";
import {motion}  from "framer-motion"
const Newscard: React.FC<{ img: string; text: string; link: string }> = ({
  img,
  text,
  link,
}) => {
  const shortenedText =
  text && typeof text === "string"
    ? text.split(" ").splice(0, 15).join(" ") +
      (text.split(" ").length > 15 ? "..." : "")
    : "No headline available";

  return (
    <>
      <motion.div 
      initial={{opacity:0}}
      whileInView={{opacity:1, transition:{duration:0.4}}}
      
      className="  max-sm:p-[2%] max-sm:h-[11rem] max-sm:w-[100%]  md:w-[43%] md:h-[12rem] lg:w-[20rem] lg:h-[11rem]  max-sm:m-[0.5rem] sm:m-[0.8rem] md:m-[1rem] lg:mt-[0.2%] p-[0.15%] rounded-lg">
        <div className="bg-neutral-950 rounded-md h-[100%] w-full p-[0.5rem] ">
         
         <div className="w-full  pt-2 max-sm:h-[75%] lg:h-[65%] flex flex-row justify-center items-center">
           <div className="h-full   w-[40%] pr-2">
           <img
           src={img} className="w-[100%] h-[100%] rounded-md" alt="" />
           </div>
           <div className="w-[60%]  text-[0.9rem]  text-neutral-400  h-full">
            <p>{shortenedText}.</p>
           </div>
         </div>

         <div className="h-[35%] max-sm:h-[25%] flex flex-row pl-[3%] items-center ">
         <motion.a
         href={link}
         className="cursor-pointer"
         initial={{x:"0%"}}
          whileHover={{x:"10%" , transition:{duration:0.2}}}
         >
          Read more
         </motion.a>
         </div>

        
        </div>
      </motion.div>
    </>
  );
};

export default Newscard;
