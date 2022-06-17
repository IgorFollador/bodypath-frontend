import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { api } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadingStoreData = async () => {
            const storageUser = localStorage.getItem("@Auth:userId");
            const storageToken = localStorage.getItem("@Auth:token");
    
            if (storageUser && storageToken) {
                setUser(storageUser);
            }
        }
        loadingStoreData();
    }, []);

    const signIn = async ({ email, password }) => {
        const response = await api.post("/checkout/login", {
            email,
            password,
        });

        if(response.data.error) {
            alert(response.data.error);
        } else {
            setUser(response.data.user);
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            localStorage.setItem("@Auth:token", response.data.token);
            localStorage.setItem("@Auth:username", response.data.username);
            localStorage.setItem("@Auth:userId", response.data.userId);
            window.location.href = "/professional/feed"
        }
    };

    return(
        <AuthContext.Provider value={{
            user,
            signed: !!user, 
            signIn
        }}>
            {children}
        </AuthContext.Provider>
    )
}