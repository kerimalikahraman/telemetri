"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../lib/auth';

export default function ChangePasswordPage() {
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [msg, setMsg] = useState('');
    const router = useRouter();

    const handleChange = async (e) => {
        e.preventDefault();
        try {
            await auth.changePassword(oldPass, newPass);
            alert('Şifre değiştirildi. Lütfen yeni şifrenizle giriş yapın.');
            auth.logout();
        } catch (err) {
            setMsg(err.message);
        }
    };

    return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff' }}>
            <form onSubmit={handleChange} style={{ padding: '2rem', border: '1px solid #333', borderRadius: '8px', width: '350px' }}>
                <h1 style={{ marginBottom: '1rem', textAlign: 'center' }}>Şifre Değiştir</h1>
                {msg && <p style={{ color: 'red', marginBottom: '1rem' }}>{msg}</p>}
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Eski Şifre</label>
                    <input
                        type="password"
                        value={oldPass}
                        onChange={(e) => setOldPass(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', background: '#222', border: 'none', color: '#fff' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Yeni Şifre</label>
                    <input
                        type="password"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', background: '#222', border: 'none', color: '#fff' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '0.75rem', background: '#0f0', color: '#000', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
                    DEĞİŞTİR
                </button>
            </form>
        </div>
    );
}
