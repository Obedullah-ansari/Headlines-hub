import React, { useState, useEffect, ChangeEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import close from "@/public/cross.png";
import save from "@/public/wallet.png";
import editbtn from "@/public/pencil.png";

const Notepad: React.FC<{
  onclose: () => void;
}> = ({ onclose }) => {
  const [note, setNote] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(true);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const userId = localStorage.getItem("userId") || "";
    setUserId(userId);
  }, []);

  function handelEdit() {
    setEdit((prev) => !prev);
  }

  // Load saved note from localStorage when the component mounts
  useEffect(() => {
    if (userId) {
      const savedNote = localStorage.getItem(userId);
      if (savedNote) {
        setNote(savedNote);
      }
    }
  }, [userId]);

  // Save note to localStorage
  const saveNote = () => {
    localStorage.setItem(userId, note);
    handelEdit();
  };

  // Handle text area changes
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  return (
    <motion.section
      initial={{ x: "-100%", opacity: 1 }} // Animation when the component enters
      animate={{ x: "0%", opacity: 1, transition: { duration: 0.4 } }} // Mid-state animation
      exit={{ x: "-100%", opacity: 1, transition: { duration: 0.4 } }} // Animation when the component exits
      className="h-[100vh] z-50 w-full  fixed   top-0"
    >
      <div className="h-[100%] w-full dark:bg-neutral-950 bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex flex-col items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)]"></div>
        <h1 className="text-[2rem] z-10">Notepad</h1>
        <div className="h-[78%] max-sm:ml-3 max-sm:w-[100%] w-[65%] flex justify-start items-center">
          <div className="bgmagicbackground relative z-30 bg-gray-950 flex p-[0.8%] flex-col justify-center items-center h-full w-full rounded-sm">
            <textarea
              className="z-50  text-[1.1rem] p-3 bg-neutral-950 rounded-lg w-full h-full"
              value={note}
              onChange={handleChange}
            ></textarea>

            {edit && (
              <div className="z-50 opacity-0 absolute text-[1.1rem] p-3 cursor-default rounded-lg w-full h-full">
                {note}
              </div>
            )}
          </div>
          <div className="h-full max-sm:w-[11%] w-[5%] z-30">
            <div className="bgmacbar w-full flex-col pl-1 rounded-sm flex gap-[5%] relative right-[1px]  max-sm:items-start  justify-start items-center max-sm:gap-[7%] max-sm:h-[20%] h-[16%]">
              <button onClick={onclose}>
                <Image className="w-[1.5rem] " src={close} alt="" />
              </button>
              <button onClick={handelEdit}>
                <Image className="max-sm:w-[1.5rem] w-[2rem]" src={editbtn} alt="" />
              </button>
              <button onClick={saveNote}>
                <Image className="w-[2rem] max-sm:w-[1.5rem]  " src={save} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Notepad;
