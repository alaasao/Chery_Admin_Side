import { FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DelButt from "../../../utils/DelButt";
import toast from "react-hot-toast";
import Loading from "../../../utils/Loading";

// import axios from "axios";
const EditFaq = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

   const [loading, setLoading] = useState(true); // set this to false
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(import.meta.env.VITE_Main_ENDPOINT+"faq/"+id
      );
      setQuestion(response.data.Question);
      setAnswer(response.data.Answer);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  async function submit(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (question === "") {
      toast.error("Veuillez entrer la question ")
      return
    }
    if (answer === "") {
      toast.error("Veuillez entrer la reponse")
      return
    }
  setLoading(true)
     await axios.put(
      import.meta.env.VITE_Main_ENDPOINT + "faq/"+id,
      { Question: question, Answer: answer },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
       },
      }
   
     ).then(() => {
      toast.success("faq mis a jour")
      setTimeout(() => {
        window.location.href = "/faq/"+id;
      }, 1000);
     }).catch((err) => {
       setLoading(false)
       toast.error(err.response.data.message[0]);
    })

   
  }

    if (loading) {
      return <Loading/>
  }
  return (
    <form className="w-full px-[30px] flex flex-col" onSubmit={submit}>
      <div className="my-[50px] text-3xl max-md:text-[16px]">
        Veuillez remplir ces champs concernant la question que vous souhaitez
        modifie :{" "}
      </div>
      <div className="w-full ">
        <div className="text-3xl mb-[20px] font-medium max-md:text-[16px]">
          Question :{" "}
        </div>
        <textarea
          name="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full  outline-none border-[0.5px] border-black rounded-lg pl-[10px] "
          placeholder="Entrez la question que vous voulez ajouter  "
        />
      </div>
      <div className="w-full">
        <div className="text-3xl mb-[20px] font-medium max-md:text-[16px]">
          Response :{" "}
        </div>
        <textarea
          name="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full  outline-none  border-[0.5px] border-black rounded-lg pl-[10px]  min-h-[100px] "
          placeholder="Entrez la réponse correspandante a la question   "
        />
      </div>
      <div className="flex items-end justify-end gap-[20px] col-span-2 my-[50px]" >
        <DelButt id={id || ""} deleteRoute="faq" icon={false} back="faq" name="question" />
        <button
        type="submit"
        className="w-[140px] cursor-pointer bg-green-600 flex justify-center items-center h-[50px] text-white  gap-[10px] rounded-xl"
      >
        {" "}
        envoyer
        <FaArrowRight />
      </button>
        </div>
    
    </form>
  );
};

export default EditFaq;
