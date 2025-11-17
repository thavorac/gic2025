<template>
  <div id="app">
    <ComponentA />
    <ComponentB />
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
}
</script>
<style scoped>
#app {
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
}
</style>
