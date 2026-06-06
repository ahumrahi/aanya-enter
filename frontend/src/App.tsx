import { useState } from "react";
import axios from "axios";

function App() {

 const [question,setQuestion] =
 useState("");

 const [answer,setAnswer] =
 useState("");

 async function askAgent(){

   const response =
   await axios.post(
    "https://your-api/chat",
    {
      question
    }
   );

   setAnswer(response.data.answer);
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