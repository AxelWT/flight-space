import {defineConfig, createContentLoader} from 'vitepress'
import {writeFileSync} from 'node:fs'
import {resolve} from 'node:path'

export default defineConfig({
    base: '/flight-space/',
    head: [
        ['link', {rel: 'alternate', type: 'application/rss+xml', title: 'Flight Space (中文)', href: '/flight-space/feed.xml'}],
        ['link', {rel: 'alternate', type: 'application/rss+xml', title: 'Flight Space (English)', href: '/flight-space/en/feed.xml'}],
    ],
    locales: {
        root: {
            label: '中文',
            lang: 'zh-CN',
            title: 'Flight Space',
            description: 'Felix的生活',
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
                        {
                            text: '摄影',
                            items: [
                                {text: '我的作品 2026', link: '/life/lens/我的作品-2026'},
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
                footer: {
                    message: 'Move fast and break things',
                    copyright: 'Copyright © 2026. All Rights Reserved.',
                },
            },
        },
        en: {
            label: 'English',
            lang: 'en',
            title: 'Flight Space',
            description: "Felix's Space — Life, History, and Thoughts",
            link: '/en/',
            themeConfig: {
                nav: [
                    {text: 'Home', link: '/en/'},
                    {text: 'Life', link: '/en/life/'},
                    {text: 'History', link: '/en/history/'},
                    {text: 'About', link: '/en/about'},
                ],
                sidebar: {
                    '/en/life/': [
                        {
                            text: '',
                            items: [
                                {text: 'Home', link: '/en/life/'},
                                {text: 'Insights 2026', link: '/en/life/insights-2026'},
                            ],
                        },
                        {
                            text: 'Communication',
                            items: [
                                {text: 'Speaking Well', link: '/en/life/dialogue/speaking-well'},
                                {text: 'Counseling for Toad', link: '/en/life/dialogue/counseling-for-toad'},
                                {text: 'Piece of Cake Mentality', link: '/en/life/dialogue/piece-of-cake-mentality'},
                            ],
                        },
                        {
                            text: 'Jokes',
                            items: [
                                {text: 'Jokes Home', link: '/en/life/jokes/'},
                                {text: 'Dry Jokes', link: '/en/life/jokes/dry-jokes'},
                            ],
                        },
                        {
                            text: 'Movies',
                            items: [
                                {text: 'Classic Movies', link: '/en/life/movies/classic-movies'},
                            ],
                        },
                        {
                            text: 'Music',
                            items: [
                                {text: 'Happy Songs', link: '/en/life/music/happy-songs'},
                            ],
                        },
                        {
                            text: 'Photography',
                            items: [
                                {text: 'My Works 2026', link: '/en/life/lens/my-works-2026'},
                            ],
                        },
                    ],
                    '/en/history/': [
                        {
                            text: 'History',
                            items: [
                                {text: 'Home', link: '/en/history/'},
                                {text: 'Sapiens', link: '/en/history/books/sapiens'},
                            ],
                        },
                        {
                            text: 'Biography',
                            items: [
                                {text: 'Richard Feynman', link: '/en/history/figures/richard-feynman'},
                            ],
                        },
                    ],
                },
                footer: {
                    message: 'Move fast and break things',
                    copyright: 'Copyright © 2026. All Rights Reserved.',
                },
            },
        },
    },
    themeConfig: {
        socialLinks: [
            {icon: 'rss', link: '/flight-space/feed.xml'},
        ],
        search: {
            provider: 'local',
        },
    },
    async buildEnd(siteConfig) {
        const base = siteConfig.site.base.replace(/\/$/, '')

        // Chinese RSS
        const zhPosts = await createContentLoader(['life/**/*.md', 'history/**/*.md'], {
            excerpt: true,
            render: true,
        }).load()
        const zhArticles = zhPosts
            .filter(p => p.frontmatter.date)
            .sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date))
            .slice(0, 20)

        const zhRss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Flight Space</title>
    <link>https://axelwt.github.io${base}/</link>
    <description>Felix的个人博客 — 生活、历史、故事、笑话、电影</description>
    <language>zh-CN</language>
    <atom:link href="https://axelwt.github.io${base}/feed.xml" rel="self" type="application/rss+xml"/>
${zhArticles.map(p => `    <item>
      <title>${escapeXml(p.frontmatter.title ?? '')}</title>
      <link>https://axelwt.github.io${base}${p.url}</link>
      <pubDate>${new Date(p.frontmatter.date).toUTCString()}</pubDate>
      <description><![CDATA[${p.html ?? ''}]]></description>
    </item>`).join('\n')}
  </channel>
</rss>`
        writeFileSync(resolve(siteConfig.outDir, 'feed.xml'), zhRss)

        // English RSS
        const enPosts = await createContentLoader(['en/life/**/*.md', 'en/history/**/*.md'], {
            excerpt: true,
            render: true,
        }).load()
        const enArticles = enPosts
            .filter(p => p.frontmatter.date)
            .sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date))
            .slice(0, 20)

        const enRss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Flight Space (English)</title>
    <link>https://axelwt.github.io${base}/en/</link>
    <description>Felix's Blog — Life, History, Stories, Jokes, Movies</description>
    <language>en</language>
    <atom:link href="https://axelwt.github.io${base}/en/feed.xml" rel="self" type="application/rss+xml"/>
${enArticles.map(p => `    <item>
      <title>${escapeXml(p.frontmatter.title ?? '')}</title>
      <link>https://axelwt.github.io${base}${p.url}</link>
      <pubDate>${new Date(p.frontmatter.date).toUTCString()}</pubDate>
      <description><![CDATA[${p.html ?? ''}]]></description>
    </item>`).join('\n')}
  </channel>
</rss>`
        writeFileSync(resolve(siteConfig.outDir, 'en', 'feed.xml'), enRss)
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
