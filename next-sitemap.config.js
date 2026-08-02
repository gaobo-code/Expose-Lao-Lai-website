// next-sitemap.js
module.exports = {
  siteUrl: 'https://llwsydgs.com',
  generateRobotsTxt: true,  // Generates robots.txt file (optional)
  sitemapSize: 500,  // Max number of URLs per sitemap file
  exclude: [
    '/comment',
    '/all',
    '/all/*',
    '/manifest.json',
    '/icon.png',
    '/icon0.svg',
    '/icon1.png',
    '/apple-icon.png',
  ],
  changefreq: 'weekly',  // Frequency of content change (options: 'always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never')
  priority: 0.8,  // Default priority for all URLs
  transform: async (config, path) => ({
    loc: path,
    changefreq: config.changefreq,
    priority: ['/', '/article/hengyuan'].includes(path) ? 1.0 : config.priority,
    lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
  }),
};

