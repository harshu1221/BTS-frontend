import { Heart } from "lucide-react";
import { useGlobalContext } from "../context/globalContext";

const Navbar = () => {
  const { isLoggedIn, logout } = useGlobalContext();

  const handleLogin = () => {
    // Add login navigation
    console.log("Navigate to login");
  };

  const handleRegister = () => {
    // Add register navigation
    console.log("Navigate to register");
  };

  return (
    <header className="py-5 bg-gradient-to-r from-rose-50 to-pink-50 border-b border-rose-200 shadow-sm">
      <div className="container mx-auto px-4 items-center">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold text-rose-800">
            <a href="/" className="flex items-center gap-2 hover:text-rose-600 transition-colors">
              <Heart size={28} fill="currentColor" />
              <span>Forever Vows</span>
            </a>
          </h1>
          
          <nav>
            <ul className="flex gap-25">
              <li>
                <a 
                  href="/" 
                  className="text-lg font-medium transition-colors text-rose-800 hover:text-rose-600"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="/planning-guide" 
                  className="text-lg font-medium transition-colors text-rose-800 hover:text-rose-600"
                >
                  Planning Guide
                </a>
              </li>
              <li>
                <a 
                  href="/blogs" 
                  className="text-lg font-medium transition-colors text-rose-800 hover:text-rose-600"
                >
                  Love Stories
                </a>
              </li>
              <li>
                <a 
                  href="/about" 
                  className="text-lg font-medium transition-colors text-rose-800 hover:text-rose-600"
                >
                  About
                </a>
              </li>
              {isLoggedIn && (
                <li>
                  <a 
                    href="/profile" 
                    className="text-lg font-medium transition-colors text-rose-800 hover:text-rose-600"
                  >
                    My Profile
                  </a>
                </li>
              )}
            </ul>
          </nav>
          
          <div className="flex gap-3">
            {isLoggedIn ? (
              <button
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 transition-all text-white px-6 py-2 rounded-full text-base font-medium shadow-md hover:shadow-lg"
                onClick={logout}
              >
                Logout
              </button>
            ) : (
              <>
                <a href="/login" className="bg-white border-2 border-rose-400 hover:bg-rose-50 transition-colors text-rose-600 px-6 py-2 rounded-full text-base font-medium">
                  Login
                </a>
                <a
                  href="/register"
                  className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 transition-all text-white px-6 py-2 rounded-full text-base font-medium shadow-md hover:shadow-lg"
                >
                  Get Started
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;