<template>
  <div class="container">
    <CategoryComponent
      v-for="category in productStore.categories"
      :key="category['id']"
      :name="category['name']"
      :product-count="category['productCount']"
      :image="'http://localhost:3000/' + category['image']"
    />
  </div>
</template>

<script lang="ts">
import CategoryComponent from './components/CategoryComponent.vue'
import { useProductStore } from './stores/product'
import peachImage from './assets/images/peach.png'
export default {
  name: 'App',
  setup() {
    const productStore = useProductStore()
    return {
      productStore,
    }
  },
  data() {
    return {
      peachImage,
    }
  },
  async mounted() {
    await this.productStore.fetchCategories()
  },
  components: {
    CategoryComponent,
  },
}
</script>

<style scoped>
.container {
  display: flex;
  gap: 20px;
}
</style>
