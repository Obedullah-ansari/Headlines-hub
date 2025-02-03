export default async function searchheadlines(searchQuery: string) {
  const URL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(
      `${URL}api/v1/headlines/search?query=${encodeURIComponent(searchQuery)}`
    );
     const data = await response.json();
     if(data){
        return data.data
     }
  } catch (error) {
    console.error("Failed to search headlines:", error);
  }
}
