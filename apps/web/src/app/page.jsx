// apps/web/src/app/page.jsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  const isDefault = cookieStore.get('isDefaultPassword');

  if (!token) {
    redirect('/login');
  }

  if (isDefault?.value === 'true') {
    redirect('/change-password');
  }

  // Docker ortamında doğru hostlar:
  const apiBase = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://api:8080";
  const orchBase = process.env.INTERNAL_ORCH_URL || process.env.NEXT_PUBLIC_ORCH_URL || "http://orchestrator:8090";

  const [apiHealth, orchestratorContainers] = await Promise.all([
    fetch(`${apiBase}/health`).then(r => r.json()).catch(() => null),
    fetch(`${orchBase}/containers`).then(r => r.json()).catch(() => [])
  ]);

  return (
    <main>
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Dashboard</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        <div style={{ padding: '1.5rem', background: '#111', borderRadius: '8px', border: '1px solid #333' }}>
          <h2 style={{ marginBottom: '1rem' }}>Sistem Durumu</h2>
          <p>
            API: <span style={{ color: apiHealth ? '#0f0' : '#f00' }}>{apiHealth ? 'Aktif' : 'Pasif'}</span>
          </p>
          <p>
            Aktif Konteyner: {Array.isArray(orchestratorContainers) ? orchestratorContainers.filter(c => c.status === 'running').length : 0}
          </p>
        </div>

        <div style={{ padding: '1.5rem', background: '#111', borderRadius: '8px', border: '1px solid #333' }}>
          <h2 style={{ marginBottom: '1rem' }}>Son İşlemler</h2>
          <p style={{ color: '#888' }}>Henüz işlem kaydı yok.</p>
        </div>
      </div>
    </main>
  );
}
