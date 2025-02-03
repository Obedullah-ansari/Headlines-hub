interface reviewtyped {
  review: string;
  photo: string;
  rating: number;
  name: string;

}


export default async function fetchReviews() {
  const URL = process.env.NEXT_PUBLIC_API_URL;
  

  try {
    const response = await fetch(`${URL}api/v1/auth/allreviews`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      const reviews = data.data.map((review:reviewtyped) => ({
        ...review,
        photo:  `${URL}uploads/users/${review.photo}` 
      }));

      return reviews;
    } else {
      console.error(`Failed to fetch reviews: ${data.message}`);
      return [];
    }
  } catch (error) {
    console.log("Error fetching reviews:", error);
    return [];
  }
}
