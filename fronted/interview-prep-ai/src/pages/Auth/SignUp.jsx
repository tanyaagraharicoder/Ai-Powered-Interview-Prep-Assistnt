import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import ProfilePhotoSelecter from "../../components/Input/ProfilePhotoSelecter";
import { validateEmail } from "../../utils/helper";

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  // Handle signUp form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return;

    }
    if(!password){
      setError("Please Enter the password");
      return;

    }

    setError("");

    // SignUp Api call
    try {
      
    } catch (error) {
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("Something went wrong. Please try again.")
      }
      
    }






  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black"> Create an Account</h3>
      <p className="text-xs text-state-700 mt-[5px] mb-6">join us today by entering your details below.</p>
      <form onSubmit={handleSignUp}>
        <ProfilePhotoSelecter image={profilePic} setImage={setProfilePic}/>



        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="John"
            type="text"
          />
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />
        </div>
        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
        <button type="submit" className="btn-primary">
          SIGN UP
        </button>
        <p className="text-[13px] text-state-800 mt-3">
          Already an account?{" "}
          <button
            className="font-medium text-primary underline cusor-pointer"
            onClick={() => {
              setCurrentPage("login");
            }}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
