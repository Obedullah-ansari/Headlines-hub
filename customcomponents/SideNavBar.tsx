"use-client"
import React, { useState } from "react";
import Image from "next/image";
import close from  "@/public/cross.png"

import { motion } from "framer-motion";
const SideNavbar: React.FC<{
  navigateid: (id: string) => void;
  newstype: (newstype: string) => void;
  note: (note: boolean) => void;
  opennav :() => void
  value: boolean
}> = ({ navigateid,opennav, newstype, note,value }) => {
    

  return (
    <>
      <motion.div
       initial={{x:"-100%"}}
       animate={value?({x:"0", transition:{duration:0.4}}):({x:"-100%",transition:{duration:0.4}})}
      className="sidebar fixed top-30 flex h-[100vh] w-full z-[50] bg-transparent backdrop-blur-[4px]  flex-col justify-center items-center">
        <div className="w-full flex justify-end  h-[5%]">
       <button onClick={opennav}>
       <Image src={close} className="w-[1.5rem] bg-gray-200 m-2 rounded-full" alt="" />
       </button>
        </div>
        <div className="w-full flex  flex-col pt-10 justify-start gap-5 items-center h-[80%]">
            <div className="flex  gap-2">
            <h1 className="text-[2rem] max-sm:text-[1.3rem] text-transparent bg-clip-text bg-gradient-to-r  from-pink-500 via-indigo-500 to-blue-500 ">Headlines Hub</h1>
            </div>
          <motion.span
            onClick={() => navigateid("TOI")}
            initial={{  x: "0%" }}
            whileTap={{scale:1.1,transition:{duration:0.2}}}
           
          >
            Times Of India
          </motion.span>
          <motion.span
              onClick={() => navigateid("TH")}
              initial={{  x: "0%" }}
              whileTap={{scale:1.1,transition:{duration:0.2}}}
            >
              The Hindu
            </motion.span>
            <motion.span
              onClick={() => navigateid("HT")}
              initial={{  x: "0%" }}
              whileTap={{scale:1.1,transition:{duration:0.2}}}
            >
              Hindustan Times
            </motion.span><motion.span
              onClick={() => newstype("global")}
              initial={{  x: "0%" }}
              whileTap={{scale:1.1,transition:{duration:0.2}}}
            >
              Global News
            </motion.span>
            <motion.span
              onClick={() => newstype("national")}
              initial={{ x: "0%" }}
              whileTap={{scale:1.1,transition:{duration:0.2}}}
            >
              National News
            </motion.span>
            <motion.span
              onClick={() => note(true)}
              initial={{  x: "0%" }}
              whileTap={{scale:1.1,transition:{duration:0.2}}}
            >
              Note Pad
            </motion.span>
            <motion.span
              initial={{  x: "0%" }}
              whileTap={{scale:1.1,transition:{duration:0.2}}}
            >
              Voice
            </motion.span>
        </div>
      </motion.div>
    </>
  );
};

export default SideNavbar;
