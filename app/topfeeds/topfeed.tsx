interface FeedType {
  topNewsId: string;
}

interface TopFiveItem {
  id: string;
  title: string;
  // Add any other properties you expect here
}

interface FeedResponse {
  topfive: TopFiveItem[];
}

async function topfeed({ topNewsId }: FeedType): Promise<FeedResponse> {
  const URL = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(
    `${URL}api/v1/headlines/topheadlines/${topNewsId}`,
    {
      method: "GET",
    }
  );

  const data = await response.json();

  if (response.ok) {
    // Ensure you return the correctly shaped data
    return { topfive: data.topfive || [] };
  }

  // Handle the error by returning a default response or throwing an error
  return { topfive: [] }; // Return empty array as a fallback
}

export default topfeed;
