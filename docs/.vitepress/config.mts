import {defineConfig, createContentLoader} from 'vitepress'
import {writeFileSync} from 'node:fs'
import {resolve} from 'node:path'

export default defineConfig({
    lang: 'zh-CN',
    title: 'Flight Space',
    description: 'Felix的生活',
    base: '/flight-space/',
    head: [
        ['link', {rel: 'alternate', type: 'application/rss+xml', title: 'Flight Space RSS', href: '/flight-space/feed.xml'}],
    ],
    themeConfig: {
        nav: [
            {text: '首页', link: '/'},
            {text: '生活', link: '/life/'},
            {text: '历史', link: '/history/'},
            {text: '介绍', link: '/about'},
        ],
        sidebar: {
            '/life/': [
                {
                    text: '',
                    items: [
                        {text: '首页', link: '/life/'},
                        {text: '心得 2026', link: '/life/Insights-2026'},
                    ],
                },
                {
                    text: '沟通',
                    items: [
                        {text: '《好好说话》', link: '/life/dialogue/《好好说话》'},
                        {text: '《蛤蟆先生去看心理医生》', link: '/life/dialogue/《蛤蟆先生去看心理医生》'},
                        {text: '小菜一碟的心态是好是坏', link: '/life/dialogue/小菜一碟的心态是好是坏'},
                    ],
                },
                {
                    text: '笑话',
                    items: [
                        {text: '笑话首页', link: '/life/jokes/'},
                        {text: '冷笑话', link: '/life/jokes/冷笑话'},
                    ],
                },
                {
                    text: '电影',
                    items: [
                        {text: '经典电影', link: '/life/movies/经典电影'},
                    ],
                },
                {
                    text: '音乐',
                    items: [
                        {text: '听了让人开心的歌曲', link: '/life/music/听了让人开心的歌曲'},
                    ],
                },
            ],
            '/history/': [
                {
                    text: '历史故事',
                    items: [
                        {text: '首页', link: '/history/'},
                        {text: '《人类简史》', link: '/history/books/2026-05-11-人类简史从动物到上帝-Sapiens'},
                    ],
                },
                {
                    text: '人物传记',
                    items: [
                        {text: '理查德·费曼', link: '/history/figures/2026-05-11-理查德费曼-Richard-Feynman'},
                    ],
                },
            ],
        },
        socialLinks: [
            {icon: 'rss', link: '/flight-space/feed.xml'},
        ],
        footer: {
            message: 'Move fast and break things',
            copyright: 'Copyright © 2026. All Rights Reserved.',
        },
        search: {
            provider: 'local',
        },
    },
    async buildEnd(siteConfig) {
        const posts = await createContentLoader(['life/**/*.md', 'history/**/*.md'], {
            excerpt: true,
            render: true,
        }).load()

        const articles = posts
            .filter(p => p.frontmatter.date)
            .sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date))
            .slice(0, 20)

        const base = siteConfig.site.base.replace(/\/$/, '')
        const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Flight Space</title>
    <link>https://axelwt.github.io${base}/</link>
    <description>Felix的个人博客 — 生活、历史、故事、笑话、电影</description>
    <language>zh-CN</language>
    <atom:link href="https://axelwt.github.io${base}/feed.xml" rel="self" type="application/rss+xml"/>
${articles.map(p => `    <item>
      <title>${escapeXml(p.frontmatter.title ?? '')}</title>
      <link>https://axelwt.github.io${base}${p.url}</link>
      <pubDate>${new Date(p.frontmatter.date).toUTCString()}</pubDate>
      <description><![CDATA[${p.html ?? ''}]]></description>
    </item>`).join('\n')}
  </channel>
</rss>`

        writeFileSync(resolve(siteConfig.outDir, 'feed.xml'), rss)
    },
})

function escapeXml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
}
