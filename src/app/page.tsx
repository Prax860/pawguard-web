import { PawPrint } from 'lucide-react';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
            <div className="max-w-md w-full p-8 bg-white dark:bg-dark-800 rounded-3xl shadow-xl flex flex-col items-center space-y-6">
                <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mb-2 shadow-lg shadow-primary-500/30">
                    <PawPrint className="w-10 h-10 text-white" />
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-dark-900 dark:text-white">
                    PawGuard Web
                </h1>

                <p className="text-dark-700 dark:text-slate-300 text-lg leading-relaxed">
                    Welcome to the web portal. To view a pet's profile, scan their QR code to open the
                    <span className="font-semibold text-primary-600 dark:text-primary-500 mx-1">PawGuard</span>
                    app or navigate to their unique URL.
                </p>
            </div>
        </main>
    );
}
