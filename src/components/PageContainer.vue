<template>
    <main class="page-container">
        <slot></slot>
    </main>
</template>

<script>
export default {
  name: 'PageContainer',
  data () {
    return {
      wheelEvent: null,
      canScroll: true
    }
  },
  metaInfo () {
    return {
      title: this.routeTitle
    }
  },
  mounted () {
    this.checkRoute(this.$route)
    this.$router.options.scrollBehavior = (to) => {
        this.checkRoute(to, true)
    }
    this.wheelEvent = document.querySelector('#app').addEventListener('wheel', (e) => {
      this.wheel(e)
    }, {passive: true})
  },
  computed: {
      routeTitle () {
          const filtered = this.$router.options.routes.filter((r) => r.name === this.$route.name)
          if (filtered.length) {
              return filtered[0]?.title || ''
          } else {
              return ''
          }
      }
  },
  methods: {
    checkRoute (to, smooth) {
        const routes = this.$router.options.routes
        const routeIndex = routes.findIndex(r => r.name === to.name)
        const position = routeIndex * window.innerHeight
        this.$el.scroll({top: position,  behavior: smooth ? 'smooth' : 'auto' })
    },
    wheel (event) {
      if (!this.canScroll) return
      const routes = this.$router.options.routes
      const dir = Math.sign(event.deltaY)
      const cindex = routes.findIndex(r => r.name === this.$route.name)
      if (dir === 1) {
        if (routes[cindex + 1]) {
          this.canScroll = false;
          document.querySelector('#app').removeEventListener('wheel', this.wheelEvent)
          let nameFix = routes[cindex + 1].name === 'home' ? '/' : routes[cindex + 1].name
          this.$router.push({ path: nameFix })
        } else {
          return;
        }
      } else if (dir === -1) {
        if (cindex === 0) {
          return;
        } else {
          this.canScroll = false;
          document.querySelector('#app').removeEventListener('wheel', this.wheelEvent)
          let nameFix = routes[cindex - 1].name === 'home' ? '/' : routes[cindex - 1].name
          this.$router.push({ path: nameFix })
        }
      }

      if (dir === -1 || dir === 1) {
          setTimeout(() => {
            this.wheelEvent = document.querySelector('#app').addEventListener('wheel', (e) => {
              this.wheel(e)
            }, {passive: true})
            this.canScroll = true
          }, 500)
      }

    }
  }
}
</script>