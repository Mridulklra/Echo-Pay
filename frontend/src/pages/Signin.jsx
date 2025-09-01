// import { useState } from "react";
// import { BottomWarning } from "../components/BottomWarning";
// import { Button } from "../components/Button";
// import { Heading } from "../components/Heading";
// import { InputBox } from "../components/InputBox";
// import { SubHeading } from "../components/SubHeading";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export const Signin = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSignin = async () => {
//     try {
//       const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
//         username,
//         password
//       });
//       localStorage.setItem("token", response.data.token); 
//       navigate("/dashboard");
//     } catch (err) {
//       console.error("Signin error:", err.response?.data || err.message);
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div className="bg-slate-300 h-screen flex justify-center">
//       <div className="flex flex-col justify-center">
//         <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
//           <Heading label={"Sign in"} />
//           <SubHeading label={"Enter your credentials to access your account"} />
//           <InputBox onChange={e => setUsername(e.target.value)} placeholder="mridul@gmail.com" label={"Email"} />
//           <InputBox onChange={e => setPassword(e.target.value)} placeholder="123456" label={"Password"} />
//           <div className="pt-4">
//             <Button onClick={handleSignin} label={"Sign in"} />
//           </div>
//           <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
//         </div>
//       </div>
//     </div>
//   );
// };


import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignin = async () => {
    if (!username || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username,
        password
      });
      localStorage.setItem("token", response.data.token);
      toast.success("Login successful!");
      
      // Navigate after a short delay to allow the toast to be seen
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      console.error("Signin error:", err.response?.data || err.message);
      const errorMessage = err.response?.data?.message || "Invalid credentials. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex justify-center items-center p-4">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <div className="flex flex-col justify-center w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 transition-all duration-200">
          <div className="text-center mb-6">
            <Heading label={"Welcome Back"} />
            <SubHeading label={"Sign in to access your account"} />
          </div>
          
          <div className="space-y-4">
            <InputBox 
              onChange={e => setUsername(e.target.value)} 
              placeholder="email@example.com" 
              label={"Email"} 
              type="email"
            />
            
            <InputBox 
              onChange={e => setPassword(e.target.value)} 
              placeholder="••••••••" 
              label={"Password"} 
              type="password"
            />
            
            <div className="pt-2">
              <Button 
                onClick={handleSignin} 
                label={isLoading ? "Signing in..." : "Sign in"}
                disabled={isLoading}
              />
            </div>
            
            <div className="text-right text-sm">
              <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                Forgot password?
              </a>
            </div>
          </div>
          
          <div className="mt-6">
            <BottomWarning 
              label={"Don't have an account?"} 
              buttonText={"Sign up"} 
              to={"/signup"} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};