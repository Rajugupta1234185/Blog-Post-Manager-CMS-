import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
export default function Login() {
  const navigate=useNavigate();
  const [showPassword, setshowPassword] = useState(false);
  const[userName,setuserName]=useState('');
  const[password,setpassword]=useState('');


  //sending logincredentiasl to backend
  const handlelogin = async () => {
  if (userName && password) {
    try {
      const res = await axios.post("http://192.168.1.75:5000/api/logincredential/auth", {
        userName,
        password,
      });

      console.log(res.data);
      if (res.status === 200) {
        console.log("User verified successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Invalid credentials");
      } else {
        alert("Internal server error occurred");
      }
    }
  } else {
    alert("Enter both E-mail and Password");
  }
};


  return (
    <div className="flex h-screen w-screen bg-white">
      {/* Hide on mobile */}
      <div
        className="hidden sm:block h-full w-[60%] bg-cover bg-center"
        style={{ backgroundImage: "url('/Images/login.jpg')" }}
      ></div>

      {/* Login Form */}
      <div className="h-full w-full sm:w-[40%] bg-[#01388F] flex flex-col overflow-auto p-4 sm:p-10 relative ">
        <div className="mt-15 sm:mt-0">
          <p className="text-3xl text-white font-bold mt-10 sm:mt-20">
            Welcome <span className="text-pink-500">Back!</span>
          </p>
          <p className="text-base text-white font-thin mt-3">
            Don't have any account?{" "}
            <span className="ml-2 underline hover:text-blue-500 cursor-pointer">
              Signup
            </span>
          </p>
        </div>

        <div className="flex flex-col justify-start items-start mt-10 text-xl text-white font-light relative md:ml-15">
          <p>Username:</p>
          <input
            type="text"
            placeholder="Enter Username"
            className="mt-3 w-full sm:w-[18rem] bg-white text-blue-500 text-lg focus:outline-none focus:ring-1 focus:ring-pink-500 px-2 py-1 rounded"
            onChange={(e)=>setuserName(e.target.value)}
          />

          <p className="mt-4">Password:</p>
          <div className="relative w-full sm:w-[18rem]">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="w-full bg-white text-blue-500 text-lg focus:outline-none focus:ring-1 focus:ring-pink-500 px-2 py-1 rounded"
              onChange={(e)=>setpassword(e.target.value)}
            />
            <span
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setshowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="text-blue-700" />
              ) : (
                <FaEye className="text-blue-700" />
              )}
            </span>
          </div>

          <div className="flex flex-row mt-4 items-center gap-2">
            <input type="checkbox" />
            <label className="font-extralight text-sm">Keep me logged in</label>
            <p className="font-extralight text-sm ml-auto underline hover:text-blue-500 cursor-pointer">
              Forgot Password?
            </p>
          </div>
        </div>

        <div className="bg-[#E766EB]/30 w-full sm:w-[18rem] h-[2.5rem] flex items-center justify-center mt-10 rounded-md cursor-pointer hover:text-xl text-white font-semibold md:ml-15" onClick={handlelogin}>

          <p>Login</p>
        </div>
      </div>
    </div>
  );
}
