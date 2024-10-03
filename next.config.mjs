/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_HOST: process.env.API_HOST,
    },
    poweredByHeader: false,
    trailingSlash: false,
    skipTrailingSlashRedirect: true,
    images: {
        domains: ['via.placeholder.com', 'localhost'],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    async rewrites() {
        return [
            {
                source: "/api/v1/:path*",
                destination: `${process.env.API_HOST}/api/v1/:path*`,
            },
        ];
    },
};

export default nextConfig;
