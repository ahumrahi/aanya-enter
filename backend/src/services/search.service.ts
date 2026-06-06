import axios from "axios";

export async function searchInternet(
 query: string
) {

 const response = await axios.post(
   "https://google.serper.dev/search",
   {
      q: query
   },
   {
      headers: {
        "X-API-KEY":
        process.env.SERPER_API_KEY
      }
   }
 );

 return response.data;
}