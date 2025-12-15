import ClientLayout from '../components/ClientLayout';
import './globals.css';

export const metadata = {
  title: "KR_App",
  description: "KR_App frontend"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#000', color: '#fff' }}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
