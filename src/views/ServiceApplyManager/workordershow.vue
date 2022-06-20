<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column
        :show-overflow-tooltip="true"
        prop="app_name"
        label="项目名称"
        style="width: 20%"
      ></el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="product"
        label="产品线"
        style="width: 20%"
      ></el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="type"
        label="项目类型"
        style="width: 20%"
      ></el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="dev_owner"
        label="负责人"
        style="width: 20%"
      ></el-table-column>
      <!-- <el-table-column
        :show-overflow-tooltip="true"
        prop="date"
        label="创建时间"
        style="width: 20%"
      ></el-table-column> -->
      <el-table-column
        :show-overflow-tooltip="true"
        label="操作"
        style="width: 20%"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">
            运维审阅
          </el-button>
          <!-- <el-button type="text" size="small">编辑</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { appFlow } from '@/api/podsList.js'
  export default {
    data() {
      return {
        tableData: [],
      }
    },
    mounted() {
      // console.log('我自己能打印出来吗')
      appFlow().then((result) => {
        this.tableData = result.data
      })
    },
    methods: {},
  }
</script>
