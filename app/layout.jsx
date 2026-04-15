import './globals.css';
import AuthProvider from '@/components/AuthProvider';

export const metadata = {
  title: 'MoodTunes – Music for Every Mood',
  description:
    'Discover the perfect music for how you feel right now. Tell us your mood and we\'ll build your soundtrack.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
