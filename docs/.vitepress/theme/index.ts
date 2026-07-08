import { onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import './custom.css'

// 继承默认主题 + 加载自定义 CSS。
// 在 setup() 里挂 scroll 监听，让页脚"向上滚动才显示"——
//   跟 ../Coding / ../book 同步。
//
// scroll 用 passive + rAF 节流，避免滚动卡顿。
// 路由切换时重新绑定（footer 节点会被替换）。

// --- 页脚 fade-in：scroll 监听 ---
// 用户向下滚动任意距离才显示页脚。
// 之前用 IntersectionObserver 在视口足够大时会被立即触发（首屏就显示），
// 改用 scroll 监听更精确：只有用户主动滚动过才浮现。
let rafId: number | null = null
let boundFooter: HTMLElement | null = null

function onScroll() {
  if (rafId !== null) return
  rafId = requestAnimationFrame(() => {
    rafId = null
    if (window.scrollY > 0 && boundFooter) {
      boundFooter.classList.add('is-visible')
    }
  })
}

function bind() {
  if (boundFooter) {
    boundFooter.classList.remove('is-visible')
  }
  boundFooter = document.querySelector<HTMLElement>('footer.VPFooter')
  if (!boundFooter) return
  window.addEventListener('scroll', onScroll, { passive: true })
}

function unbind() {
  window.removeEventListener('scroll', onScroll)
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
  boundFooter = null
}

export default {
  extends: DefaultTheme,
  setup() {
    const route = useRoute()

    // 暗色为默认：VitePress 会读 localStorage 里的 'vitepress-theme-appearance'。
    // 即便 config 写了 appearance: 'dark'，旧的亮色偏好也会盖过它，
    // 在 SSR 注入 HTML 时导致首屏白闪。同步把存储也写成 'dark'。
    // 注意：必须在客户端 JS 执行前完成，最早可在 setup() 里写。
    if (typeof localStorage !== 'undefined' && localStorage.getItem('vitepress-theme-appearance') !== 'dark') {
      localStorage.setItem('vitepress-theme-appearance', 'dark')
    }

    onMounted(() => {
      bind()
      watch(
        () => route.path,
        () => nextTick(bind)
      )
    })
    onBeforeUnmount(() => {
      unbind()
    })
  },
}
