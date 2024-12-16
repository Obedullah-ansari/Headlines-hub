export default async function handleImageDelete(): Promise<string | null> {
    const URL = process.env.NEXT_PUBLIC_API_URL;
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(
            `${URL}api/v1/auth/deletePhoto`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

      if (response.ok) {
        const updatedData = await response.json();
        return null
      } else {
        const errorMessage = await response.text();
        console.error("Error Message:", errorMessage);
        throw new Error(errorMessage || "Image upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      return null;
    }
  }
  