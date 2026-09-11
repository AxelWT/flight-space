<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { data as zhNotes } from '../notes.data.mts'
import { data as enNotes } from '../enNotes.data.mts'
import PaperCard from './PaperCard.vue'

const props = defineProps<{ lang?: 'zh' | 'en' }>()

const { lang } = useData()
const isEn = computed(() =>
  props.lang ? props.lang === 'en' : lang.value.startsWith('en')
)

const RECENT_COUNT = 6

const notes = computed(() => {
  const source = isEn.value ? enNotes : zhNotes
  return source.slice(0, RECENT_COUNT)
})

const sectionLabel = (section: 'life' | 'history') =>
  isEn.value
    ? section === 'history'
      ? 'History'
      : 'Life'
    : section === 'history'
      ? '历史'
      : '生活'

const content = computed(() =>
  isEn.value
    ? {
        kicker: 'Flight Space',
        headline: 'Write casually. Live deliberately.',
        lede: 'A personal patch of the internet — photography, books, code, and the occasional random thought.',
        primary: { label: 'Enter Life', href: '/en/life/' },
        secondary: { label: 'Read History', href: '/en/history/' },
        recentLabel: 'Recent Notes',
        themesLabel: "What's Here",
        aboutLabel: 'Colophon',
        emptyLabel: 'Nothing published yet.',
        cards: [
          {
            kicker: 'Daily',
            title: 'Life Fragments',
            text: 'Photography, music, movies, dry jokes — the small things that keep a day interesting.',
            href: '/en/life/',
            linkLabel: 'Open',
          },
          {
            kicker: 'Books',
            title: 'Reading Notes',
            text: 'Finishing a book should leave something behind. Sometimes history, sometimes psychology.',
            href: '/en/history/',
            linkLabel: 'Open',
          },
          {
            kicker: 'Film',
            title: 'Movies & Music',
            text: 'I have rewatched every Stephen Chow film more than once. Music depends on the mood.',
            href: '/en/life/interests/stephen-chow.html',
            linkLabel: 'Open',
          },
          {
            kicker: 'Mountains',
            title: 'Mountains & Lenses',
            text: 'I have started taking photography seriously. Still a beginner, but a good frame can make a whole day.',
            href: '/en/life/interests/mountains.html',
            linkLabel: 'Open',
          },
        ],
        portrait: '/images/felix.jpg',
        name: 'Felix',
        bio: 'Someone who likes photography, code, and slow books. This is where the living gets written down.',
        aboutLink: { label: 'More about me', href: '/en/about.html' },
      }
    : {
        kicker: 'Flight Space',
        headline: '随便写写，认真生活',
        lede: '一个普通人的自留地 —— 拍拍照、看看书、写写代码、胡思乱想。',
        primary: { label: '进入生活', href: '/life/' },
        secondary: { label: '读点历史', href: '/history/' },
        recentLabel: '最近更新',
        themesLabel: '这里有什么',
        aboutLabel: '落款',
        emptyLabel: '还没有发布内容。',
        cards: [
          {
            kicker: 'Daily',
            title: '生活碎片',
            text: '摄影、音乐、电影、冷笑话 —— 日常里那些让我开心的小事，都在这里了。',
            href: '/life/',
            linkLabel: '去看看',
          },
          {
            kicker: 'Books',
            title: '读书笔记',
            text: '读完一本书，总得留下点什么。有历史的宏大，也有心理学的细腻。',
            href: '/history/',
            linkLabel: '去看看',
          },
          {
            kicker: 'Film',
            title: '电影与音乐',
            text: '周星驰的每部电影我都刷过好几遍。音乐嘛，不同心情听不同的歌。',
            href: '/life/interests/周星驰系列电影.html',
            linkLabel: '去看看',
          },
          {
            kicker: 'Mountains',
            title: '山川与镜头',
            text: '最近开始认真拍照了，技术还在入门阶段，但拍到喜欢的照片能开心一整天。',
            href: '/life/interests/山川.html',
            linkLabel: '去看看',
          },
        ],
        portrait: '/images/felix.jpg',
        name: 'Felix',
        bio: '一个喜欢拍照片、写代码、看闲书的人。这里是我认真生活的地方。',
        aboutLink: { label: '更多关于我', href: '/about.html' },
      }
)
</script>

<template>
  <div class="fs-home">
    <!-- 封面 -->
    <section class="fs-cover">
      <p class="fs-kicker">{{ content.kicker }}</p>
      <h1 class="fs-wordmark">{{ content.headline }}</h1>
      <p class="fs-lede">{{ content.lede }}</p>
      <div class="fs-actions">
        <a class="fs-btn fs-btn--solid" :href="withBase(content.primary.href)">
          {{ content.primary.label }}
        </a>
        <a class="fs-btn fs-btn--link" :href="withBase(content.secondary.href)">
          {{ content.secondary.label }}
          <span class="fs-arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </section>

    <!-- 最近更新 -->
    <section class="fs-section">
      <p class="fs-label">{{ content.recentLabel }}</p>
      <ul v-if="notes.length" class="fs-index">
        <li v-for="note in notes" :key="note.url">
          <a class="fs-row" :href="withBase(note.url)">
            <span class="fs-date">{{ note.date }}</span>
            <span class="fs-title">{{ note.title }}</span>
            <span class="fs-tag">{{ sectionLabel(note.section) }}</span>
          </a>
        </li>
      </ul>
      <p v-else class="fs-empty">{{ content.emptyLabel }}</p>
    </section>

    <!-- 主题 -->
    <section class="fs-section">
      <p class="fs-label">{{ content.themesLabel }}</p>
      <div class="fs-grid">
        <PaperCard
          v-for="card in content.cards"
          :key="card.title"
          :kicker="card.kicker"
          :title="card.title"
          :href="withBase(card.href)"
          :link-label="card.linkLabel"
        >
          {{ card.text }}
        </PaperCard>
      </div>
    </section>

    <!-- 落款 -->
    <section class="fs-section">
      <p class="fs-label">{{ content.aboutLabel }}</p>
      <div class="fs-colophon">
        <img class="fs-portrait" :src="withBase(content.portrait)" alt="Felix" />
        <div>
          <p class="fs-colophon-name">{{ content.name }}</p>
          <p class="fs-colophon-bio">{{ content.bio }}</p>
          <a class="fs-colophon-link" :href="withBase(content.aboutLink.href)">
            {{ content.aboutLink.label }}
            <span class="fs-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
