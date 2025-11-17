<template>
  <div class="container">
    <h2>Component A</h2>
    <h3>Count: {{ countStore.count }}</h3>
    <button @click="increase">Increase</button>
  </div>
</template>
<script>
import { useCountStore } from '@/stores/count'
export default {
  name: 'ComponentA',
  setup() {
    const countStore = useCountStore()
    return { countStore }
  },
  props: {
    count: {
      type: Number,
      required: true,
    },
  },
  methods: {
    increase() {
      this.countStore.updateCount(this.countStore.count + 1)
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
