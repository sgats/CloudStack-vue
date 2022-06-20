<template>
  <div>
    <el-descriptions column="2" size="medium">
      <el-descriptions-item label="服务名">
        {{ service_name }}
      </el-descriptions-item>
      <el-descriptions-item label="环境">{{ env }}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions column="1" size="medium">
      <el-descriptions-item label="当前正在运行版本">
        {{ current_version }}
      </el-descriptions-item>
      <el-descriptions-item label="版本">{{ version }}</el-descriptions-item>
      <el-descriptions-item label="发布更新比例">
        {{ percent }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
  export default {
    name: 'BuildPackageDialog',
    data() {
      return {
        service_name: 'CarOrder',
        env: 'test',
        current_version: 'commit/Tag',
        version: 'test/Tag',
        percent: '30%',
      }
    },
    mounted() {},
    methods: {
      onSubmit() {
        console.log('submit!')
      },
    },
  }
</script>
<style>
  .el-input__inner {
    width: 320px;
  }
</style>
