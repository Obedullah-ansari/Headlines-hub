export async function fetchNewsHeadlinesGlobal(URL: string) {
    const token = localStorage.getItem("token")
      try {
        const response = await fetch(URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send token for protected routes
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