'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { DEEP_LINKS } from '@/config/constants';
import { PetCard, PetProfile } from '@/components/PetCard';
import { Loader2, AlertCircle } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function PetProfilePage() {
    const params = useParams();
    const petId = params.petId as string;
    const [pet, setPet] = useState<PetProfile | null>(null);
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
                    .from('pets')
                    .select('id, name, species, breed, image, on_chain_status, tx_hash, age, status, temperament, sex, color, weight, description, health_status, is_vaccinated, is_neutered, is_house_trained, dietary_needs, energy_level, special_needs, location, owner_name, owner_avatar')
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
                // Log full details so we can diagnose the real error
                console.error('Supabase error:', JSON.stringify(err, null, 2), err?.message, err?.code, err?.details);

                // Fallback to mock data when Supabase is unavailable
                setPet({
                    id: petId,
                    name: 'Buddy (Mock)',
                    species: 'Dog',
                    breed: 'Golden Retriever',
                    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=400',
                    on_chain_status: 'OWNED',
                    tx_hash: '0xabc123',
                    age: '3',
                });
                // NOTE: deep link not attempted for mock data — no real app target
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
            <main className="flex min-h-screen items-center justify-center p-4">
                <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 animate-spin text-blue-500" />
            </main>
        );
    }

    if (error || !pet) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
                <div className="max-w-sm w-full p-6 sm:p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-xl flex flex-col items-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <AlertCircle className="w-7 h-7 sm:w-8 sm:h-8 text-red-500" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">Pet Not Found</h2>
                    <p className="text-sm text-slate-500">{error || 'Unable to load pet profile.'}</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen flex flex-col items-center px-4 pt-8 pb-16 sm:px-6 sm:pt-12 sm:justify-center">
            <div className="w-full max-w-sm sm:max-w-md relative z-10">
                <PetCard pet={pet} onOpenApp={handleOpenApp} />
            </div>

            {/* Decorative blobs */}
            <div className="fixed top-0 left-0 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="fixed bottom-0 right-0 w-1/2 h-1/2 bg-green-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        </main>
    );
}
