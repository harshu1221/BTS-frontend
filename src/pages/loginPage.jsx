import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useGlobalContext } from "../context/globalContext";
import { Heart, Mail, Lock, Sparkles } from "lucide-react";
import api from "../config/api";

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useGlobalContext();

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await api.post("/auth/login", credentials);
            
            const { success, message, token, user: userDetails } = response.data;

            alert(message);

            if (success && userDetails) {
                login(userDetails, token);
                navigate("/");
            }
        } catch (error) {
            console.log("Error: ", error);
            alert(error.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-rose-50 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <Heart className="absolute top-20 left-10 text-rose-400 w-20 h-20" fill="currentColor" />
                <Heart className="absolute bottom-32 right-20 text-pink-400 w-16 h-16" fill="currentColor" />
                <Sparkles className="absolute top-40 right-32 text-rose-300 w-12 h-12" />
                <Sparkles className="absolute bottom-20 left-32 text-pink-300 w-10 h-10" />
            </div>

            <section className="relative z-10 py-12 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-md mx-auto">
                        {/* Header Section */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full mb-4 border-2 border-rose-300">
                                <Heart className="w-8 h-8 text-rose-500" fill="currentColor" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-rose-900 mb-3">
                                Welcome Back!
                            </h1>
                            <p className="text-gray-700 text-lg">
                                Continue your wedding planning journey
                            </p>
                        </div>

                        {/* Login Form Card */}
                        <div className="bg-white border-2 border-rose-200 rounded-2xl shadow-xl p-8">
                            <form className="space-y-6" onSubmit={handleSubmit}>
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
                                        placeholder="your.email@example.com"
                                        value={credentials.email}
                                        onChange={handleChange}
                                        required
                                        className="border-2 border-rose-200 block w-full py-3 px-4 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-rose-400 transition-all bg-white placeholder-gray-400"
                                    />
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <label 
                                        htmlFor="pass" 
                                        className="flex items-center gap-2 text-sm font-semibold text-gray-800"
                                    >
                                        <Lock className="w-4 h-4 text-rose-500" />
                                        Password
                                    </label>
                                    <input 
                                        type="password"
                                        id="pass"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={credentials.password}
                                        onChange={handleChange}
                                        required
                                        className="border-2 border-rose-200 block w-full py-3 px-4 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-rose-400 transition-all bg-white placeholder-gray-400"
                                    />
                                </div>

                                {/* Forgot Password Link */}
                                <div className="text-right">
                                    <Link 
                                        to="/forgot-password" 
                                        className="text-sm text-rose-600 hover:text-rose-700 font-medium transition-colors"
                                    >
                                        Forgot password?
                                    </Link>
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
                                            Logging in...
                                        </>
                                    ) : (
                                        <>
                                            <Heart className="w-5 h-5" fill="currentColor" />
                                            Login
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
                                        New to Forever Vows?
                                    </span>
                                </div>
                            </div>

                            {/* Register Link */}
                            <div className="text-center">
                                <p className="text-gray-600 mb-4">
                                    Start planning your dream wedding today
                                </p>
                                <Link 
                                    to="/register"
                                    className="inline-flex items-center gap-2 bg-white border-2 border-rose-300 hover:bg-rose-50 text-rose-600 py-3 px-6 rounded-xl font-semibold transition-all"
                                >
                                    <Sparkles className="w-5 h-5" />
                                    Create Account
                                </Link>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <p className="text-center text-gray-600 text-sm mt-6">
                            By logging in, you agree to our Terms of Service and Privacy Policy
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default LoginPage;