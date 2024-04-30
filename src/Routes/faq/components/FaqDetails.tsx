// import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Questions from './data'
interface FaqType {
  id: string;
  Question: string;
  Answer: string;
}
const FaqDetails = () => {
  const { id } = useParams()
  const [faq, setFaq] = React.useState<FaqType>({ Answer: '', Question: '', id: '' })
  useEffect(() => {
    const f = Questions.filter(e => e.id === id)[0] as FaqType
    if (f) {
      setFaq(f)
    }
  },[id])

  // useEffect(() => {
  //   axios.get("https://axeiny.tech:4004/faq/").then((response) => {
  //     response.data;
  //     setFaq(response.data);
  //   });

  // }, []);
  return (
    <div className='w-full px-[30px]'>
      <div className='my-[50px] text-3xl max-md:text-[16px]'>Veuillez remplir ces champs concernant la question que vous souhaitez ajouter : </div>
      <div className='w-full '>
        <div className='text-3xl mb-[20px] font-medium max-md:text-[16px]'>Question : </div>
      <textarea  className='w-full  outline-none border-[0.5px] border-black rounded-lg pl-[10px] ' readOnly value={faq.Question} /></div>
      <div className='w-full'>
        <div className='text-3xl mb-[20px] font-medium max-md:text-[16px]'>Answer : </div>
      <textarea  className='w-full  outline-none  border-[0.5px] border-black rounded-lg pl-[10px] ' readOnly value={faq.Answer} /></div>
    </div>
  )
}

export default FaqDetails
