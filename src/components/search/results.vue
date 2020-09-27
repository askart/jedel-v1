<template>
  <div class="search__results" id="results">
    <div
      class="search__results__item"
      v-for="(item, index) in items"
      :key="index"
    >
      <div class="search__results__item__name">
        <span class="search__results__item__name__instock" v-if="item.units > 0"
          >В наличии</span
        >
        <span class="search__results__item__name__instock--not" v-else
          >Нет в наличии</span
        >
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
    <div v-if="count > 5" class="search__results__toggle">
      <button class="text-btn" @click="toggleResults">
        {{ showAll ? "Скрыть" : "Поcмотреть все результаты" }}
      </button>
    </div>
    <div v-if="noResults" class="search__results__empty">
      Нет результатов
    </div>
  </div>
</template>

<script>
import clinicIcon from "@/components/icons/clinic";
import mapMarkerIcon from "@/components/icons/map-marker";
import phoneIcon from "@/components/icons/phone";
import tengeIcon from "@/components/icons/tenge";
import plusCircleIcon from "@/components/icons/plus-circle";

export default {
  name: "SearchResults",
  props: {
    items: {
      type: Array,
      default: () => []
    },
    count: {
      type: Number,
      default: null
    },
    noResults: {
      type: Boolean,
      default: false
    },
    showAll: {
      type: Boolean,
      default: false
    }
  },
  components: {
    clinicIcon,
    mapMarkerIcon,
    phoneIcon,
    tengeIcon,
    plusCircleIcon
  },
  methods: {
    toggleResults() {
      this.$emit("toggle-show");
      this.$nextTick(() => {
        document.getElementById("results").scrollIntoView();
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.search__results
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
    width 100%
    background-color #fff
    box-shadow 0px 5px 10px 0px rgba(119, 129, 92,0.05)
    border 1px solid lighten(#77815c, 90%)
    border-radius 5px
    box-sizing border-box
    font-size 14px
    transition box-shadow .3s ease-in-out
    &:hover {
      box-shadow 0px 5px 10px 0px rgba(119, 129, 92,0.15)
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
      padding 20px 20px 15px
      font-size 12px
    }
    &:not(:first-child)
      margin-top 5px
    & .icon
      flex 0 0 auto
      width 20px
      height 20px
      padding 3px
      box-sizing border-box
      color #77815c
      border 1px solid #77815c
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
      display block
      margin-bottom 5px
      font-size 14px
      font-weight 500
      line-height 1.5
      @media screen and (max-width: 650px) {
        font-size 12px
      }
      &__instock
        position relative
        background-color lighten(#77815c, 80%)
        color #77815c
        border-radius 2px
        font-size 12px
        padding 3px 8px
        &:before
          position relative
          display inline-block
          content ""
          width 8px
          height 8px
          background-color #77815c
          border-radius 50%
          margin-right 5px
        &--not
          @extend .search__results__item__name__instock
          &:before
            background-color lighten(#77815c, 99%)
    &__price
      grid-area item-price
    &__comp_name
      grid-area item-comp_name
    &__phone
      grid-area item-phone
    &__point_address
      grid-area item-point_address
    &__location
      grid-area item-location
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
