interface SubmitReviewParams {
    userReviewExists: boolean;
    token: string|null;
    userWrotedReview: {
      review: string;
      rating: number;
    };
  }
  
  export  async function submitReviewsfun({
    userReviewExists,
    token,
    userWrotedReview,
  }: SubmitReviewParams): Promise<string|void> {
    const URL = process.env.NEXT_PUBLIC_API_URL;
  
    if (!token) {
      console.error("Authorization token is missing.");
      return;
    }
    
    console.log(userReviewExists)
  
    try {
      const url = userReviewExists
        ? `${URL}/api/v1/auth/updateReview`
        : `${URL}/api/v1/auth/review`;
      const method = userReviewExists ? "PATCH" : "POST";

      console.log(url)
  
      const response = await fetch(url, {

        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userWrotedReview),
      });
  
      if (response.ok) {
        return "Review submitted successfully";
      }
  
    } catch (error) {
      console.error("Error occurred while submitting the review:", error);
    }
  }
  