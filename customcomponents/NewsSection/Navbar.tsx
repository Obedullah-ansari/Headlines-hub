import React from "react";
import Image from "next/image";
import toi from "@/public/toi.png";
import th from "@/public/th.jpeg";
import ht from "@/public/ht.jpeg";
import globe from "@/public/earth.png";
import nationla from "@/public/flag.png";
import notepad from "@/public/memo.png";
// import voice from "@/public/minon.png";

import { motion, useAnimation } from "framer-motion";
const Navbar: React.FC<{
  navigateid: (id: string) => void;
  newstype: (newstype: string) => void;
  note: (note: boolean) => void;
}> = ({ navigateid, newstype, note }) => {
  const controls = useAnimation();
  return (
    <>
      <motion.div
        className="navbar  flex   justify-start items-center   max-sm:hidden bg-neutral-950 h-full  "
        initial={{ width: "15%" }}
        whileHover={{ width: "23%", transition: { duration: 0.4 } }}
        onHoverStart={() => {
          controls.start({
            opacity: 1,
            display: "block",
            transition: { duration: 0.4 },
          });
        }}
        onHoverEnd={() => {
          controls.start({
            opacity: 0,
            display: "none",
          });
        }}
      >
        <motion.div className=" w-full h-full pl-8 flex flex-col  justify-center  items-start">
          <div className="h-[5rem]  cursor-pointer flex gap-1 justify-start items-center w-full ">
            <Image src={toi} alt="" onClick={() => navigateid("TOI")} className="w-[2.5rem]  rounded-full" />

            <motion.span
              onClick={() => navigateid("TOI")}
              initial={{ opacity: 0, x: "0%" }}
              whileHover={{ x: "10%", transition: { duration: 0.2 } }}
              animate={controls}
            >
              Times Of India
            </motion.span>
          </div>

          <div className="h-[5rem]  cursor-pointer flex gap-1 justify-start items-center w-full ">
            <Image src={th} alt="" onClick={() => navigateid("TH")} className="w-[2.5rem] rounded-full" />
            <motion.span
              onClick={() => navigateid("TH")}
              initial={{ opacity: 0, x: "0%" }}
              whileHover={{ x: "10%", transition: { duration: 0.2 } }}
              animate={controls}
            >
              The Hindu
            </motion.span>
          </div>

          <div className="h-[5rem] cursor-pointer flex gap-1 justify-start items-center w-full ">
            <Image src={ht} alt=""   onClick={() => navigateid("HT")} className="w-[2.5rem] rounded-full" />
            <motion.span
              onClick={() => navigateid("HT")}
              initial={{ opacity: 0, x: "0%" }}
              whileHover={{ x: "10%", transition: { duration: 0.2 } }}
              animate={controls}
            >
              Hindustan Times
            </motion.span>
          </div>

          <div className="h-[5rem]  cursor-pointer flex gap-1 justify-start items-center w-full ">
            <Image src={globe} alt="" onClick={() => newstype("global")} className="w-[2.5rem] rounded-full" />
            <motion.span
              onClick={() => newstype("global")}
              initial={{ opacity: 0, x: "0%" }}
              whileHover={{ x: "10%", transition: { duration: 0.2 } }}
              animate={controls}
            >
              Global news
            </motion.span>
          </div>

          <div className="h-[5rem] cursor-pointer flex gap-1 justify-start items-center w-full">
            <Image src={nationla} alt=""    onClick={() => newstype("national")} className="w-[2.5rem] rounded-full" />
            <motion.span
              onClick={() => newstype("national")}
              initial={{ opacity: 0, x: "0%" }}
              whileHover={{ x: "10%", transition: { duration: 0.2 } }}
              animate={controls}
            >
              National
            </motion.span>
          </div>

          <div className="h-[5rem] cursor-pointer flex gap-1 justify-start items-center w-full ">
            <Image src={notepad} alt=""    onClick={() => note(true)} className="w-[2.5rem] " />
            <motion.span
              onClick={() => note(true)}
              initial={{ opacity: 0, x: "0%" }}
              whileHover={{ x: "10%", transition: { duration: 0.2 } }}
              animate={controls}
            >
              note pad
            </motion.span>
          </div>

          <div className="h-[5rem] cursor-pointer flex gap-1 justify-start items-center w-full">
            {/* <Image src={voice} alt="" className="w-[2.5rem] rounded-full" /> */}
            {/* <motion.span
              initial={{ opacity: 0, x: "0%" }}
              whileHover={{ x: "10%", transition: { duration: 0.2 } }}
              animate={controls}
            >
              voice
            </motion.span> */}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Navbar;
