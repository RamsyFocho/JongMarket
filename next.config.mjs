// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//   },
// }

// export default nextConfig
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Image optimization for faster loading
  images: {
    formats: ['image/avif', 'image/webp'], // Modern formats for better compression
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // Cache images for 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Add your image domains here
    domains: [
      'localhost',
      'your-domain.com',
      'cdn.your-domain.com',
      // Add other domains where you host images
    ],
    // Alternative: use remotePatterns for more control
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudfront.net',
      },
    ],
  },

  // Compression for smaller bundle sizes
  compress: true,

  // Enable SWC minification (faster than Terser)
  swcMinify: true,

  // Experimental features for better performance
  experimental: {
    // Modern bundling improvements
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
    
    // Optimize package imports
    optimizePackageImports: [
      'lucide-react',
      '@heroicons/react',
      'recharts',
      'framer-motion',
    ],

    // Enable partial prerendering for better performance
    ppr: false, // Set to true when stable

    // Optimize server components
    serverComponentsExternalPackages: [
      // Add packages that should run on server
    ],
  },

  // Bundle analyzer (enable when needed)
  // ...(process.env.ANALYZE === 'true' && {
  //   webpack: (config, { isServer }) => {
  //     if (!isServer) {
  //       config.resolve.fallback.fs = false;
  //       const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
  //       config.plugins.push(
  //         new BundleAnalyzerPlugin({
  //           analyzerMode: 'static',
  //           openAnalyzer: false,
  //         })
  //       );
  //     }
  //     return config;
  //   },
  // }),

  // Headers for better caching and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // Performance headers
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      // Cache images
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache static files
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Production optimizations only
    if (!dev) {
      // Optimize chunks
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              maxSize: 244000, // 244kb chunks
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              enforce: true,
            },
          },
        },
      };
    }

    // SVG handling
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  // Output configuration
  output: 'standalone', // For Docker deployment optimization

  // Power optimizations
  poweredByHeader: false, // Remove X-Powered-By header

  // Redirect configuration for better SEO
  async redirects() {
    return [
      // Add your redirects here if needed
    ];
  },

  // Rewrites for API optimization
  async rewrites() {
    return [
      // Add API rewrites here if needed
    ];
  },
}

export default nextConfig;