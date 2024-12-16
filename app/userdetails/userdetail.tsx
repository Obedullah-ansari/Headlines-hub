import defimg from "@/public/ht.jpeg";

export default async function userdetails() {
  const URL = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  try {
    const response = await fetch(`${URL}api/v1/auth/profile/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await response.json();
    const userPhoto =
      data.data.user.photo === "default.jpg"
        ? defimg
        : `${URL}uploads/users/${data.data.user.photo}`;

    const userdata = {
      image: userPhoto,
      name: data.data.user.name,
      email: data.data.user.email,
    };
    return userdata;
  } catch (error) {
    console.log(error);
  }
}
