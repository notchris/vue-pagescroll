<template>
  <section :class="['page','page-'+page]">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'PageComponent',
  props: ['page']
}
</script>