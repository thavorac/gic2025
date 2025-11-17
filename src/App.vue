<template>
  <div id="app">
    <ComponentA @updated="countUpdated" />
    <ComponentB :count="count" />
  </div>
</template>

<script>
import ComponentA from './components/ComponentA.vue'
import ComponentB from './components/ComponentB.vue'
export default {
  name: 'App',
  components: {
    ComponentA,
    ComponentB,
  },
  methods: {
    countUpdated(newCount) {
      console.log('Count updated to:', newCount)
      this.count = newCount
    },
  },
  data() {
    return {
      count: 0,
    }
  },
}
</script>
<style scoped>
#app {
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
}
</style>
