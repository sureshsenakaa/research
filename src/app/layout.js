import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Urbanscapes-LK | Spatial Intelligence Platform',
  description: 'Advanced urban planning and spatial intelligence platform for Sri Lanka',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </head>
      <body className={`${inter.className} min-h-screen bg-bg-primary text-text-primary`}>
        <div className="grid h-screen w-full grid-cols-[auto_1fr] overflow-hidden">
          <Sidebar />
          <div className="flex flex-col relative w-full h-full overflow-hidden">
            <Topbar />
            <main className="flex-1 relative overflow-hidden">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
