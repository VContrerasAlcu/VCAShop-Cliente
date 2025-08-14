import { resolve } from 'path';

export default function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    zlib: resolve('browserify-zlib'), // Polyfill para zlib
  };
  return config;
}