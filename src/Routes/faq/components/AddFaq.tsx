import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../../utils/Loading";
// import axios from 'axios';
const AddFaq = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
const [loading,setLoading]=useState(false)
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
    axios.post(
      import.meta.env.VITE_Main_ENDPOINT+"faq",
      { "Question": question, "Answer": answer },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
       },
      }
    ).then(() => {
      toast.success("Faq ajouté")
      setTimeout(() => {
        window.location.href = "/faq/"
      }, 1000);
      
    }).catch((err) => {
      toast.error(err.response.data.message[0]);
      setLoading(false)
    })
  }
  if (loading) {
    <Loading/>
  }

  return (
    <form className="w-full px-[30px] flex flex-col" onSubmit={submit}>
      <div className="my-[50px] text-3xl max-md:text-[16px]">
        Veuillez remplir ces champs concernant la question que vous souhaitez
        ajouter :{" "}
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
          Reponse :{" "}
        </div>
        <textarea
          name="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full  outline-none  border-[0.5px] border-black rounded-lg pl-[10px] "
          placeholder="Entrez la réponse correspandante a la question   "
        />
      </div>
      <button
        type="submit"
        className="w-[180px] col-span-2 cursor-pointer bg-[#DB2719] mb-[100px] flex justify-center items-center h-[50px] text-white mt-[60px] gap-[10px] self-end mr-[40px] rounded-xl"
      >
        {" "}
        envoyer
        <FaArrowRight />
      </button>
    </form>
  );
};

export default AddFaq;
