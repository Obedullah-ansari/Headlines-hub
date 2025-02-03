interface FeedType {
  topNewsId: string;
}

interface TopFiveItem {
  topheadline :string
  
}



async function topfeed({ topNewsId }: FeedType): Promise<TopFiveItem[]|null> {
  const URL = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(
    `${URL}api/v1/headlines/topheadlines/${topNewsId}`,
    {
      method: "GET",
    }
  );

  const data = await response.json();
  if (response.ok) {
    return data
  }

  // Handle the error by returning a default response or throwing an error
  return null; // Return empty array as a fallback
}

export default topfeed;
