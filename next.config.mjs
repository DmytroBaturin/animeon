/** @type {import('next').NextConfig} */

const HOST = process.env.API_HOST || 'http://localhost:3000';

const nextConfig = {
    env: {
        API_HOST: HOST,
    },
    poweredByHeader: false,
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    trailingSlash: false,
    skipTrailingSlashRedirect: true,
    images: {
        domains: ['via.placeholder.com', 'animeon-static-bucket.s3.amazonaws.com', 'localhost'],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    async rewrites() {
        return [
            {
                source: "/api/v1/:path*",
                destination: `${HOST}/:path*`,
            },
        ];
    },
};

export default nextConfig;
