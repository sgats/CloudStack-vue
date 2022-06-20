<template>
  <div>
    <el-descriptions class="margin-top" :column="2" :size="size" border>
      <el-descriptions-item label="服务名" :label-style="LS">
        {{ service_name }}
      </el-descriptions-item>
      <el-descriptions-item label="环境" :label-style="LS">
        {{ env }}
      </el-descriptions-item>
      <el-descriptions-item :label-style="LS">
        <template slot="label">代码地址</template>
        <el-input v-model="git_url" placeholder="git@git.zuche.com/zuche/......"></el-input>
      </el-descriptions-item>
      <el-descriptions-item :label-style="LS">
        <template slot="label">分支名称</template>
        <el-select v-model="form.region" placeholder="默认分支master">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item :label-style="LS">
        <template slot="label">MVN参数</template>
        <el-input v-model="form.name"></el-input>
      </el-descriptions-item>
      <el-descriptions-item :label-style="LS">
        <template slot="label">子项目</template>
        <el-input v-model="form.subproject" placeholder="没有可不填"></el-input>
      </el-descriptions-item>
      <el-descriptions-item :label-style="LS">
        <template slot="label">结论</template>
        <el-button>{{ last_value }}</el-button>
      </el-descriptions-item>
      <el-descriptions-item :label-style="LS">
        <template slot="label">Jenkins</template>
        742
      </el-descriptions-item>
      <el-descriptions-item :label-style="LS">
        <template slot="label">下载地址</template>
        <a href="#">点击下载包</a>
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions class="margin-top">
      <el-descriptions-item>
        <el-button type="primary" size="mini" @click="dialogVisible = true">
          开始打包
        </el-button>
      </el-descriptions-item>
    </el-descriptions>
    <!-- <el-button @click="click">点击构建</el-button> -->
  </div>
</template>

<script>
  export default {
    name: 'BuildPackageDialog',
    data() {
      return {
        dialogVisible: false,
        size: 'small',
        number: '',
        LS: {
          width: '100px',
          'text-align': 'center',
          'font-weight': 900,
        },
        form: {
          subproject: '',
          name: '',
          region: '',
          version: '',
          desc: '',
        },
        service_name: 'CarOrder',
        env: 'test',
        tablist: '',
        input: '',
        // 构建状态  开始
        build_status: [
          { value: '1', label: '构建成功' },
          { value: '2', label: '进行中' },
          { value: '3', label: '构建失败' },
        ],
        last_value: '',
        // 构建状态  结束
        options: [
          {
            value: '1',
            label: 'dev',
          },
          {
            value: '2',
            label: 'test',
          },
        ],
        git_url: '',
        value: '',
      }
    },
    computed: {
    },
    mounted() {
      this.last_value = this.build_status[0].label
    },
    methods: {
      // click() {
      //   console.log('我要开始了')
      //   for (var i = 0; i < this.build_status.length; i++) {
      //     // this.sleep(500)
      //     this.last_value = this.build_status[i].label
      //     console.log(this.build_status[i].label)
      //   }
      // },
    },
  }
</script>
<style>
  .el-input__inner {
    width: 300px !important;
  }
</style>
