<template>
  <header>
    <nav class="nav">
        <div class="logo">
            <router-link title="Home" to="/">notcorp</router-link>
        </div>
        <div class="routes">
            <div
                v-for="(route, i) in routes"
                :key="'route_' + route.name"
            >
                <router-link :tabindex="i + 1" :to="route.name === 'home' ? '/' : route.name" :title="route.title" :data-text="route.title">{{route.title}}</router-link>
            </div>
        </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'NavComponent',
  computed: {
      routes () {
          return this.$router.options.routes
      }
  }
}
</script>