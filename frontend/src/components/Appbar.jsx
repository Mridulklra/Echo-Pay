import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Appbar = () => {
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Get user info from localStorage or make API call
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");
        
        if (userData) {
            setUser(JSON.parse(userData));
        } else if (token) {
            // If no user data but token exists, fetch from API
            fetchUserData(token);
        }
    }, []);

    const fetchUserData = async (token) => {
        try {
            const response = await fetch("http://localhost:3000/api/v1/user/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const userData = await response.json();
                setUser(userData.user);
                localStorage.setItem("user", JSON.stringify(userData.user));
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/signin");
        setShowDropdown(false);
    };

    const handleProfileClick = () => {
        setShowDropdown(!showDropdown);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showDropdown && !event.target.closest('.profile-dropdown')) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showDropdown]);

    return (
        <div className="shadow-sm h-16 flex justify-between items-center px-6 bg-white border-b border-slate-200">
            {/* Left side - Logo/Brand */}
            <div className="flex items-center">
                <div className="text-xl font-bold text-slate-900">
                    ECHO<span className="text-purple-600">PAY</span> 
                </div>
            </div>

            {/* Right side - User section */}
            <div className="flex items-center gap-4">
                <div className="hidden sm:block text-slate-600">
                    Hello, <span className="font-medium text-slate-900">
                        {user ? user.firstName : 'User'}
                    </span>
                </div>
                
                {/* User Profile Dropdown */}
                <div className="relative profile-dropdown">
                    <button
                        onClick={handleProfileClick}
                        className="group flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-400 rounded-full hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                    >
                        <span className="text-white font-semibold text-lg">
                            {user ? user.firstName[0].toUpperCase() : 'U'}
                        </span>
                        {/* Online status dot */}
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </button>

                    {/* Dropdown Menu */}
                    {showDropdown && (
                        <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg border border-slate-200 z-50 overflow-hidden animate-in fade-in-0 zoom-in-95">
                            {/* User Info Header */}
                            <div className="bg-gradient-to-r from-purple-50 to-cyan-50 px-4 py-4 border-b border-slate-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-400 rounded-full flex items-center justify-center">
                                        <span className="text-white font-semibold text-lg">
                                            {user ? user.firstName[0].toUpperCase() : 'U'}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">
                                            {user ? `${user.firstName} ${user.lastName}` : 'User Name'}
                                        </p>
                                        <p className="text-sm text-slate-600">
                                            {user ? user.username : 'username@example.com'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="py-2">
                                <button 
                                    onClick={() => {
                                        navigate('/profile');
                                        setShowDropdown(false);
                                    }}
                                    className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-3"
                                >
                                    <span className="text-lg">👤</span>
                                    Profile Settings
                                </button>
                                
                                <button 
                                    onClick={() => {
                                        navigate('/dashboard');
                                        setShowDropdown(false);
                                    }}
                                    className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-3"
                                >
                                    <span className="text-lg">💰</span>
                                    Account Balance
                                </button>
                                
                                <button 
                                    onClick={() => {
                                        navigate('/transactions');
                                        setShowDropdown(false);
                                    }}
                                    className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-3"
                                >
                                    <span className="text-lg">📊</span>
                                    Transaction History
                                </button>
                                
                                <div className="border-t border-slate-200 my-2"></div>
                                
                                <button 
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3"
                                >
                                    <span className="text-lg">🚪</span>
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};