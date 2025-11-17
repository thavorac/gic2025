<template>
  <div class="container">
    <h2>Component A</h2>
    <h3>Count: {{ count }}</h3>
    <button @click="increase">Increase</button>
  </div>
</template>
<script>
export default {
  name: 'ComponentA',
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    increase() {
      this.count += 1
    },
  },
}
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  width: 200px;
  padding: 10px;
  border-radius: 10px;
}
</style>
