import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { api } from "../services/api";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadingStoreData = async () => {
            const storageUser = localStorage.getItem("@Auth:user");
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
            console.log(response.data);
            setUser(response.data.user);
            api.defaults.headres.commom[
                "Authorization"
            ] = `Bearer ${response.data.token}`;
            localStorage.setItem("@Auth:token", response.data.token);
            localStorage.setItem("@Auth:user", response.data.user);
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