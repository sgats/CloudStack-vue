<template>
  <div>
    <div id="searchpage" class="searchPage">
      <!-- 搜索功能开始 -->
      <div style="margin-top: 15px">
        <el-input
          v-model="input"
          placeholder="请选择要搜索的服务"
          class="input-with-select"
          @keyup.enter.native="queryData"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="queryData"
          ></el-button>
        </el-input>
      </div>
      <!-- 搜索功能结束 -->
      <!-- 数据信息开始 -->
      <br />
      <el-table
        v-loading="loading"
        height="550px"
        :data="tablist"
        stripe
        border
        element-loading-spinner="el-icon-loading"
      >
        <el-table-column
          :show-overflow-tooltip="true"
          prop="app_name"
          label="服务名"
        ></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="product"
          label="产品线"
        ></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="env"
          label="环境"
        ></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="replicas"
          label="运行容器数"
        ></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="spec"
          label="容器规格"
        ></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="app_type"
          label="服务类型"
        ></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="dev_owner"
          label="开发负责人"
        ></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          class="info_style"
          prop="info"
          label="详情"
        >
          <!-- <a href="#" target="" @click="click">详情</a> -->
          <template #default="{ row }">
            <router-link :to="'/detailPage/' + row.env + '/' + row.app_name">
              <a>详情</a>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 数据信息结束 -->
      <!-- 弹框开始 -->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="90%"
        hight="500px"
        :before-close="handleClose"
      >
        <!-- 子组件开始 -->
        <!-- 子组件结束 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            确 定
          </el-button>
        </span>
      </el-dialog>
      <!-- 弹框结束 -->
      <!-- 分页组件  开始 -->
      <!-- <paging></paging> -->
      <center>
        <div class="block">
          <el-pagination
            :page-sizes="pageSizes"
            :page-size="page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </center>
      <!-- 分页组件  结束 -->
    </div>
  </div>
</template>

<script>
  // import packagepush from '@/views/ContainerManagerPage/PackagePush/index'
  // import restartexpansion from '@/views/ContainerManagerPage/RestartExpansion/index'
  // import paging from '@/views/paging/index'
  import { servicelist as servicelist_api } from '@/api/servicelist.js'
  export default {
    name: 'SearchPage',
    // components: {
    //   packagepush,
    //   restartexpansion,
    //   // paging,
    // },
    props: {},
    data() {
      return {
        dialogVisible: false,
        loading: false,
        test: 'test',
        input: '', //搜索信息
        tablist: [], //列表数据
        total: 0, //总数据数
        pageSizes: [10, 20, 50], //选择每页显示多少数据
        page_size: 10, //默认一页显示多少数据
        page: 1, //当前是第几页
      }
    },
    mounted() {
      this.servicelist()
    },
    methods: {
      // 分页方法   开始
      handleSizeChange(val) {
        // console.log(`每页${val}条`)
        this.page_size = val
        this.page = 1
        this.servicelist()
      },
      handleCurrentChange(val) {
        // console.log(`当前页:${val}`)
        this.page = val
        // console.log('当前页:' + this.page)
        this.servicelist()
      },
      // 分页方法   结束
      // 对数据进行处理  开始

      queryData() {
        console.log('搜索开始')
        this.page = 1
        this.servicelist()
      },
      servicelist() {
        this.loading = true
        servicelist_api(this.input, this.page, this.page_size)
          .then((info) => {
            this.total = info.total
            // console.log('现在数据总共有：' + this.total)
            this.page_size = info.page_size
            // console.log('默认当前页' + this.page_size)
            this.tablist = info.data
            // console.log(this.tablist);
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            this.loading = false
          })
      },

      // 弹框里面的操作方法  开始

      handleClose(done) {
        this.$confirm('确认关闭？')
          .then((_) => {
            done()
          })
          .catch((_) => {})
      },
      // 弹框里面的操作方法  结束
    },
  }
</script>
<style>
  .searchPage {
    width: 95%;
    height: auto;
    /* border: 1px solid red; */
  }

  .info_style {
    color: blue;
  }
</style>
