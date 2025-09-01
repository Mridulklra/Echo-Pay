import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import VoicePayment from "../components/VoicePayment"
import axios from "axios"

export const Dashboard = () => {
    const [balance, setBalance]=useState(0);
    const [users, setUsers] = useState([]);
    const [showVoicePayment, setShowVoicePayment] = useState(false);

    useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("token");
        
        const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
          headers: {
            Authorization: `Bearer ${token}`
           }
        });
        setBalance(response.data.balance);
      } catch (err) {
        console.error("Error fetching balance:", err);
      }
    };

    fetchBalance();
  }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/user/bulk");
                setUsers(response.data.user);
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        };

        fetchUsers();
    }, []);

    // Refresh balance after voice payment
    const handleVoicePaymentSuccess = (result) => {
        console.log('Voice payment successful:', result);
        
        // Refresh balance
        const fetchBalance = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setBalance(response.data.balance);
            } catch (err) {
                console.error("Error fetching balance:", err);
            }
        };
        fetchBalance();
        
        // Show success notification
        alert(`Payment successful! Sent $${result.amount}`);
    };

    return (
        // CHANGED: Professional light background with subtle accents
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
            {/* CHANGED: Customizable background elements - you can modify these */}
            {/* Circle 1 - Top Left */}
            <div className="absolute top-32 left-16 w-80 h-80 bg-gradient-to-br from-purple-400/8 to-pink-400/8 rounded-full blur-2xl animate-pulse"></div>
            {/* Circle 2 - Bottom Right */}
            <div className="absolute bottom-32 right-16 w-96 h-96 bg-gradient-to-br from-cyan-400/8 to-blue-400/8 rounded-full blur-2xl animate-pulse delay-1000"></div>
            {/* Circle 3 - Center (Optional) */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-indigo-400/6 to-purple-400/6 rounded-full blur-3xl"></div>
            
            <Appbar />
            
            {/* CHANGED: Modern layout with breathing room */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
                
                {/* CHANGED: Clean balance card with good contrast */}
                <div className="mb-8">
                    <div className="group relative">
                        {/* Subtle gradient border effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur-sm"></div>
                        <div className="relative bg-white rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
                            <Balance value={balance ? balance.toLocaleString() : "0"} />
                        </div>
                    </div>
                </div>
                
                {/* CHANGED: Clean voice payment toggle with better contrast */}
                <div className="mb-8">
                    <button 
                        onClick={() => setShowVoicePayment(!showVoicePayment)}
                        className={`group relative overflow-hidden px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] ${
                            showVoicePayment 
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25' 
                                : 'bg-white text-slate-700 border-2 border-slate-300 hover:border-purple-500 hover:text-purple-700 shadow-md hover:shadow-lg'
                        }`}
                    >
                        {/* Subtle shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        
                        <div className="relative flex items-center gap-3">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${showVoicePayment ? 'bg-white/20' : 'bg-slate-100'}`}>
                                <span className="text-lg">{showVoicePayment ? '🔇' : '🎤'}</span>
                            </div>
                            <span>{showVoicePayment ? 'Hide Voice Assistant' : 'Voice Assistant'}</span>
                            {/* Status indicator */}
                            <div className={`w-2 h-2 rounded-full ${showVoicePayment ? 'bg-green-300' : 'bg-slate-400'}`}></div>
                        </div>
                    </button>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* CHANGED: Light voice payment card */}
                    {showVoicePayment && (
                        <div className="xl:col-span-1">
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden h-fit">
                                {/* Clean header */}
                                <div className="bg-gradient-to-r from-purple-50 to-cyan-50 px-6 py-4 border-b border-slate-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <h3 className="text-lg font-semibold text-slate-900">Voice Assistant</h3>
                                    </div>
                                    <p className="text-sm text-slate-600 mt-1">AI-powered payment processing</p>
                                </div>
                                <div className="p-6">
                                    <VoicePayment 
                                        users={users}
                                        onPaymentSuccess={handleVoicePaymentSuccess}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* CHANGED: Clean users section with better readability */}
                    <div className={showVoicePayment ? "xl:col-span-2" : "xl:col-span-3"}>
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
                            {/* Modern header */}
                            <div className="relative px-6 py-5 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-50">
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-xl font-semibold text-slate-900 mb-1">Quick Transfer</h3>
                                        <p className="text-sm text-slate-600">Send money instantly to anyone</p>
                                    </div>
                                    {/* Live indicator */}
                                    <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full border border-green-200">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-xs text-green-700 font-medium">Live</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <Users />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}