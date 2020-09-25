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
          <span>{{ item.name }}</span>
        </div>
        <div class="search__results__item__price">
          <tengeIcon class="icon"/>
          <span>{{ item.price }} тг.</span>
        </div>
        <div class="search__results__item__comp_name">
          <clinicIcon class="icon"/>
          <span>{{ item.comp_name }}</span>
        </div>
        <div class="search__results__item__phone" v-if="item.phone">
          <phoneIcon class="icon"/>
          <a :href="`tel:${item.phone}`" target="__blank">{{ item.phone }}</a>
        </div>
        <div class="search__results__item__point_address">
          <mapMarkerIcon class="icon"/>
          <span>{{ item.point_address }}</span>
        </div>
        <div class="search__results__item__location">
          <mapMarkerIcon class="icon"/>
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
import clinicIcon from "@/components/icons/clinic"
import mapMarkerIcon from "@/components/icons/map-marker"
import phoneIcon from "@/components/icons/phone"
import tengeIcon from "@/components/icons/tenge"

export default {
  name: "Search",
  components: {
    clinicIcon,
    mapMarkerIcon,
    phoneIcon,
    tengeIcon
  },
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
    @media screen and (max-width: 850px) {
      margin 15px 0 100px
    }
    &__item
      display grid
      grid-template-columns 200px auto auto 120px
      grid-template-rows: auto
      grid-template-areas: "item-name item-name item-name item-name" "item-price item-point_address item-point_address ." "item-comp_name item-location . ." "item-phone . . ."
      padding 20px 5px
      margin 0 50px
      font-size 14px
      @media screen and (max-width: 950px) {
        grid-template-columns 200px auto 120px
        grid-template-areas: "item-name item-name item-name" "item-price item-point_address item-point_address" "item-comp_name item-location ." "item-phone . ."
      }
      @media screen and (max-width: 850px) {
        grid-template-columns auto
        grid-template-areas: "item-name" "item-price" "item-comp_name" "item-phone" "item-point_address" "item-location"
        margin 0 10px
      }
      @media screen and (max-width: 650px) {
        padding 15px 5px
        font-size 12px
      }
      &:not(:first-child)
        border-top 1px solid lighten(#2c3e50, 95%)
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
        font-weight bold
        @media screen and (max-width: 650px) {
          font-size 14px
        }
      &__price
        grid-area item-price
        & > .icon
          color green
          border-color green
      &__comp_name
        grid-area item-comp_name
        & > .icon
          color green
          border-color green
      &__phone
        grid-area item-phone
        & > .icon
          color green
          border-color green
      &__point_address
        grid-area item-point_address
        & > .icon
          color #FFB92E
          border-color #FFB92E
      &__location
        grid-area item-location
        & > .icon
          color #FFB92E
          border-color #FFB92E
    &__empty
      margin-top 25px
      text-align center
      font-size 16px
      color lighten(#2c3e50, 50%)
      @media screen and (max-width: 650px) {
        font-size 14px
      }
</style>
