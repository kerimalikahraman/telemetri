export default function AdminPage() {
    return (
        <div style={{ width: '100%', height: 'calc(100vh - 4rem)', overflow: 'hidden' }}>
            <iframe
                src="http://localhost:3002"
                style={{ width: '100%', height: '100%', border: 'none' }}
                title="Admin"
            />
        </div>
    );
}
