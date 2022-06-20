<!--
 * @Author: yf.guo07 yf.guo07@zuche.com
 * @Date: 2022-06-08 16:04:07
 * @LastEditors: yf.guo07 yf.guo07@zuche.com
 * @LastEditTime: 2022-06-10 17:49:34
 * @FilePath: /zucheCloudStack-vue/src/views/ServiceApplyManager/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      label-width="100px"
      style="text-align: center"
    >
      <el-form-item label="产品线">
        <el-select v-model="form.product" placeholder="请选择产品线">
          <el-option label="ZUCHE" value="ZUCHE"></el-option>
          <el-option label="COMMON" value="COMMON"></el-option>
          <el-option label="INNET" value="INNET"></el-option>
          <el-option label="PLAT" value="PLAT"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分组">
        <el-select v-model="form.project" placeholder="请选择产品线">
          <el-option label="web" value="web"></el-option>
          <el-option label="api" value="api"></el-option>
          <el-option label="bms" value="bms"></el-option>
          <el-option label="bi" value="bi"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="项目名称">
        <el-input v-model="form.app_name"></el-input>
      </el-form-item>

      <el-form-item label="服务类型">
        <el-select v-model="form.app_type" placeholder="请选择活动区域">
          <el-option label="tomcat" value="tomcat"></el-option>
          <el-option label="springboot" value="springboot"></el-option>
          <el-option label="nodejs" value="nodejs"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="端口">
        <el-input v-model="form.port"></el-input>
      </el-form-item>

      <el-form-item label="项目重要等级">
        <el-select v-model="form.level" placeholder="请选择环境">
          <el-option label="涉及黄金流程业务" value="1"></el-option>
          <el-option label="租车产品线项目" value="2"></el-option>
          <el-option label="内部服务" value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="cpu资源">
        <el-select v-model="form.max_cpu" placeholder="请选cpu资源">
          <el-option label="1C" value="1C"></el-option>
          <el-option label="2C" value="2C"></el-option>
          <!-- <el-option label="3C" value="3C"></el-option> -->
        </el-select>
      </el-form-item>

      <el-form-item label="内存资源">
        <el-select v-model="form.max_mem" placeholder="请选mem资源">
          <el-option label="1G" value="1G"></el-option>
          <el-option label="2G" value="2G"></el-option>
          <el-option label="4G" value="4G"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="生产副本数">
        <el-input v-model="form.replicas"></el-input>
      </el-form-item>

      <el-form-item label="负者人">
        <el-input v-model="form.dev_owner"></el-input>
      </el-form-item>
      <br />

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>

        <!-- <el-button type="primary" @click="open">test创建</el-button> -->
        <!-- <el-button>取消</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { appSetinfo } from '@/api/podsList.js'
  import { appname } from '@/api/podsList.js'
  export default {
    name: 'Serviceapply',
    data() {
      return {
        form: {
          product: '',
          project: '',
          app_name: '',
          app_type: '',
          port: '8080',
          level: '',
          max_cpu: '',
          max_mem: '',
          replicas: 1,
          dev_owner: '',
          env: 'all',
        },
      }
    },
    // mounted() {

    // },
    methods: {
      onSubmit() {
        this.$confirm('是否创建新项目?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            appSetinfo(this.form).then((result) => {
              // console.log(result.code)

              this.$message({
                type: 'success',
                message: '已经提交!',
              })
              this.$router.push('/WorkOrderManagement/WorkOrderManagement')
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消',
            })
          })
      },

      open() {
        console.log(appnamelist)
        // const aname = appname().then((result) => {
        //   // return result.data
        //   console.log(result.data)
        // })
        // return aname
      },
    },
    computed: {
      appnamelist() {
        return appname().then((result) => {
          return result.data
        })
      },
    },
  }
</script>
<style type="text/css">
  .el-select {
    width: 800px;
  }
  .el-input {
    width: 800px;
  }
  .el-form-item {
    display: inline-block;
  }
</style>
