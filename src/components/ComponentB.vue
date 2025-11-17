<template>
  <div class="container">
    <h2>Component B</h2>
    <h3>Count: {{ count }}</h3>
    <button @click="decrease">Decrease</button>
  </div>
</template>
<script>
export default {
  name: 'ComponentB',
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    decrease() {
      this.count -= 1
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
