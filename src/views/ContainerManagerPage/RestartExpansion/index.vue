<!--
 * @Author: yf.guo07 yf.guo07@zuche.com
 * @Date: 2022-06-07 19:25:46
 * @LastEditors: yf.guo07 yf.guo07@zuche.com
 * @LastEditTime: 2022-06-20 10:42:34
 * @FilePath: /zucheCloudStack-vue/src/views/ContainerManagerPage/RestartExpansion/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="container_main_page2">
    <h3>操作记录概览</h3>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="时间"></el-table-column>
      <el-table-column prop="message" label="操作内容"></el-table-column>
      <el-table-column prop="result" label="操作结果"></el-table-column>
    </el-table>
    {{app_name}}
    <!-- <button @click="open">test</button> -->
    <br />
  </div>
</template>

<script>
  import { logOperate } from '@/api/podsList.js'
  export default {
    name: 'Restartexpansion',
    props: {
      env: { type: String, required: true },
      app_name: { type: String, required: true },
    },
    data() {
      return {
        tableData: [],
      }
    },
    mounted() {
      logOperate(this.env, this.app_name).then((result) => {
        // console.log(this.env);
        this.tableData = result.data
      })
    },
    methods: {
      open() {
        console.log(this.env, this.app_name)
      },
    },
  }
</script>

<style>
  table {
    table-layout: fixed;
    word-break: break-all;
    overflow: hidden;
  }

  .el-table th.el-table__cell > .cell {
    font-weight: 900;
  }

  div {
    table-layout: fixed;
    word-wrap: break-word;
    overflow: hidden;
  }

  .container_main_page2 {
    width: 95%;
    height: 300px;
    /*visibility: hidden;*/
    /*overflow: hidden;*/
    /* border: 1px solid red; */
  }
</style>
