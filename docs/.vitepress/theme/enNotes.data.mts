import { createContentLoader } from 'vitepress'

interface Note {
  url: string
  title: string
  date: string
  timestamp: number
  section: 'life' | 'history'
}

declare const data: Note[]
export { data }

export default createContentLoader(['en/life/**/*.md', 'en/history/**/*.md'], {
  render: true,
  transform(raw): Note[] {
    return raw
      .filter(
        (page) =>
          Boolean(page.frontmatter.date) &&
          page.url !== '/en/life/' &&
          page.url !== '/en/history/'
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
          section: (page.url.includes('/history/')
            ? 'history'
            : 'life') as Note['section'],
        }
      })
      .sort((a, b) => b.timestamp - a.timestamp)
  },
})

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
