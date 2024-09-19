/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_HOST: process.env.API_HOST,
        S3_DOMAIN: process.env.S3_DOMAIN,
    },
    images: {
        domains: ['via.placeholder.com', process.env.S3_DOMAIN],
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
