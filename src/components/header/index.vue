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
  background-color: #2f9afc;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23317cf6' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
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
