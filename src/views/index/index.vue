<template>
  <div class="index-container">
    <!-- 搜索组件添加 -->
    <searchtable></searchtable>
  </div>
</template>
<script>
  import searchtable from '../searchPage/index' //搜索组件
  export default {
    name: 'Index',
    components: {
      searchtable, //搜索组件
    },
    data() {
      return {}
    },
  }
</script>
<style lang="scss" scoped>
  .index-container {
    color: black;
  }
</style>
