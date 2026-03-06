'use client';

import { useState } from 'react';
import {
    ShieldCheck,
    PawPrint,
    ChevronDown,
    ChevronUp,
    Syringe,
    Home,
    Scissors,
    Zap,
    Heart,
    Leaf,
    Scale,
    Star,
    Smartphone,
    MapPin,
} from 'lucide-react';
import Image from 'next/image';

export interface PetProfile {
    id: string;
    name: string;
    species: string;
    breed?: string | null;
    image?: string | null;
    on_chain_status?: string | null;
    tx_hash?: string | null;
    status?: string | null;
    age?: string | null;
    temperament?: string | null;
    sex?: string | null;
    color?: string | null;
    weight?: number | null;
    description?: string | null;
    health_status?: string | null;
    is_vaccinated?: boolean | null;
    is_neutered?: boolean | null;
    is_house_trained?: boolean | null;
    dietary_needs?: string | null;
    energy_level?: string | null;
    special_needs?: string[] | null;
    location?: string | null;
    owner_name?: string | null;
    owner_avatar?: string | null;
}

interface PetCardProps {
    pet: PetProfile;
    onOpenApp: () => void;
}

const STATUS_COLORS: Record<string, string> = {
    available: 'bg-green-100 text-green-700 border-green-200',
    adopted: 'bg-purple-100 text-purple-700 border-purple-200',
    pending: 'bg-orange-100 text-orange-700 border-orange-200',
    unavailable: 'bg-red-100 text-red-700 border-red-200',
};

function StatusPill({ status }: { status: string }) {
    const cls = STATUS_COLORS[status] ?? 'bg-slate-100 text-slate-700 border-slate-200';
    return (
        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${cls}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
}

function TraitBadge({ label }: { label: string }) {
    return (
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
            {label}
        </span>
    );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-start gap-3 py-3 border-b border-slate-100 dark:border-slate-700 last:border-0">
            <span className="mt-0.5 text-slate-400 flex-shrink-0">{icon}</span>
            <span className="text-sm text-slate-500 w-28 flex-shrink-0 pt-0.5">{label}</span>
            <span className="text-sm font-semibold text-slate-800 dark:text-white flex-1 break-words">{value}</span>
        </div>
    );
}

export function PetCard({ pet, onOpenApp }: PetCardProps) {
    const [expanded, setExpanded] = useState(false);
    const isBlockchainVerified = !!pet.on_chain_status || !!pet.tx_hash;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl w-full border border-slate-100 dark:border-slate-700">

            {/* Hero Image — taller on larger screens */}
            <div className="relative h-56 sm:h-72 md:h-80 w-full bg-slate-200 dark:bg-slate-700">
                {pet.image ? (
                    <Image
                        src={pet.image}
                        alt={`${pet.name}'s photo`}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 600px, 480px"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                        <PawPrint className="w-20 h-20" />
                    </div>
                )}

                {pet.status && (
                    <div className="absolute top-3 right-3">
                        <StatusPill status={pet.status} />
                    </div>
                )}
            </div>

            {/* Core Info */}
            <div className="px-5 sm:px-8 pt-6 pb-3 text-center">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    {pet.name}
                </h2>
                <p className="text-sm sm:text-base text-slate-500 font-medium mt-1">
                    {[pet.breed, pet.species].filter(Boolean).join(' · ')}
                </p>
                {pet.age && (
                    <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{pet.age} years old</p>
                )}

                {/* Location */}
                {pet.location && (
                    <div className="flex items-center justify-center gap-1 mt-2 text-slate-400 text-xs">
                        <MapPin className="w-3 h-3" />
                        <span>{pet.location}</span>
                    </div>
                )}

                {/* Blockchain badge */}
                {isBlockchainVerified && (
                    <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-1.5 rounded-full border border-green-100 mt-4 text-xs font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Blockchain Verified
                    </div>
                )}

                {/* Quick trait badges */}
                {(pet.is_vaccinated || pet.is_neutered || pet.is_house_trained) && (
                    <div className="flex flex-wrap gap-2 justify-center mt-4">
                        {pet.is_vaccinated && <TraitBadge label="💉 Vaccinated" />}
                        {pet.is_neutered && <TraitBadge label="✂️ Neutered" />}
                        {pet.is_house_trained && <TraitBadge label="🏠 House Trained" />}
                    </div>
                )}
            </div>

            {/* Expandable Detail Panel */}
            <div
                style={{
                    maxHeight: expanded ? '1200px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                <div className="px-5 sm:px-8 pt-2 pb-4 space-y-4">

                    {/* Description */}
                    {pet.description && (
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed text-center italic px-2">
                            "{pet.description}"
                        </p>
                    )}

                    {/* Info rows */}
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl px-4 py-1">
                        {pet.sex && <InfoRow icon={<Star className="w-4 h-4" />} label="Sex" value={pet.sex} />}
                        {pet.color && <InfoRow icon={<PawPrint className="w-4 h-4" />} label="Color" value={pet.color} />}
                        {pet.weight != null && <InfoRow icon={<Scale className="w-4 h-4" />} label="Weight" value={`${pet.weight} kg`} />}
                        {pet.temperament && <InfoRow icon={<Heart className="w-4 h-4" />} label="Temperament" value={pet.temperament} />}
                        {pet.energy_level && <InfoRow icon={<Zap className="w-4 h-4" />} label="Energy Level" value={pet.energy_level} />}
                        {pet.health_status && <InfoRow icon={<Syringe className="w-4 h-4" />} label="Health" value={pet.health_status} />}
                        {pet.dietary_needs && <InfoRow icon={<Leaf className="w-4 h-4" />} label="Diet" value={pet.dietary_needs} />}
                        {pet.on_chain_status && <InfoRow icon={<ShieldCheck className="w-4 h-4" />} label="Chain Status" value={pet.on_chain_status} />}
                    </div>

                    {/* Special needs */}
                    {pet.special_needs && pet.special_needs.length > 0 && (
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Special Needs</p>
                            <div className="flex flex-wrap gap-2">
                                {pet.special_needs.map((need) => (
                                    <span key={need} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-100">
                                        {need}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Owner */}
                    {pet.owner_name && (
                        <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                            {pet.owner_avatar ? (
                                <Image
                                    src={pet.owner_avatar}
                                    alt={pet.owner_name}
                                    width={40}
                                    height={40}
                                    className="rounded-full object-cover flex-shrink-0"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm flex-shrink-0">
                                    {pet.owner_name.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <div>
                                <p className="text-xs text-slate-400">Owner</p>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">{pet.owner_name}</p>
                            </div>
                        </div>
                    )}

                    {/* Open in App (secondary) */}
                    <button
                        onClick={onOpenApp}
                        className="w-full flex items-center justify-center gap-2 border-2 border-blue-500 text-blue-600 dark:text-blue-400 font-bold py-3 px-6 rounded-2xl transition-all hover:bg-blue-50 dark:hover:bg-blue-900/20 active:scale-95 duration-200 text-sm sm:text-base"
                    >
                        <Smartphone className="w-4 h-4 flex-shrink-0" />
                        <span>Open in PawGuard App</span>
                    </button>
                </div>
            </div>

            {/* View More toggle */}
            <div className="px-5 sm:px-8 pb-6 pt-3">
                <button
                    onClick={() => setExpanded((v) => !v)}
                    className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold py-3.5 sm:py-4 px-6 rounded-2xl shadow-lg shadow-blue-500/25 transition-all active:scale-95 duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                    <span>{expanded ? 'Show Less' : 'View More'}</span>
                    {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );
}
