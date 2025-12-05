/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Habilita exportación estática para FTP
  images: {
    unoptimized: true, // Necesario para exportación estática
  },
  trailingSlash: true, // Opcional: ayuda con algunos servidores
}

module.exports = nextConfig

