import {createContext, useEffect, useState} from "react";
import {BASE_URL} from "../constants/constant.js";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const run = async () => {
            await checkUser()
        };
        run()
    }, []);

    const checkUser = async () => {
        const token = localStorage.getItem("token")
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(BASE_URL + '/api/v1/auth/me', {
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
            });

            if (res.status === 401) {
                localStorage.removeItem('token');
                setUser(null);
                return;
            }

            if (!res.ok) throw new Error('Gagal ambil user');

            const data = await res.json();
            setUser(data.data);
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false);
        }
    };

    const login = async ({email, password}) => {
        const res = await fetch(BASE_URL + '/api/v1/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password}),
        });

        if (!res.ok) {
            throw new Error('Login gagal');
        }

        const data = await res.json();
        localStorage.setItem('token', data.data.token)
        await checkUser();
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, login, logout, loading, checkUser}}>
            {children}
        </AuthContext.Provider>
    );
}