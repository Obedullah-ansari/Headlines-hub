interface SubmitReviewParams {
  token: string | null;
}

async function deleteReviewfun({
    token
}: SubmitReviewParams):Promise<null|void> {
  const URL = process.env.NEXT_PUBLIC_API_URL;
  if (!token) {
    console.log(token)
  }
  try {
    const response = await fetch(`${URL}api/v1/auth/deleteReview`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return null;
    } else {
      throw new Error("Failed to delete review");
    }
  } catch (error) {
    console.log("Error occurred while deleting the review:", error);
  }
}

export default deleteReviewfun;
