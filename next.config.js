module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      loader: "svg-inline-loader",
    });
    return config;
  },
  experimental: {
    forceSwcTransforms: true,
  },
};
