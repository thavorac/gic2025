<template>
  <div class="container">
    <img :src="image" />
    <h3>{{ title }}</h3>
    <span class="count">{{ productCount }} items</span>
  </div>
</template>

<script>
export default {
  name: 'CategoryComponent',
  props: {
    title: {
      type: String,
      required: true,
    },
    productCount: {
      type: Number,
      required: true,
    },
    image: {
      required: true,
    },
  },
}
</script>

<style scoped>
.container {
  border: 1px solid #81b13d;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background-color: #81b13d99;
}
.count {
  color: #818080;
  font-size: 12px;
}
</style>
