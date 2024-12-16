const defaultImage = "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1734154458~exp=1734158058~hmac=711058fd6321efeb48ab11328465803e21da555883080037e8449d0d0080458c&w=1380"
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
      const reviews = data.data.map((review: any) => ({
        ...review,
        photo: review.photo ? `${URL}uploads/users/${review.photo}` : defaultImage,
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
