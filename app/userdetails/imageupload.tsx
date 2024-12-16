export default async function handleImageUpload(file: File): Promise<string | null> {
    const URL = process.env.NEXT_PUBLIC_API_URL;
    const token = localStorage.getItem("token");
    try {
      if (!file) {
        console.error("No file provided for upload");
        return null;
      }
  
      const formData = new FormData();
      formData.append("photo", file);
  
      const response = await fetch(`${URL}api/v1/auth/updateProfile`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
          },
        body: formData,
      });
  
   
      if (response.ok) {
        const updatedData = await response.json();
        return `${URL}uploads/users/${updatedData.data.user.photo}`;
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Image upload failed");
      }
    } catch (error) {
      console.log("Upload error:", error);
      return null;
    }
  }
  