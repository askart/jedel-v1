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
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');

body
  background-color darken(#fff, 2%)
  margin 0
  font-family 'Roboto', sans-serif
  font-size 14px
  font-weight 300
  color #2c3e50

a
  color #77815c

input
  font unset

.text-btn
  background none
  outline none
  border none
  margin 0
  padding 0
  cursor pointer
  color #77815c
  font-family 'Roboto', sans-serif
  font-weight 300
  font-size 16px
  text-decoration underline
  @media screen and (max-width: 650px) {
    font-size 14px
  }

#app
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center

  position relative
  display flex
  flex-flow column nowrap
  margin 0 auto
  max-width 1200px
  min-height 100vh
  height auto
  border-radius 25px 25px 0 0
</style>
