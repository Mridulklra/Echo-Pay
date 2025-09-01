// 

import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async () => {
        if (!firstName || !lastName || !username || !password) {
            toast.error("Please fill all fields");
            return;
        }
        
        setIsLoading(true);
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                username,
                firstName,
                lastName,
                password
            });
            
            localStorage.setItem("token", response.data.token);
            toast.success("Account created successfully!");
            
            // Navigate after a short delay to allow the toast to be seen
            setTimeout(() => {
                navigate("/dashboard");
            }, 1500);
        } catch (error) {
            console.error("Signup error:", error);
            const errorMessage = error.response?.data?.message || "Signup failed. Please try again.";
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
                        <Heading label={"Create Account"} />
                        <SubHeading label={"Enter your information to get started"} />
                    </div>
                    
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputBox 
                                onChange={e => setFirstName(e.target.value)} 
                                placeholder="John" 
                                label={"First Name"}
                                type="text"
                            />
                            <InputBox 
                                onChange={e => setLastName(e.target.value)} 
                                placeholder="Doe" 
                                label={"Last Name"}
                                type="text"
                            />
                        </div>
                        
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
                                onClick={handleSignup} 
                                label={isLoading ? "Creating Account..." : "Sign up"}
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    
                    <div className="mt-6">
                        <BottomWarning 
                            label={"Already have an account?"} 
                            buttonText={"Sign in"} 
                            to={"/signin"} 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}