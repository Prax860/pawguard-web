import { ShieldCheck, PawPrint } from 'lucide-react';
import Image from 'next/image';

interface PetProfile {
    id: string;
    name: string;
    breed: string;
    photo_url?: string;
    blockchain_verified: boolean;
}

interface PetCardProps {
    pet: PetProfile;
    onOpenApp: () => void;
}

export function PetCard({ pet, onOpenApp }: PetCardProps) {
    return (
        <div className="bg-white dark:bg-dark-800 rounded-3xl overflow-hidden shadow-2xl max-w-sm w-full mx-auto relative border border-slate-100 dark:border-dark-700">
            <div className="relative h-64 w-full bg-slate-200 dark:bg-dark-700">
                {pet.photo_url ? (
                    <Image
                        src={pet.photo_url}
                        alt={`${pet.name}'s photo`}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                        <PawPrint className="w-16 h-16 opacity-50" />
                    </div>
                )}
            </div>

            <div className="p-8 pb-10 flex flex-col items-center">
                <h2 className="text-3xl font-extrabold text-dark-900 dark:text-white mb-1">
                    {pet.name}
                </h2>
                <p className="text-lg text-slate-500 font-medium mb-6">{pet.breed || 'Unknown Breed'}</p>

                {pet.blockchain_verified && (
                    <div className="flex items-center space-x-2 bg-green-50 text-success-500 px-4 py-2 rounded-full mb-8 border border-green-100 shadow-sm">
                        <ShieldCheck className="w-5 h-5" />
                        <span className="font-semibold text-sm">Blockchain Verified</span>
                    </div>
                )}

                <button
                    onClick={onOpenApp}
                    className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-primary-500/30 transition-all active:scale-95 duration-200"
                >
                    Open in PawGuard App
                </button>
            </div>
        </div>
    );
}
