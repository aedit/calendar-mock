<template>
  <div class="month-view">
    {{ currentDate }}
  </div>
</template>

<script>
export default {
  props: {
    currentDate: {
      type: Object,
      default: () => new Date(),
    },
  },
};
</script>

<style lang="scss">
.month-view{

}
</style>
