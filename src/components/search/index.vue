<template>
  <div class="search">
    <form class="search__form" id="search__form" @submit="search">
      <input
        v-model="searchStr"
        minlength="3"
        maxlength="100"
        type="text"
        class="search__form__input"
        placeholder="Введите название"
        autofocus
      />
      <input type="submit" hidden />
    </form>
    <div class="search__results" id="results">
      <div
        class="search__results__item"
        v-for="(item, index) in items"
        :key="index"
      >
        <div class="search__results__item__name">
          <span>{{ item.name }}</span>
        </div>
        <div class="search__results__item__price">
          <tengeIcon class="icon" />
          <span>{{ item.price }} тг.</span>
        </div>
        <div class="search__results__item__comp_name">
          <plusCircleIcon class="icon" />
          <span>{{ item.comp_name }}</span>
        </div>
        <div class="search__results__item__phone" v-if="item.phone">
          <phoneIcon class="icon" />
          <a :href="`tel:${item.phone}`" target="__blank">{{ item.phone }}</a>
        </div>
        <div class="search__results__item__point_address">
          <clinicIcon class="icon" />
          <span>{{ item.point_address }}</span>
        </div>
        <div class="search__results__item__location">
          <mapMarkerIcon class="icon" />
          <a :href="item.location" target="__blank">Показать на карте</a>
        </div>
      </div>
      <div v-if="results.length > 5" class="search__results__toggle">
        <button class="text-btn" @click="toggleResults">
          {{ showAll ? "Скрыть" : "Поcмотреть все результаты" }}
        </button>
      </div>
      <div v-if="noResults" class="search__results__empty">
        Нет результатов
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "@/api/pharmas";
import clinicIcon from "@/components/icons/clinic";
import mapMarkerIcon from "@/components/icons/map-marker";
import phoneIcon from "@/components/icons/phone";
import tengeIcon from "@/components/icons/tenge";
import plusCircleIcon from "@/components/icons/plus-circle";

export default {
  name: "Search",
  components: {
    clinicIcon,
    mapMarkerIcon,
    phoneIcon,
    tengeIcon,
    plusCircleIcon
  },
  data() {
    return {
      searchStr: "",
      results: [],
      noResults: false,
      showAll: false
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
      console.log("asd");
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
        });
    },
    toggleResults() {
      this.showAll = !this.showAll;
      this.$nextTick(() => {
        document.getElementById("results").scrollIntoView();
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
      @media screen and (max-width: 650px) {
        font-size 14px
      }
  &__results
    margin 35px 0 100px
    text-align left
    @media screen and (max-width: 650px) {
      margin 15px 0 100px
    }
    &__item
      display grid
      grid-template-columns 200px auto
      grid-template-rows: auto
      grid-template-areas: "item-name item-name" "item-price item-point_address" "item-comp_name item-location" "item-phone ."
      padding 20px 25px
      margin 0 auto
      width calc(100% - 80px)
      box-shadow 0px 5px 10px 0px lighten(#2c3e50, 95%)
      border 1px solid lighten(#2c3e50, 90%)
      border-radius 10px
      font-size 14px
      transition box-shadow .3s ease-in-out
      &:hover {
        box-shadow 0px 5px 10px 0px lighten(#2c3e50, 88%)
      }
      @media screen and (max-width: 950px) {
        grid-template-columns 200px auto 120px
        grid-template-areas: "item-name item-name" "item-price item-point_address" "item-comp_name item-location" "item-phone ."
      }
      @media screen and (max-width: 850px) {
        grid-template-columns auto
        grid-template-areas: "item-name" "item-price" "item-comp_name" "item-phone" "item-point_address" "item-location"
      }
      @media screen and (max-width: 650px) {
        width calc(100% - 50px)
        padding 15px 20px
        font-size 12px
      }
      &:not(:first-child)
        margin-top 15px
      & .icon
        width 20px
        height 20px
        color lighten(#2c3e50, 70%)
        padding 3px
        box-sizing border-box
        border 1px solid lighten(#2c3e50, 70%)
        border-radius 50%
      & > *
        display flex
        flex-flow row nowrap
        align-items center
        &:not(:first-child)
          margin-top 10px
          @media screen and (max-width: 650px) {
            margin-top 5px
          }
        & > *:not(:first-child)
          margin-left 7px
      &__name
        grid-area item-name
        margin-bottom 10px
        font-size 16px
        font-weight 400
        @media screen and (max-width: 650px) {
          font-size 14px
        }
      &__price
        grid-area item-price
        & > .icon
          color #77815c
          border-color #77815c
      &__comp_name
        grid-area item-comp_name
        & > .icon
          color #77815c
          border-color #77815c
      &__phone
        grid-area item-phone
        & > .icon
          color #77815c
          border-color #77815c
      &__point_address
        grid-area item-point_address
        & > .icon
          color #77815c
          border-color #77815c
      &__location
        grid-area item-location
        & > .icon
          color #77815c
          border-color #77815c
    &__empty
      margin-top 25px
      text-align center
      font-size 16px
      color lighten(#2c3e50, 50%)
      @media screen and (max-width: 650px) {
        font-size 14px
      }
    &__toggle
      margin-top 25px
      text-align center
      font-size 16px
      @media screen and (max-width: 650px) {
        font-size 14px
      }
</style>
