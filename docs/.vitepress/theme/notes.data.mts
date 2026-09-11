import { createContentLoader } from 'vitepress'

interface Note {
  /** 不含 base 的站内路径，如 /life/interests/山川.html */
  url: string
  title: string
  /** 已格式化为 2026.08.01 */
  date: string
  timestamp: number
  section: 'life' | 'history'
}

declare const data: Note[]
export { data }

export default createContentLoader(['life/**/*.md', 'history/**/*.md'], {
  render: true,
  transform(raw): Note[] {
    return raw
      .filter(
        (page) =>
          Boolean(page.frontmatter.date) &&
          page.url !== '/life/' &&
          page.url !== '/history/'
      )
      .map((page) => {
        const timestamp = new Date(page.frontmatter.date).getTime()
        return {
          url: page.url,
          title:
            page.frontmatter.title ||
            extractTitle(page.html) ||
            page.url.replace(/\.html$/, ''),
          date: formatDate(page.frontmatter.date),
          timestamp,
          section: (page.url.startsWith('/history/')
            ? 'history'
            : 'life') as Note['section'],
        }
      })
      .sort((a, b) => b.timestamp - a.timestamp)
  },
})

/**
 * 这个博客的文章没写 title frontmatter，标题取正文第一个 H1。
 */
function extractTitle(html?: string): string {
  if (!html) return ''
  const match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)
  if (!match) return ''
  return decodeEntities(
    match[1]
      .replace(/<a\b[^>]*class="header-anchor"[\s\S]*?<\/a>/gi, '')
      .replace(/<[^>]+>/g, '')
  ).trim()
}

function decodeEntities(input: string): string {
  return input
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
}

function formatDate(value: unknown): string {
  const date = new Date(value as string)
  if (Number.isNaN(date.getTime())) return ''
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}.${m}.${d}`
}
