<template>
  <div class="container">
    <div class="link">
      <router-link to="/page_one">Page1</router-link>
      <router-link to="/page_two/from_page_3">Page2</router-link>
    </div>
    <h1 style="margin-top: 100px">Page 3</h1>
    <div>
      {{ $route.query.message }}
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'PageThree',
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
