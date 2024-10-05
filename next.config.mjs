/** @type {import('next').NextConfig} */

const HOST = process.env.API_HOST || 'http://localhost:3000';

const nextConfig = {
    env: {
        API_HOST: HOST,
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
                destination: `${HOST}/api/v1/:path*`,
            },
        ];
    },
};

export default nextConfig;
