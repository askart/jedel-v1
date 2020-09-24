<template>
  <div class="search">
    <div class="search__form">
      <input
        v-model="searchStr"
        minlength="3"
        maxlength="100"
        type="text"
        class="search__form__input"
        placeholder="Введите название"
        autofocus
        @change="search"
      />
    </div>
    <div class="search__results">
      <div
        class="search__results__item"
        v-for="(item, index) in items"
        :key="index"
      >
        <div class="search__results__item__name">
          {{ item.name }}
        </div>
        <div class="search__results__item__price">
          Цена: {{ item.price }} тг.
        </div>
        <div class="search__results__item__comp_name">
          {{ item.comp_name }}
        </div>
        <div class="search__results__item__point_address">
          {{ item.point_address }}
        </div>
        <div class="search__results__item__location">
          <a :href="item.location" target="__blank">Показать на карте</a>
        </div>
      </div>
      <div v-show="noResults" class="search__results__empty">
        Нет результатов
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "@/api/pharmas";

export default {
  name: "Search",
  data() {
    return {
      searchStr: "",
      items: [],
      noResults: false
    };
  },
  methods: {
    search() {
      get(this.searchStr)
        .then(data => {
          this.items = data;
        })
        .catch(e => {
          this.items = [];
          throw e;
        })
        .finally(() => {
          this.noResults = !this.items.length;
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
    box-shadow 0px 5px 10px 0px rgba(207,240,253,1)
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
  &__results
    margin 35px 0 100px
    text-align left
    &__item
      padding 15px 0
      margin 0 50px
      font-size 14px
      &__name
        font-size 16px
        font-weight bold
    &__empty
      margin-top 25px
      text-align center
      font-size 16px
      color lighten(#2c3e50, 50%)
</style>
