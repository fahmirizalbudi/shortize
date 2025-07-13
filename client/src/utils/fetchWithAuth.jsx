import {Navigate} from "react-router-dom";

export async function fetchWithAuth(url, options = {}) {

    const token = localStorage.getItem("token");

    const res = await fetch(url, {
        ...options,
        headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${token}`
        }
    });

    if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/auth/login"
        return
    }

    return res;
}
