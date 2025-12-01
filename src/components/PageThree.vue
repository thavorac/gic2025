<template>
  <div class="container">
    <div class="link">
      <router-link to="/page_one">Page1</router-link>
      <router-link to="/page_two">Page2</router-link>
    </div>
    <h1 style="margin-top: 100px">Page 3</h1>
    <hr style="width: 300px" />
    <div class="section">
      <router-view></router-view>
    </div>
    <div style="display: flex; gap: 5px">
      <button @click="goLeft">Click to go left</button>
      <button @click="goRight">Click to go right</button>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'PageThree',
  computed: {
    sectionId() {
      return Number(this.$route.params.sectionId)
    },
  },
  methods: {
    goLeft() {
      console.log('go left')
      this.$router.push({
        name: 'PageThree_Section',
        params: {
          sectionId: this.sectionId - 1,
        },
      })
    },
    goRight() {
      this.$router.push({
        name: 'PageThree_Section',
        params: {
          sectionId: this.sectionId + 1,
        },
      })
    },
  },
}
</script>

<style scoped>
.container {
  margin: 20px auto;
  width: 500px;
  height: 300px;
  border: 2px solid #42b983;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.link {
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: flex-end;
}
</style>
