/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.example.com",
        pathname: "/account123/**",
      },
      {
        protocol: "https",
        hostname: "optymize.io",
        pathname: "/files/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "blog.monitask.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "mobisoftinfotech.com",
        pathname: "/resources/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
