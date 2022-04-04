<template>
  <div id="app">
    <nav-component></nav-component>
    <page-container>
      <page-component page="home">
        <page-home/>
      </page-component>
      <page-component page="about">
        <page-about/>
      </page-component>
      <page-component page="contact">
        <page-contact/>
      </page-component>
    </page-container>
  </div>
</template>
<script>
import NavComponent from './components/NavComponent.vue'
import PageContainer from './components/PageContainer.vue'
import PageComponent from './components/PageComponent.vue'

import PageHome from './views/PageHome.vue'
import PageAbout from './views/PageAbout.vue'
import PageContact from './views/PageContact.vue'

export default {
  components: {  NavComponent, PageContainer, PageComponent, PageHome, PageAbout, PageContact }
}
</script>