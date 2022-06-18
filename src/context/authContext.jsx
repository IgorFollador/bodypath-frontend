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
        const login_res = await api.post("/checkout/login", {
            email,
            password,
        });

        if(login_res.data.error) {
            alert(login_res.data.error);
        } else {
            setUser(login_res.data.user);
            api.defaults.headers.common['Authorization'] = `Bearer ${login_res.data.token}`;
            localStorage.setItem("@Auth:token", login_res.data.token);
            localStorage.setItem("@Auth:username", login_res.data.username);
            localStorage.setItem("@Auth:userId", login_res.data.userId);

            let config = {
                headers: {
                    Authorization: `Bearer ${login_res.data.token}`,
                }
              }
            const profile_res = await api.get(`/customer/users/${login_res.data.userId}`, config);
            const profile = profile_res.data.Profile.descr_profile;
            localStorage.setItem("@Auth:profile", profile);
            if(profile === "NUTRITIONIST" || profile === "PHYSICAL_EDUCATOR") {
                const profissional_res = await api.get(`/customer/professionals/user/${login_res.data.userId}`, config);
                localStorage.setItem("@Auth:professional_id", profissional_res.data.id);
            }
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