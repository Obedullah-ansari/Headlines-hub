import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import fetchReviews from "@/app/reviews/reviewsfun";
import { submitReviewsfun } from "@/app/reviews/reviewsubmitfun";
import { useDispatch } from "react-redux";
import Modaloverlay from "./../Modaloverlay";
import deleteReviewfun from "@/app/reviews/deleteReviewfun";


interface Submitdata {
  review: string;
  rating: number;
}
interface Authinfo {
  Auth: string | null;
  userId: string | null;
}

function Review() {
  const dispatch = useDispatch();
  const [userAuth, setUserAuth] = useState<Authinfo>({
    Auth: "",
    userId: "",
  });
  const [userReviewExists, setUserReviewExists] = useState<boolean>(false);
  const [submitReview, setSubmitReview] = useState<Submitdata>({
    review: "",
    rating: 0,
  });
  const [modalOpen, setMoadlOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [wordCount, setWordCount] = useState<number>(0);
  const maxWordCount = 100;

  useEffect(() => {
    const Auth = localStorage.getItem("token") ||null;
    const userId = localStorage.getItem("userId") ||null;
    setUserAuth({
      Auth: Auth,
      userId: userId,
    });
  }, []);

  useEffect(() => {
    async function handleOldReview() {
      if (userAuth.Auth && userAuth.userId) {
        const data = await fetchReviews();
        if (data) {
          const userExistingReview = data.find(
            (review: any) => review.user === userAuth.userId
          );
          if (userExistingReview) {
            setUserReviewExists((prev)=>!prev);
            setSubmitReview({
              review: userExistingReview.review,
              rating: userExistingReview.rating,
            });
            setWordCount(userExistingReview.review.split(/\s+/).length);
          }
        } else return;
      }
    }

    handleOldReview();
  }, [userAuth.Auth]);

  const handleRatingChange = (rating: number) => {
    setSubmitReview((prev) => ({ ...prev, rating }));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const words = e.target.value.split(/\s+/).filter(Boolean);
    if (words.length <= maxWordCount) {
      setSubmitReview((prev) => ({ ...prev, review: e.target.value }));
      setWordCount(words.length);
    }
  };

  async function handelSubmitReview(e: React.FormEvent) {
    e.preventDefault();
    if(!userAuth.Auth){
      setMessage("please signin to review")
      setMoadlOpen((prev)=>!prev)
      return
    }
    if(submitReview.rating===0){
      setMessage("you forget to give rating")
      setMoadlOpen((prev)=>!prev)
      return
    }

    const token = userAuth.Auth;
    const userWrotedReview = submitReview;
    const response = await submitReviewsfun({
      userReviewExists,
      token,
      userWrotedReview,
    });
    if (response) {
      dispatch({
        type: "review",
      });
      setMessage("Your review means a lot, We'll work hard to improved.");
      setUserReviewExists(()=>true)
      setMoadlOpen((prev) => !prev);
    }
  }

  async function handelDeleteReview() {
    alert("are you shure you want to delete your review")
     const token = userAuth.Auth;
    const response = await deleteReviewfun({ token });
    if (response === null) {
      setUserReviewExists(()=>false);
      setSubmitReview({
        review: "",
        rating: 0,
      });
      dispatch({
        type: "review",
      });
    } else alert("somethig went wrong");

}

  return (
    <>
      <div className="  top-[25%] h-[50%] w-full flex flex-col gap-2 justify-center items-center absolute">
        <form
          onSubmit={handelSubmitReview}
          className=" magicform sm:w-[85%] md:w-[50%] lg:w-[40%] max-sm:w-[95%] h-[95%] gap-3 flex-col flex justify-center items-center rounded-lg p-1"
        >
          <StarRating
            rating={submitReview.rating}
            onRatingChange={handleRatingChange}
          />
          <textarea
            required
            className="w-[95%] rounded-lg p-3 bg-neutral-900 h-[65%]"
            value={submitReview.review}
            onChange={handleTextChange}
          />
          <p className="text-gray-950 text-sm">
            {wordCount}/{maxWordCount} words
          </p>
          {userReviewExists ? (
            <button type="submit" className="bg-indigo-500 w-16 p-1 rounded-md">
              Edit
            </button>
          ) : (
            <button type="submit" className="bg-indigo-500 p-1 rounded-md">
              Submit
            </button>
          )}
        </form>
       {
        userReviewExists&&
        <button className="text-red-500" onClick={handelDeleteReview}>
         delete
      </button>
       }
      </div>
      {modalOpen && (
        <Modaloverlay
          message={message}
          onclose={() => setMoadlOpen((prev) => !prev)}
        />
      )}
    </>
  );
}

export default Review;
