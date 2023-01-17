/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['@bladelabs/blade-web3.js', 'hashconnect']);

const nextConfig = {
  reactStrictMode: true,
};

const plugins = [withTM];

module.exports = plugins.reduce((acc, next) => {
  return next(acc);
}, nextConfig);