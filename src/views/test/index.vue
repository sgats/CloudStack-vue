<template>
  <div>
    {{ input }}
    <button click="click">点击一下</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        input: 'test',
        tablist: '',
      }
    },
    mounted() {
      // console.log('我自己能打印出来吗')
    },
    methods: {
      click() {
        console.log('没数据吗？')
      },
    },
  }
</script>
