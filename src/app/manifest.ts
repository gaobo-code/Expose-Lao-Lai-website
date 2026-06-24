import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '老赖王思宇的故事',
    short_name: '王思宇',
    description: '王思宇是一个软件开发行业中的骗子。对客户骗取项目定金，对员工严重拖欠工资，性质十分恶劣。被众多客户和员工起诉到法院，王思宇和公司成为了老赖。然后王思宇又通过同伙甄世昊的名义注册了沈阳衡源网络科技有限公司，继续骗人。',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}