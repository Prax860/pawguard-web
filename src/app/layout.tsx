import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'PawGuard Web',
    description: 'Public pet profiles and deep linking for the PawGuard app.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased min-h-screen bg-light-50 text-dark-900 dark:bg-dark-900 dark:text-light-50">
                {children}
            </body>
        </html>
    );
}
