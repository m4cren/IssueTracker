import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "lh3.googleusercontent.com",
         },
      ],
   },

   async headers() {
      return [
         {
            source: "/:path*",
            headers: [
               {
                  key: "referrer-policy",
                  value: "no-referrer",
               },
            ],
         },
      ];
   },
};

export default nextConfig;
