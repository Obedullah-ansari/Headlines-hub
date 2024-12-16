import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import fetchReviews from "@/app/reviews/reviewsfun";
import Reviewcard from "@/customcomponents/ReviewCard";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import next from "@/public/next.png"
import Image from "next/image";

interface UserReview {
  review: string;
  photo: string;
  rating: number;
  name: string;
}


export default function Carousel() {
  const imageUpdate = useSelector((state: RootState) => state.update);
  const reviewUpdate = useSelector((state: RootState) => state.review)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  useEffect(() => {
    const handelReviews = async () => {
      
      const data = await fetchReviews();
      if (data) {
        setUserReviews(data);
      }
    };
    

    handelReviews();
  }, [imageUpdate,reviewUpdate]);
 


  return (
    <div className="w-[100%] max-sm:h-[55vh] max-sm:mt-[6%]  overflow-hidden">
      <div className="embla max-sm:h-full  bg-neutral-900" ref={emblaRef}>
        <div className="embla__container  h-full ">
          {
           userReviews.map((userdata,index)=>(
 
              <Reviewcard
              key={index}
               text ={userdata.review}
               photo= {userdata.photo}
               rating= {userdata.rating}
               name = {userdata.name}
            />

           ))
          }
        </div>
      </div>
      <div className="w-full  max-sm:absolute z-50 flex max-sm:h-[7%] justify-center items-center p-5 gap-10">
        <Image src={next} alt="prev" className="prev rounded-full w-[1.5rem] bg-transparent backdrop-blur-[3px] " onClick={scrollPrev} />
        <Image src={next} alt="next" className="next w-[1.5rem] rounded-full bg-transparent backdrop-blur-[3px] " onClick={scrollNext} />
      </div>
    </div>
  );
}
