<script>
import CategoryComponent from './components/CategoryComponent.vue'
const burgerImage = new URL('@/assets/burger.png', import.meta.url).href
const peachImage = new URL('@/assets/peach.png', import.meta.url).href
const kiwiImage = new URL('@/assets/kiwi.png', import.meta.url).href
export default {
  name: 'App',
  data() {
    return {
      burgerImage,
      peachImage,
      kiwiImage,
    }
  },
  components: {
    CategoryComponent,
  },
}
</script>

<template>
  <div class="category-wrapper">
    <CategoryComponent title="Burget & Cake" :product-count="14" :image="burgerImage" />
    <CategoryComponent title="Peach" :product-count="13" :image="peachImage" />
    <CategoryComponent title="Organic Wiki" :product-count="15" :image="kiwiImage" />
  </div>
</template>

<style scoped>
.category-wrapper {
  display: flex;
  flex-direction: row;
  gap: 15px;
}
</style>
