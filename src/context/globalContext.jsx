    import { createContext, useContext, useState, useEffect } from "react";

    const GlobalContext = createContext();

    const GlobalContextProvider = ({ children }) => {
        const [user, setUser] = useState(null);
        const [token, setToken] = useState(null);
        const [isLoggedIn, setIsLoggedIn] = useState(false);
        const [loading, setLoading] = useState(true); 

        useEffect(() => {
            const storedToken = localStorage.getItem("token");
            const storedUser = localStorage.getItem("user");

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser)); 
                setIsLoggedIn(true);
            }
            setLoading(false); 
        }, []); 

        const login = (userData, userToken) => {
            localStorage.setItem("token", userToken);
            localStorage.setItem("user", JSON.stringify(userData)); 
            setToken(userToken);
            setUser(userData);
            setIsLoggedIn(true);
        };

        const logout = () => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setToken(null);
            setUser(null);
            setIsLoggedIn(false);
        };

        const value = {
            user,   
            token,
            isLoggedIn,
            loading,
            login,
            logout,
        };

        return (
            <GlobalContext.Provider value={value}>
                {!loading && children}
            </GlobalContext.Provider>
        );
    };

    export default GlobalContextProvider;

    export function useGlobalContext() {
        return useContext(GlobalContext);
    }