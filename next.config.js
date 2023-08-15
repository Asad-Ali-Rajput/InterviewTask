/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['reqres.in'], // Add reqres.in to the domains array
  },
}

module.exports = nextConfig
