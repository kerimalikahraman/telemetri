"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../lib/auth';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const success = await auth.login(username, password);
            if (success) {
                if (auth.isDefaultPassword()) {
                    router.push('/change-password');
                } else {
                    router.push('/');
                }
            }
        } catch (err) {
            setError(err.message || 'Bir hata oluştu. Lütfen bağlantınızı kontrol edin.');
        }
    };

    return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff' }}>
            <form onSubmit={handleLogin} style={{ padding: '2rem', border: '1px solid #333', borderRadius: '8px', width: '300px' }}>
                <h1 style={{ marginBottom: '1rem', textAlign: 'center' }}>Giriş Yap</h1>
                {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Kullanıcı Adı</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', background: '#222', border: 'none', color: '#fff' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Şifre</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', background: '#222', border: 'none', color: '#fff' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '0.75rem', background: '#0f0', color: '#000', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
                    GİRİŞ
                </button>
            </form>
        </div>
    );
}
