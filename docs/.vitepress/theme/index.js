import DefaultTheme from 'vitepress/theme'
import './styles/tokens.css'
import './styles/base.css'
import './styles/gate.css'
import './styles/home.css'
import HomePage from './components/HomePage.vue'
import PaperCard from './components/PaperCard.vue'
import SectionLabel from './components/SectionLabel.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册为全局组件，方便在任何 .md 里直接使用
    app.component('HomePage', HomePage)
    app.component('PaperCard', PaperCard)
    app.component('SectionLabel', SectionLabel)
  },
}
