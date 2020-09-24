<template>
  <div id="app">
    <HeaderComponent />
    <MainComponent>
      <Search />
    </MainComponent>
  </div>
</template>

<script>
import HeaderComponent from "./components/header";
import MainComponent from "./components/main";
import Search from "./components/search";

export default {
  name: "App",
  components: {
    HeaderComponent,
    MainComponent,
    Search
  }
};
</script>

<style lang="stylus">
body
  background-color #fff
  margin 0
  font-size 14px
  color #2c3e50

#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center

  position relative
  display flex
  flex-flow column nowrap
  margin 0 auto
  max-width 1200px
  height 100vh
  background-color #fff
  border-radius 25px 25px 0 0
</style>
