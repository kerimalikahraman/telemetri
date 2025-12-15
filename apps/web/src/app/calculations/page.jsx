export default function CalculationsPage() {
    return (
        <div style={{ width: '100%', height: 'calc(100vh - 4rem)', overflow: 'hidden' }}>
            <iframe
                src="http://localhost:8501"
                style={{ width: '100%', height: '100%', border: 'none' }}
                title="Calculations"
            />
        </div>
    );
}
