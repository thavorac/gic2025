<template>
  <div>This is section {{ sectionId }}</div>
</template>

<script lang="ts">
export default {
  name: 'SectionComponent',
  computed: {
    sectionId() {
      return this.$route.params.sectionId
    },
  },
}
</script>
