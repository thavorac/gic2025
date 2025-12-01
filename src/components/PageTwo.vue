<template>
  <div class="container">
    <div class="link">
      <router-link :to="{ name: 'PageOne' }">Page1</router-link>
      <router-link to="/page_three?message=hello_from_2">Page3</router-link>
    </div>
    <h1 style="margin-top: 100px">
      Page 2
      <div>
        {{ $route.params.message }}
      </div>
    </h1>
    <hr style="width: 300px" />
    <div class="section">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'PageTwo',
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
