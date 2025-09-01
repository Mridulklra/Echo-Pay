import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    // NEW: Design selector state
    const [designType, setDesignType] = useState('gradient');

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                setUsers(response.data.user)
            })
    }, [filter])

    return (
        <div>
            {/* Enhanced header with design selector */}
            <div className="flex items-center justify-between mb-6">
                <div className="font-bold text-xl text-slate-900">
                    Users
                </div>
                
                {/* NEW: Design Type Selector */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setDesignType('gradient')}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                            designType === 'gradient' 
                                ? 'bg-purple-500 text-white shadow-sm' 
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        Gradient Avatars
                    </button>
                    <button
                        onClick={() => setDesignType('icons')}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                            designType === 'icons' 
                                ? 'bg-purple-500 text-white shadow-sm' 
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        Icon Avatars
                    </button>
                    <button
                        onClick={() => setDesignType('cards')}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                            designType === 'cards' 
                                ? 'bg-purple-500 text-white shadow-sm' 
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        Colorful Cards
                    </button>
                    <button
                        onClick={() => setDesignType('minimal')}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                            designType === 'minimal' 
                                ? 'bg-purple-500 text-white shadow-sm' 
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        Minimal List
                    </button>
                </div>
            </div>
            
            {/* Enhanced search input */}
            <div className="mb-6">
                <input 
                    onChange={(e) => setFilter(e.target.value)} 
                    type="text" 
                    placeholder="Search users..." 
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 outline-none"
                />
            </div>
            
            {/* Conditional rendering based on design type */}
            <div className={designType === 'cards' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
                {users.map(user => (
                    <User key={user._id} user={user} designType={designType} />
                ))}
            </div>
        </div>
    )
}

function User({user, designType}) {
    const navigate = useNavigate();
    
    // Icon options for icon design
    const icons = ['👨‍💼', '👩‍💻', '👨‍🎨', '👩‍🔬', '👨‍🚀', '👩‍⚕️', '👨‍🎓', '👩‍🏫'];
    const userIcon = icons[user.firstName.charCodeAt(0) % icons.length];
    
    // Color options for cards design
    const colors = [
        'from-blue-500 to-cyan-500',
        'from-purple-500 to-pink-500', 
        'from-green-500 to-emerald-500',
        'from-orange-500 to-red-500',
        'from-indigo-500 to-purple-500',
        'from-pink-500 to-rose-500'
    ];
    const userColor = colors[user.firstName.charCodeAt(0) % colors.length];

    // Gradient Avatars Design
    if (designType === 'gradient') {
        return (
            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-300 group">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-md">
                            {user.firstName[0].toUpperCase()}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900 text-lg">
                            {user.firstName} {user.lastName}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">Available for transfer</p>
                    </div>
                </div>
                <button
                    onClick={() => navigate("/send?id=" + user._id + "&name=" + user.firstName)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
                >
                    Send Money
                </button>
            </div>
        )
    }
    
    // Icon Avatars Design
    if (designType === 'icons') {
        return (
            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:shadow-md transition-all duration-200">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-2xl">
                        {userIcon}
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900">{user.firstName} {user.lastName}</h3>
                        <p className="text-sm text-slate-500">Ready to receive</p>
                    </div>
                </div>
                <button 
                    onClick={() => navigate("/send?id=" + user._id + "&name=" + user.firstName)}
                    className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
                >
                    Send Money
                </button>
            </div>
        )
    }
    
    // Colorful Cards Design
    if (designType === 'cards') {
        return (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className={`h-2 bg-gradient-to-r ${userColor}`}></div>
                <div className="p-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 bg-gradient-to-br ${userColor} rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                                {user.firstName[0].toUpperCase()}{user.lastName[0].toUpperCase()}
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900 text-sm">{user.firstName} {user.lastName}</h3>
                                <p className="text-xs text-slate-500">Active now</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => navigate("/send?id=" + user._id + "&name=" + user.firstName)}
                            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium group-hover:bg-slate-900 group-hover:text-white"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    
    // Minimal List Design
    if (designType === 'minimal') {
        return (
            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-slate-50 transition-all duration-200 border border-transparent hover:border-slate-200 group">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-semibold text-slate-700">
                            {user.firstName[0].toUpperCase()}
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white"></div>
                    </div>
                    <div>
                        <h3 className="font-medium text-slate-900">{user.firstName} {user.lastName}</h3>
                        <p className="text-sm text-slate-500">Last seen recently</p>
                    </div>
                </div>
                <button 
                    onClick={() => navigate("/send?id=" + user._id + "&name=" + user.firstName)}
                    className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-200 text-sm font-medium"
                >
                    Send Money
                </button>
            </div>
        )
    }
}