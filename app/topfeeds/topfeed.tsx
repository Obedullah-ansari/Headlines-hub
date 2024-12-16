interface feedtyped{
    topNewsId : string
}
async function topfeed({topNewsId}: feedtyped):Promise<any> {
    const URL = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(
        `${URL}api/v1/headlines/topheadlines/${topNewsId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      if (response.ok) {
        return data;
      }
    };


export default topfeed;
