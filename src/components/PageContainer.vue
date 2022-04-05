<template>
    <main class="page-container">
        <slot></slot>
    </main>
</template>

<script>
import 'swiped-events/dist/swiped-events.min.js'
export default {
  name: 'PageContainer',
  data () {
    return {
      wheelEvent: null,
      touchEvent: null,
      canScroll: true,
      canTouch: true,
      lastYPosition: null
    }
  },
  metaInfo () {
    return {
      title: this.routeTitle
    }
  },
  mounted () {
    /** Check initial route */
    this.checkRoute(this.$route)

    /** Vue-router scroll behavior */
    this.$router.options.scrollBehavior = (to, from, savedPosition) => {
        if (savedPosition) {
            this.lastYPosition = savedPosition
            this.$el.scroll({top: savedPosition,  behavior: 'auto' })
        } else {
            this.checkRoute(to, true)
        }
    }

    /** Desktop Wheel Events */
    this.wheelEvent = document.querySelector('#app').addEventListener('wheel', (e) => {
      this.wheel(e)
    }, {passive: true})

    /** Mobile Touch Events */
    document.querySelector('#app').addEventListener('swiped', (e) => {
        this.touch(e)
    });

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
        this.lastYPosition = position
        this.$el.scroll({top: position,  behavior: smooth ? 'smooth' : 'auto' })
    },
    touch (event) {
        const routes = this.$router.options.routes
        const cindex = routes.findIndex(r => r.name === this.$route.name)

        if (event.detail.dir === 'down') {
            if (cindex === 0) {
                return;
            } else {
                let nameFix = routes[cindex - 1].name === 'home' ? '/' : routes[cindex - 1].name
                this.$router.push({ path: nameFix })
            }
        } else if (event.detail.dir === 'up') {
            if (routes[cindex + 1]) {
                let nameFix = routes[cindex + 1].name === 'home' ? '/' : routes[cindex + 1].name
                this.$router.push({ path: nameFix })
            } else {
                return;
            }
        }
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