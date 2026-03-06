'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { DEEP_LINKS } from '@/config/constants';
import { PetCard } from '@/components/PetCard';
import { Loader2, AlertCircle } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function PetProfilePage() {
    const params = useParams();
    const petId = params.petId as string;
    const [pet, setPet] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPet() {
            if (!petId) return;

            try {
                // If Supabase is not configured, we'll throw an error and fall back to mock data
                const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
                const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

                if (!supabaseUrl || !supabaseAnonKey) {
                    throw new Error("Supabase is not configured.");
                }

                const { data, error } = await supabase
                    .from('pets') // Assuming the table is named 'pets'
                    .select('id, name, breed, photo_url, blockchain_verified')
                    .eq('id', petId)
                    .single();

                if (error) {
                    throw error;
                }

                setPet(data);

                // Attempt deep link open automatically if pet data is successfully loaded
                setTimeout(() => {
                    handleOpenApp();
                }, 500);

            } catch (err: any) {
                console.error('Error fetching pet:', err);

                // Fallback to mock data for development
                console.log('Falling back to mock pet data for development.');
                setPet({
                    id: petId,
                    name: 'Buddy (Mock)',
                    breed: 'Golden Retriever',
                    photo_url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=400',
                    blockchain_verified: true,
                });

                // Attempt deep link using mock data as well
                setTimeout(() => {
                    handleOpenApp();
                }, 500);
            } finally {
                setLoading(false);
            }
        }

        fetchPet();
    }, [petId]);

    const handleOpenApp = () => {
        window.location.href = DEEP_LINKS.PET_PROFILE(petId);
    };

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center p-6">
                <Loader2 className="w-12 h-12 animate-spin text-primary-500" />
            </main>
        );
    }

    if (error || !pet) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
                <div className="max-w-md w-full p-8 bg-white dark:bg-dark-800 rounded-3xl shadow-xl flex flex-col items-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-xl font-bold text-dark-900 dark:text-white mb-2">Pet Not Found</h2>
                    <p className="text-slate-500">{error || 'Unable to load pet profile.'}</p>
                </div>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6">
            <div className="w-full max-w-sm relative z-10 animate-fade-in-up">
                <PetCard pet={pet} onOpenApp={handleOpenApp} />
            </div>

            {/* Decorative background elements for premium feel */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-success-500/10 rounded-full blur-3xl pointer-events-none" />
        </main>
    );
}
