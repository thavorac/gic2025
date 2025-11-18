<template>
  <h1>Product Categories</h1>
  <ul>
    <li v-for="category in productStore.categories" :key="category['id']">
      {{ category['name'] }}
    </li>
  </ul>
  <CategoryComponent />
</template>

<script lang="ts">
import CategoryComponent from './components/CategoryComponent.vue'
import { useProductStore } from './stores/product'
export default {
  name: 'App',
  setup() {
    const productStore = useProductStore()
    return {
      productStore,
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
