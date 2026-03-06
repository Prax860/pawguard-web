export const APP_ROUTES = {
    PET_PROFILE: (petId: string) => `/pet/${petId}`,
};

export const DEEP_LINKS = {
    PET_PROFILE: (petId: string) => `pawguard://pet/${petId}`,
};
