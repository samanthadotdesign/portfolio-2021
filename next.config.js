const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: false,
});

module.exports = withBundleAnalyzer({
  reactStrictMode: false,

  eslint: {
    ignoreDuringBuilds: true,
  },
});
