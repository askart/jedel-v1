<template>
  <main class="main">
    <slot />
  </main>
</template>

<script>
export default {
  name: "MainComponent"
};
</script>

<style scoped lang="stylus">
.main
  display flex
  flex-flow column nowrap
  margin 0 auto 100px
  width calc(100% - 50px)
  min-height 700px
  @media screen and (max-width: 650px) {
    width calc(100% - 20px)
  }
</style>
