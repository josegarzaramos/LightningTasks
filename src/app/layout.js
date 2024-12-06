import './globals.css';

export const metadata = {
  title: 'LightningTasks',
  description:
    'Fast and intuitive task management app designed to help you stay organized and productive',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-hidden">{children}</body>
    </html>
  );
}
