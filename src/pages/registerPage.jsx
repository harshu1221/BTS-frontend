import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useGlobalContext } from "../context/globalContext";
import { Heart, Mail, Lock, User, Sparkles, AlertCircle } from "lucide-react";
import api from "../config/api";

const RegisterPage = () => {
    const navigate = useNavigate();
    const { login } = useGlobalContext();
    
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        // Clear error when user starts typing
        if (error) setError("");
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError("");
        
        if(!user.username || !user.email || !user.password || !user.confirmPassword) {
            setError("Please fill in all fields");
            return;
        }

        if(user.password !== user.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if(user.password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await api.post("/auth/register", {
                username: user.username,
                email: user.email,
                password: user.password
            });
            
            const { success, message, token, user: userDetails } = response.data;

            alert(message);

            if(success && userDetails) {
                login(userDetails, token);
                navigate("/");
            }
        } catch(error) {
            console.log("Error: ", error);
            const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
            setError(errorMessage);
            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return(
        <main className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-rose-50 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <Heart className="absolute top-20 right-10 text-rose-400 w-20 h-20" fill="currentColor" />
                <Heart className="absolute bottom-32 left-20 text-pink-400 w-16 h-16" fill="currentColor" />
                <Sparkles className="absolute top-40 left-32 text-rose-300 w-12 h-12" />
                <Sparkles className="absolute bottom-20 right-32 text-pink-300 w-10 h-10" />
            </div>

            <section className="relative z-10 py-12 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-md mx-auto">
                        {/* Header Section */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full mb-4 border-2 border-rose-300">
                                <Sparkles className="w-8 h-8 text-rose-500" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-rose-900 mb-3">
                                Begin Your Journey
                            </h1>
                            <p className="text-gray-700 text-lg">
                                Join our community and start planning your dream wedding
                            </p>
                        </div>

                        {/* Register Form Card */}
                        <div className="bg-white border-2 border-rose-200 rounded-2xl shadow-xl p-8">
                            {/* Error Message */}
                            {error && (
                                <div className="mb-6 p-4 bg-rose-50 border-2 border-rose-300 text-rose-800 rounded-xl flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <span className="text-sm font-medium">{error}</span>
                                </div>
                            )}
                            
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                {/* Username Field */}
                                <div className="space-y-2">
                                    <label 
                                        htmlFor="username" 
                                        className="flex items-center gap-2 text-sm font-semibold text-gray-800"
                                    >
                                        <User className="w-4 h-4 text-rose-500" />
                                        Username
                                    </label>
                                    <input 
                                        type="text" 
                                        id="username" 
                                        name="username"
                                        value={user.username} 
                                        onChange={handleChange}
                                        placeholder="Choose a unique username"
                                        required
                                        className="border-2 border-rose-200 block w-full py-3 px-4 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-rose-400 transition-all bg-white placeholder-gray-400"
                                    />
                                </div>

                                {/* Email Field */}
                                <div className="space-y-2">
                                    <label 
                                        htmlFor="email" 
                                        className="flex items-center gap-2 text-sm font-semibold text-gray-800"
                                    >
                                        <Mail className="w-4 h-4 text-rose-500" />
                                        Email Address
                                    </label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email"
                                        value={user.email} 
                                        onChange={handleChange}
                                        placeholder="your.email@example.com"
                                        required
                                        className="border-2 border-rose-200 block w-full py-3 px-4 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-rose-400 transition-all bg-white placeholder-gray-400"
                                    />
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <label 
                                        htmlFor="password" 
                                        className="flex items-center gap-2 text-sm font-semibold text-gray-800"
                                    >
                                        <Lock className="w-4 h-4 text-rose-500" />
                                        Password
                                    </label>
                                    <input 
                                        type="password" 
                                        id="password" 
                                        name="password"
                                        value={user.password} 
                                        onChange={handleChange}
                                        placeholder="Create a secure password (min 6 characters)"
                                        required
                                        className="border-2 border-rose-200 block w-full py-3 px-4 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-rose-400 transition-all bg-white placeholder-gray-400"
                                    />
                                </div>

                                {/* Confirm Password Field */}
                                <div className="space-y-2">
                                    <label 
                                        htmlFor="confirmPassword" 
                                        className="flex items-center gap-2 text-sm font-semibold text-gray-800"
                                    >
                                        <Lock className="w-4 h-4 text-rose-500" />
                                        Confirm Password
                                    </label>
                                    <input 
                                        type="password" 
                                        id="confirmPassword" 
                                        name="confirmPassword"
                                        value={user.confirmPassword} 
                                        onChange={handleChange}
                                        placeholder="Re-enter your password"
                                        required
                                        className="border-2 border-rose-200 block w-full py-3 px-4 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-rose-400 transition-all bg-white placeholder-gray-400"
                                    />
                                </div>

                                {/* Password Requirements */}
                                <div className="bg-rose-50 border border-rose-200 rounded-lg p-3">
                                    <p className="text-xs text-gray-700 font-medium mb-1">
                                        Password must contain:
                                    </p>
                                    <ul className="text-xs text-gray-600 space-y-1">
                                        <li className="flex items-center gap-1">
                                            <span className={user.password.length >= 6 ? "text-green-600" : "text-gray-400"}>
                                                {user.password.length >= 6 ? "✓" : "○"}
                                            </span>
                                            At least 6 characters
                                        </li>
                                    </ul>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white py-4 px-6 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                            Creating Your Account...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-5 h-5" />
                                            Create Account
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t-2 border-rose-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-gray-500 font-medium">
                                        Already a member?
                                    </span>
                                </div>
                            </div>

                            {/* Login Link */}
                            <div className="text-center">
                                <p className="text-gray-600 mb-4">
                                    Welcome back! Log in to continue planning
                                </p>
                                <Link 
                                    to="/login"
                                    className="inline-flex items-center gap-2 bg-white border-2 border-rose-300 hover:bg-rose-50 text-rose-600 py-3 px-6 rounded-xl font-semibold transition-all"
                                >
                                    <Heart className="w-5 h-5" fill="currentColor" />
                                    Login Instead
                                </Link>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <p className="text-center text-gray-600 text-sm mt-6">
                            By creating an account, you agree to our Terms of Service and Privacy Policy
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default RegisterPage;