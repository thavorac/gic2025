<template>
  <div class="container">
    <img :src="image" />
    <h3>{{ name }}</h3>
    <span>{{ productCount }} Items</span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CategoryComponent',
  props: {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    productCount: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style scoped>
.container {
  width: 150px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 16px;
  text-align: center;
}
</style>
