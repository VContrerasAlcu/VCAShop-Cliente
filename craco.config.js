import browserifyZlib from 'browserify-zlib';
import querystringES3 from 'querystring-es3';
import pathBrowserify from 'path-browserify';
import cryptoBrowserify from 'crypto-browserify';

export const webpack = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        zlib: browserifyZlib,
        querystring: querystringES3,
        path: pathBrowserify,
        crypto: cryptoBrowserify,
      };
      return webpackConfig;
    },
  },
};