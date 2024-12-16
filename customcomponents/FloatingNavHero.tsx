"use client";
import React, { useEffect, useRef, useState } from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { BackgroundBeamsWithCollisionHero } from "./BackgroundBeamsWithCollisionHero";
import { motion } from "framer-motion";
import userderailsfun from "@/app/userdetails/userdetail";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import defaultimg from "@/public/user.png";
import trashIcon from "@/public/dt.png";
import imageuploadfun from "@/app/userdetails/imageupload";
import imagedeletefun from "@/app/userdetails/imagedelete";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import home from "@/public/home.png";
import rating from "@/public/rating.png";
import features from "@/public/jigsaw.png";
import { useDispatch } from "react-redux";
import Topfeeds from "./Topfeeds";

export function FloatingNavHero() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <Image src={home} alt="home" className="w-[1.7rem]" />,
    },
    {
      name: "features",
      link: "/#",
      icon: <Image src={features} alt="home" className="w-[1.7rem]" />,
    },
    {
      name: "review",
      link: "/#",
      icon: <Image src={rating} alt="home" className="w-[2rem]" />,
    },
  ];

  interface UserData {
    name: string;
    image: string | StaticImageData | null;
    email: string;
  }
  const dispatch = useDispatch();
  const [topFeedOpen, setTopFeedOpen] = useState<boolean>(false);
  const [userModal, setUserModal] = useState(false);
  const [auth, setAuth] = useState<string | null>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 15,
    y: 15,
    width: 50,
    height: 50,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [userDetails, setUserDetails] = useState<UserData>({
    name: "",
    image: defaultimg,
    email: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.size > 512000) {
      setError("File size must be 500KB or less");
      return;
    }

    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    setAuth(token);
  }, []);

  function handelLogout() {
    localStorage.removeItem("token");
    setUserModal((prev) => !prev);
    dispatch({
      type :"logout"
    })

    setAuth(null);
  }

  const generateCroppedImage = async () => {
    if (completedCrop && imageRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const crop = completedCrop;

      const image = imageRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Calculate scale
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      // Set canvas dimensions to the cropped area in natural size
      canvas.width = crop.width * scaleX;
      canvas.height = crop.height * scaleY;

      // Draw the cropped area on the canvas
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        canvas.width,
        canvas.height
      );

      // Convert canvas to blob
      return new Promise<File>((resolve) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const croppedFile = new File([blob], "cropped_image.png", {
                type: blob.type,
              });
              resolve(croppedFile);
            }
          },
          "image/png",
          1
        );
      });
    }
  };

  const handleUpload = async () => {
    const croppedFile = await generateCroppedImage();
    if (croppedFile) {
      const imageUrl = await imageuploadfun(croppedFile);
      if (imageUrl) {
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          image: imageUrl,
        }));
      }
      setSelectedImage(null);
    }
    dispatch({
      type: "updateprofilephoto",
    });
  };

  const handleImageDelete = async () => {
    const data = await imagedeletefun();
    if (data === null)
      setUserDetails((prev) => ({
        ...prev,
        image: defaultimg,
      }));
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!auth) return;
      const data = await userderailsfun();
      if (data) {
        setUserDetails(data);
      }
    };
    fetchUserDetails();
  }, [auth]);

  return (
    <>
      <div className="relative w-full">
        <motion.div
          initial={{ y: "-100%" }}
          animate={
            userModal
              ? { y: "0", transition: { duration: 0.3 } }
              : {
                  y: "-100%",
                  transition: { duration: 0.3 },
                }
          }
          className="usernavbar  fixed left-[25%] rounded-md z-[10050] bg-gray-900 max-sm:left-0 max-sm:w-full md:left-[23%] md:w-[55%] h-[60%] lg:w-[50%]"
        >
          <div className="flex bg-gray-400 justify-center items-center h-[25%]">
            <div className="flex relative  justify-center items-center w-[7rem] h-[7rem]">
              <Image
                className="w-full h-full rounded-full"
                src={userDetails.image || defaultimg}
                alt="user-image"
                width={128}
                height={128}
              />
              {userDetails.image!==defaultimg && (
                <Image
                  src={trashIcon}
                  onClick={handleImageDelete}
                  alt="delete btn"
                  className="w-[1.5rem] absolute bottom-0 z-[100] cursor-pointer bg-red-300 rounded-full p-1"
                />
              )}
              <button
                className="absolute cursor-pointer w-[24%] rounded-full h-full"
                onClick={() => fileInputRef.current?.click()}
              ></button>
            </div>
          </div>

          <div className="flex overflow-hidden relative flex-col justify-start items-center h-[75%]">
            <Topfeeds
              open={() => setTopFeedOpen((prev) => !prev)}
              value={topFeedOpen}
            />
            <p className="text-red-500">{error}</p>
            <h1 className="text-[2rem]">
              <span className="welcometxt">Welcome</span> {userDetails.name}
            </h1>
            <span>{userDetails.email}</span>
            <motion.button
              initial={{ x: 0 }}
              whileHover={{ x: 20, transition: { duration: 0.3 } }}
              className="text-[1.4rem] relative top-10 p-1 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-700"
              onClick={() => setTopFeedOpen((prev) => !prev)}
            >
              Top Feeds For You{" "}
            </motion.button>
            <div className="absolute p-3  w-full bottom-0 flex  gap-5 justify-start items-center  ">
              <button onClick={() => setUserModal((prev) => !prev)}>
                close
              </button>
              <button className=" text-red-500" onClick={handelLogout}>
                logout
              </button>
            </div>
          </div>
        </motion.div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />

        <FloatingNav
          navItems={navItems}
          showmodal={() => setUserModal((prev) => !prev)}
          authetification={auth}
          photo={userDetails.image}
        />
        <BackgroundBeamsWithCollisionHero />
      </div>
      {selectedImage && (
        <div className="cropbackdrop flex  absolute top-0 flex-col z-[100000] justify-center items-center h-full w-full">
          <div className="h-[85%] w-auto flex justify-center items-center">
            <ReactCrop
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              circularCrop
              aspect={1}
            >
              <Image
                ref={imageRef}
                className="w-full h-full object-contain"
                src={selectedImage}
                alt="Selected image"
                width={128}
                height={128}
              />
            </ReactCrop>

            <canvas ref={canvasRef} className="hidden" />
          </div>
          <div className="flex justify-center gap-3 items-center w-[50%]">
            <button
              onClick={handleUpload}
              className="btn-primary p-2 mt-2 rounded-md text-cyan-300"
            >
              Upload
            </button>
            <button
              onClick={() => setSelectedImage("")}
              className="btn-primary p-2  mt-2 rounded-full text-red-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
