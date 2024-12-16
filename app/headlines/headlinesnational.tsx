// app/headlines/headlinesData.tsx
export async function fetchNewsHeadlines(URL: string) {
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
     
  
      if (!response.ok) {
        console.log("Failed to fetch news");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error fetching headlines:", error);

    }
  }
  