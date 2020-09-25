<template>
  <header class="header">
    <div class="hero" />
  </header>
</template>

<script>
export default {
  name: "HeaderComponent"
};
</script>

<style scoped lang="stylus">
.header
  margin 0

.hero
  background-color: #b5bd9f;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%2377815c' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
  margin 50px auto 0
  width calc(100% - 50px)
  height 200px
  box-sizing border-box
  border-radius 15px
  @media screen and (max-width: 650px) {
    height 150px
    width calc(100% - 20px)
  }
</style>
