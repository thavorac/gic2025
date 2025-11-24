<template>
  <div class="container">
    <div class="link">
      <router-link to="/page_two/hello_from_1">Page2</router-link>
      <router-link to="/page_three">Page3</router-link>
    </div>
    <h1 style="margin-top: 100px">Page 1</h1>
  </div>
</template>
<script lang="ts">
export default {
  name: 'PageOne',
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
