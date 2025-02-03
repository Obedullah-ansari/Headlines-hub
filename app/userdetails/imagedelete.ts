export default async function handleImageDelete(): Promise<string | null> {
    const URL = process.env.NEXT_PUBLIC_API_URL;
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(
            `${URL}api/v1/image/deleteimages`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

      if (response.ok) {
        return null
      } else {
        const errorMessage = await response.text();
        console.log("Error Message:", errorMessage);
        throw new Error(errorMessage || "Image upload failed");
      }
    } catch (error) {
      console.log("Upload error:", error);
      return null;
    }
  }
  