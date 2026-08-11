const rawUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const Config = {
    apiUrl: rawUrl.replace(/\/+$/, '')
};