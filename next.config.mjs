/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
    serverActions: {
      allowedOrigins: ["https://agentic-4c036d38.vercel.app"],
      bodySizeLimit: "4mb"
    }
  }
};

export default nextConfig;
