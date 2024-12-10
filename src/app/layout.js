import { AuthProvider } from './context/AuthContext';
import './globals.css';

export const metadata = {
  title: 'LightningTasks',
  description:
    'Fast and intuitive task management app designed to help you stay organized and productive',
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className="overflow-hidden">{children}</body>
      </html>
    </AuthProvider>
  );
}
