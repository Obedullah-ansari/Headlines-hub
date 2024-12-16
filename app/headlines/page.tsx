"use client";
import { useEffect, useState } from "react";
import { fetchNewsHeadlines } from "./headlinesnational";
import { fetchNewsHeadlinesGlobal } from "./headlinesglobal";
import Navbar from "@/customcomponents/Navbar";
import Newscard from "@/customcomponents/Newscard";
import Modaloverlay from "@/customcomponents/Modaloverlay";
import Notepad from "@/customcomponents/Notepad";
import { AnimatePresence, easeInOut } from "framer-motion";
import searchheadlines from "@/app/search/searchheadlines";
import searchlogo from "@/public/search.png";
import Image from "next/image";
import openbtn from "@/public/jigsaw.png";
import SideNavbar from "@/customcomponents/SideNavBar";
import {motion} from  "framer-motion"

export default function HeadlinesPage() {
  const [openNav, setOpenNav] = useState<boolean>(false);
  const [newsHeadlines, setNewsHeadlines] = useState<any[]>([]);
  const [id, setId] = useState<string>("TOI");
  const [newsType, setNewsType] = useState<string>("national");
  const [authAlert, setAuthAlert] = useState<string | null>(null);
  const [Auth, setAuth] = useState<string | null>(null);
  const [openNote, setOpenNote] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchLoad, setSearchLoad] = useState<boolean>(false);

  function handelNavBarOpen() {
    setOpenNav((prev) => !prev);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuth(token);
  }, []);

  function handelNewsType(type: string) {
    if (type === "national") {
      setNewsType(type);
    } else if (type === "global" && Auth) {
      setNewsType(type);
    } else if (!Auth) setAuthAlert("Please log in to access this feature 🔐");
  }

  useEffect(() => {
    const getHeadlines = async () => {
      setLoading(true); // Start loading
      try {
        let data;
        if (newsType === "national") {
          const URL = `${process.env.NEXT_PUBLIC_API_URL}api/v1/headlines/${id}`;
          data = await fetchNewsHeadlines(URL);
        } else if (newsType === "global") {
          if (Auth) {
            const URL = `${process.env.NEXT_PUBLIC_API_URL}api/v1/headlines/global/${id}`;
            data = await fetchNewsHeadlinesGlobal(URL);
          } else {
            return; // Exit if not authenticated
          }
        }
        setNewsHeadlines(data || []);
      } catch (error) {
        console.error("Failed to fetch headlines:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    getHeadlines();
  }, [id, newsType, Auth, searchLoad]);

  const handleAcess = () => {
    if (Auth) {
      setOpenNote(true);
    } else {
      setAuthAlert("Please log in to access this feature 🔐");
    }
  };

  async function handelSearchNews(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const data = await searchheadlines(searchQuery);
    if (data) setNewsHeadlines(data);
    else setNewsHeadlines([]);
    setLoading(false);
  }

  const closeModal = () => {
    setAuthAlert(null);
    setOpenNote(false);
  };

  return (
    <section
      className={`h-[100vh] overflow-auto relative bg-neutral-950 w-[100%]  flex flex-row justify-center items-center`}
    >
      {
        <>
          <SideNavbar
            navigateid={setId}
            note={handleAcess}
            newstype={handelNewsType}
            value={openNav}
            opennav={handelNavBarOpen}
          />
          <Navbar
            navigateid={setId}
            note={handleAcess}
            newstype={handelNewsType}
          />
        </>
      }

      {
        <>
          <div
            className={`pt-[2%] max-sm:rounded-none rounded-s-[3rem] h-full  max-sm:mt-[30%] mt-[13%] bg-neutral-800 w-full`}
          >
            <div className="top-0 max-sm:w-full w-[80%] max-sm:h-[10%] h-[12%] absolute">
              <motion.button
              initial={{rotate:0}}
              whileTap={{rotate:180 , transition:{duration:0.3 ,ease:easeInOut}  }}
                className="absolute max-sm:block hidden bottom-6 left-3 "
                onClick={handelNavBarOpen}
              >
                <Image src={openbtn} alt="" className="w-[1.8rem]" />
              </motion.button>
              <form
                onSubmit={handelSearchNews}
                className="h-full gap-3 max-sm:gap-2 p-1 w-full justify-center flex items-center"
              >
                <input
                  type="text"
                  className="searchbar  max-sm:w-[65%] max-sm:h-[60%] bg-neutral-800 pl-5 h-[50%] w-[80%] rounded-full"
                  placeholder="Search headlines..."
                  value={searchQuery}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchQuery(value);
                    if (!value.trim()) {
                      setSearchLoad((prev) => !prev);
                    }
                  }}
                />
                <button type="submit" className="cursor-pointer">
                  <Image src={searchlogo} className="w-[1.4rem]" alt="" />
                </button>
              </form>
            </div>
            <div
              className={`justify-start max-sm:pl-0   pl-[5%] h-[100%] w-full flex flex-wrap overflow-auto`}
            >
              {loading ? (
                <div className="h-[100%] w-full flex justify-center items-center">
                  <span className="text-white text-lg">Loading...</span>
                </div>
              ) : Array.isArray(newsHeadlines) && newsHeadlines.length > 0 ? (
                newsHeadlines.map((headline, index) => (
                  <Newscard
                    key={index}
                    img={headline.imageUrl}
                    text={headline.headline}
                    link={headline.href}
                  />
                ))
              ) : (
                <div className="h-[100%] w-full flex justify-center items-center">
                  No headlines are available
                </div>
              )}
            </div>
          </div>
        </>
      }
      <AnimatePresence>
        {authAlert && <Modaloverlay message={authAlert} onclose={closeModal} />}
        {openNote && <Notepad onclose={closeModal} />}
      </AnimatePresence>
    </section>
  );
}
