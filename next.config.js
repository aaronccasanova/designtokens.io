/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    // Enables the styled-components SWC transform
    // TODO: Check back here for status updates on SWC/Styled Components support:
    // https://github.com/vercel/next.js/discussions/30174#discussion-3643870
    styledComponents: true,
  },
}
