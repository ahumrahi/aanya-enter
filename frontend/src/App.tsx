import { useState } from "react";
import axios from "axios";

function App() {

 const [question,setQuestion] =
 useState("");

 const [answer,setAnswer] =
 useState("");

 const API =
  import.meta.env.VITE_API_URL;

 async function askAgent() {

  console.log("API:", API);
  console.log("Question:", question);

  try {

    const response =
      await axios.post(
        `${API}/chat`,
        { question }
      );

    console.log("Response:", response.data);

    setAnswer(response.data.answer);

  } catch (error) {

    console.error("API Error:", error);

  }
}

 return (
  <>
   <textarea
    value={question}
    onChange={(e)=>
      setQuestion(e.target.value)}
   />

   <button onClick={askAgent}>
     Ask
   </button>

   <pre>{answer}</pre>
  </>
 );
}

export default App;