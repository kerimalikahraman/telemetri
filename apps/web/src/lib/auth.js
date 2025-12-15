import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const auth = {
    login: async (username, password) => {
        try {
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            if (!res.ok) {
                // Try to parse error message from body, fallback to status text
                try {
                    const errFn = await res.json();
                    throw new Error(errFn.title || "Giriş başarısız.");
                } catch (e) {
                    if (e.message && e.message !== "Giriş başarısız.") throw e;
                    throw new Error(`Giriş başarısız: ${res.statusText}`);
                }
            }
            const data = await res.json();
            Cookies.set('token', data.token);
            Cookies.set('isDefaultPassword', data.isDefaultPassword);
            return true;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    },

    logout: () => {
        Cookies.remove('token');
        Cookies.remove('isDefaultPassword');
        window.location.href = '/login';
    },

    getToken: () => Cookies.get('token'),

    isDefaultPassword: () => Cookies.get('isDefaultPassword') === 'true',

    changePassword: async (oldPassword, newPassword) => {
        const token = Cookies.get('token');
        const res = await fetch(`${API_URL}/api/auth/change-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ oldPassword, newPassword })
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || 'Failed to change password');
        }
        return true;
    }
};
