import React, { useState } from "react";
import { MdDone } from "react-icons/md";

const SignIn = () => {
  const [rester, setRester] = useState(false);
  return (
    <div className="flex w-screen h-screen">
      <img
        src="../assets/signin.png"
        alt=""
        className="w-[60%] h-screen max-md:hidden"
      />
      <div className="flex flex-col items-center w-[40%] h-screen  max-md:w-full max-md:justify-between max-md:py-[30px]">
        <h1 className="capitalize good text-[#D12621] text-4xl md:mt-[110px] max-md:mt-0 ">
          bienvenue
        </h1>
        <h3 className="text-3xl md:mt-[120px]   max-lg:text-xl">
          Veuillez entrer vos coordonnées :
        </h3>
        <div className="flex flex-col items-center w-full max-md:gap-[67px]">
          <input
            type="text"
            className=" flex w-[80%] h-[71px] border-2 border-black rounded-lg md:mt-[67px]   pl-[20px] text-2xl max-sm:text-[16px]"
            placeholder="Entrez votre adresse e-mail"
          />

          <input
            type="text"
            className=" flex w-[80%] h-[71px] border-2 border-black rounded-lg md:mt-[67px]   pl-[20px] text-2xl  max-sm:text-[16px]"
            placeholder="Entrez votre mot de passe"
          />
        </div>{" "}
        <div
          className="mt-[67px]   flex items-center text-2xl gap-[20px] font-bold w-[80%] pl-[20px] cursor-pointer"
          onClick={() => setRester((prev) => !prev)}
        >
          {rester ? (
            <div
              className={`w-[30px] h-[30px] flex justify-center items-center  rounded-lg border-[0.5px]  bg-[#FF4423]
       
           `}
            >
              <MdDone className="text-2xl text-white " />{" "}
            </div>
          ) : (
            <div
              className={`w-[30px] h-[30px] rounded-lg border-[0.5px]  border-[#858282] 
    
        `}
            ></div>
          )}
          <div>Restez connecté</div>
        </div>
        <div className="w-[80%] h-[71px] bg-black text-white md:mt-[93px]   rounded-lg flex justify-center items-center text-3xl ">
          Se connecter
        </div>
        <a href="" className="mt-[100px] max-md:mt-0 underline text-xl">
          Mot de passe oublié?
        </a>
      </div>
    </div>
  );
};

export default SignIn;
