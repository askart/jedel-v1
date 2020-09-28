<template>
  <div class="search">
    <form
      class="search__form"
      id="search__form"
      autocomplete="off"
      @submit="search"
    >
      <input
        v-model="searchStr"
        :disabled="loading"
        minlength="3"
        maxlength="100"
        type="text"
        class="search__form__input"
        placeholder="Введите название"
        autocomplete="off"
        autofocus
      />
      <input type="submit" hidden />
    </form>
    <SearchResults
      :items="items"
      :count="results.length"
      :no-results="noResults"
      :show-all="showAll"
      @toggle-show="showAll = !showAll"
    />
  </div>
</template>

<script>
import { get } from "@/api/pharmas";
import SearchResults from "@/components/search/results";

export default {
  name: "Search",
  components: {
    SearchResults
  },
  data() {
    return {
      searchStr: "",
      results: [],
      noResults: false,
      showAll: false,
      loading: false
    };
  },
  computed: {
    items() {
      return this.showAll ? this.results : this.results.slice(0, 5);
    }
  },
  methods: {
    search(event) {
      event.preventDefault();
      if (!this.searchStr || this.loading) return;
      this.loading = true;
      get(this.searchStr)
        .then(data => {
          this.results = data;
        })
        .catch(e => {
          this.results = [];
          throw e;
        })
        .finally(() => {
          this.noResults = !this.results.length;
          this.showAll = false;
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped lang="stylus">
.search
  display flex
  flex-flow column nowrap
  &__form
    width calc(100% - 50px)
    max-width 750px
    height 60px
    margin -30px auto 0
    padding 15px
    box-sizing border-box
    border-radius 8px
    background-color white
    box-shadow 0px 5px 10px 0px rgba(119, 129, 92,0.2)
    transition box-shadow .3s ease-in-out
    &:hover, &:focus {
      box-shadow 0px 5px 10px 0px rgba(119, 129, 92,0.35)
    }
    @media screen and (max-width: 650px) {
      height 40px
      padding 5px
      margin -20px auto 0
    }
    &__input
      outline none
      border none
      width 100%
      height 30px
      line-height 30px
      font-size 16px
      text-align center
      &::placeholder
        color lighten(#2c3e50, 70%)
      &[disabled]
        background-color transparent
      @media screen and (max-width: 650px) {
        font-size 14px
      }
</style>
