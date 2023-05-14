module.exports = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `http://localhost:3000/login/:path*`,
      },
    ]
  },
}