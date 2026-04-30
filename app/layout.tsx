import './globals.css';
import Header from '@/components/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="px-4 pb-10">{children}</main>
      </body>
    </html>
  );
}
