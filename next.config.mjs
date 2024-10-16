/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["img.pokemondb.net", "raw.githubusercontent.com"],
  },
};

export default nextConfig;
