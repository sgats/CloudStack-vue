<template>
  <center>
    <div class="block">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="50"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </center>
</template>

<script>
  export default {
    data() {
      return {
        currentPage: 5,
      }
    },
    mounted() {},
    methods: {
      handleSizeChange(val) {
        console.log(`每页${val}条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页:${val}`)
      },
    },
  }
</script>
<style></style>
