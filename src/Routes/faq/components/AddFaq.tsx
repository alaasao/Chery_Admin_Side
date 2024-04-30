
import { FaArrowRight } from 'react-icons/fa'
import { useState } from 'react';
import React from 'react';
import axios from 'axios';
const AddFaq = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    async function submit(e: { preventDefault: () => void; }) {
        e.preventDefault();

        // const response = await axios.post('YOUR_API_URL', {
         
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ question, answer })
        // });

        // const data = await response.data;
        // console.log(data);
    }

    return (
        <form className='w-full px-[30px] flex flex-col' onSubmit={submit}>
        <div className='my-[50px] text-3xl max-md:text-[16px]'>Veuillez remplir ces champs concernant la question que vous souhaitez ajouter : </div>
        <div className='w-full '>
          <div className='text-3xl mb-[20px] font-medium max-md:text-[16px]'>Question : </div>
        <textarea  name='question'         value={question}
                    onChange={e => setQuestion(e.target.value)} className='w-full  outline-none border-[0.5px] border-black rounded-lg pl-[10px] '   placeholder='Entrez la question que vous voulez ajouter  ' /></div>
        <div className='w-full'>
          <div className='text-3xl mb-[20px] font-medium max-md:text-[16px]'>Answer : </div>
        <textarea name='answer'             value={answer}
                    onChange={e => setAnswer(e.target.value)} className='w-full  outline-none  border-[0.5px] border-black rounded-lg pl-[10px] '   placeholder='Entrez la réponse correspandante a la question   ' /></div>
        <button
              type="submit"
              className="w-[180px] cursor-pointer bg-[#DB2719] mb-[100px] flex justify-center items-center h-[50px] text-white mt-[60px] gap-[10px] self-end mr-[40px] rounded-xl"
            >
              {" "}
              envoyer
              <FaArrowRight />
            </button>
          </form>
    )
}

export default AddFaq;