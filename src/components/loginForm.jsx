import { useState } from "react";
import { useGlobalContext } from "../context/globalContext";
import { useNavigate } from "react-router-dom";
import api from "../config/api"; 
import { LogIn, AtSign, Lock } from "lucide-react";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const { login } = useGlobalContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {     
            const response = await api.post("/auth/login", {
                email,
                password,
            });
            if (response.data && response.data.token && response.data.user) {
                login(response.data.user, response.data.token);
                navigate("/profile");
            } else {
                throw new Error("Invalid login response from server.");
            }
        } catch (err) {
            const message = err.response?.data?.message || "Login failed. Please check your credentials.";
            setError(message);
            console.error("Login error:", err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-8 bg-white border border-gray-200 rounded-xl shadow-sm">
                <div>
                    <h2 className="text-3xl font-bold text-center text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        And start sharing your expertise!
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Email Input */}
                        <div className="relative">
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <AtSign className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Lock className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.targe.value)}
                            />
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="p-3 text-center text-sm text-red-700 bg-red-100 border border-red-200 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex items-center justify-center w-full py-3 px-6 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <LogIn className="w-5 h-5 mr-2 -ml-1" />
                            {submitting ? "Signing in..." : "Sign in"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;