import React, { useState } from "react";
import { MdDone } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Login } from "../../store/reducers/auth.reducer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Toaster } from "react-hot-toast";

const SignIn = () => {
  const [rester, setRester] = useState(false);
  const [showpass, setShowpass] = useState(false);
  const [Email, setEmail] = useState("");
  const emailHandler = (e) => setEmail(e.target.value);
  const [Password, setPassword] = useState("");
  const passwordHandler = (e) => setPassword(e.target.value);
  const dispatch = useDispatch();
  const handleSignIn = () => {
    const LoginBody = {
      Email,
      Password,
    };
   dispatch(Login(LoginBody));

    
  };
  return (
    <div className="flex w-screen h-screen ">
       <Toaster position="bottom_center" />
      <img
        src="../assets/signin.png"
        alt=""
        className="w-[50vw] h-screen max-md:hidden auto"
      />
      <div className="container">
        <h1 className="title ">bienvenue</h1>
        <h3 className="subtitle">Veuillez entrer vos coordonnées :</h3>
        <div className="flex flex-col items-center w-full max-md:gap-[67px]">
          <input
            type="text"
            onChange={emailHandler}
            className="input_sign"
            placeholder="Entrez votre adresse e-mail"
          />
          <div className="inputdiv">
            <input
                   type={`${showpass ? "text" : "password"}`}
              onChange={passwordHandler}
              className=" si2"
              placeholder="Entrez votre mot de passe"
            />
            {!showpass ? (
              <FaEye
                className={`link `}
                onClick={() => {
                  setShowpass((prev) => !prev);
                }}
              />
            ) : (
              <FaEyeSlash
                className={`link `}
                onClick={() => {
                  setShowpass((prev) => !prev);
                }}
              />
            )}
          </div>
     
        </div>{" "}
        <div onClick={handleSignIn} className="button_sign">
          Se connecter
        </div>
      </div>
    </div>
  );
};

export default SignIn;
