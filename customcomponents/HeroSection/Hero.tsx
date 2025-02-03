import { FloatingNavHero } from "@/customcomponents/HeroSection/FloatingNavHero";
import Image from "next/image";
import landingpageimg from "@/public/headpic.png";

const Hero: React.FC = () => {
  return (
    <>
      <FloatingNavHero />
      <section className="w-full  bg-black flex flex-col justify-center items-center relative">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)]"></div>
        <div className="w-[90%] flex justify-center items-center rounded-md bg-gradient-to-r from-indigo-500 to-pink-500">
          <Image
            className="w-[97%] pt-[2%]"
            src={landingpageimg}
            alt="landing page image"
          />
        </div>
      </section>
    </>
  );
};

export default Hero;
