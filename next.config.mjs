/** @type {import('next').NextConfig} */
const nextConfig = {
    // This fixes Firebase Admin issue
    webpack: (
        config,
    ) => {
        
        return config
    },
};

export default nextConfig;
