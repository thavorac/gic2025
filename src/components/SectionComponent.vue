<template>
  <div>This is section {{ sectionId }}</div>
</template>

<script lang="ts">
export default {
  name: 'SectionComponent',
  data() {
    return {
      sectionId: this.$route.params.sectionId,
    }
  },
}
</script>
