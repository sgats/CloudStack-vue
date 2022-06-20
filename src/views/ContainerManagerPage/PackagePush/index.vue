<template>
  <div class="container_main_page">
    <!-- 状态信息开始 -->
    <el-row>
      <el-col :span="16" style="margin: 13px 0 0 8px">
        <div>
          <el-descriptions size="medium" :column="4">
            <el-descriptions-item label="服务名">
              {{ service_name }}
            </el-descriptions-item>
            <el-descriptions-item label="环境">
              <el-dropdown>
                <span class="el-dropdown-link">
                  {{ env }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="env_item in details_env_info.data"
                    :key="env_item"
                  >
                    <router-link
                      :to="'/detailPage/' + env_item + '/' + app_name"
                    >
                      {{ env_item }}
                    </router-link>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-descriptions-item>
            <el-descriptions-item label="运行状况">
              <el-tag v-if="details_head_info.msg == '正常'" type="success">
                {{ details_head_info.msg }}
              </el-tag>
              <el-tag
                v-else-if="details_head_info.msg == '完全不可用'"
                type="danger"
              >
                {{ details_head_info.msg }}
              </el-tag>
              <el-tag
                v-else-if="details_head_info.msg == '部分不可用'"
                type="warning"
              >
                {{ details_head_info.msg }}
              </el-tag>
              <el-tag v-else-if="details_head_info.msg == '发布中'">
                {{ details_head_info.msg }}
              </el-tag>
              <el-tag v-else type="info">无实例</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="副本数">
              {{ details_head_info.data }}
              &#8197;
              <!-- 文字和图标增加些间距 -->
              <div class="top">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="当前正常的实例数 / 期望总共正常的实例数"
                  placement="top"
                >
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-col>
      <el-col :span="6" style="margin: 10px 0 0 0">
        <div style="display: inline-block; margin: 0 10px 0 0">
          <el-dropdown>
            <el-button class="el-dropdown-link" size="small">
              服务管理
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>重启</el-dropdown-item>
              <el-dropdown-item>扩容</el-dropdown-item>
              <el-dropdown-item>回滚</el-dropdown-item>
              <el-dropdown-item>基本信息</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div style="display: inline-block; margin: 0 0 6px 0">
          <el-button size="mini" @click="build_package">打包</el-button>
          <el-button size="mini" @click="push_package">发布</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 打包  弹框   开始 -->
    <hr />
    <el-dialog title="服务打包开始" :visible.sync="dialogVisible" width="60%">
      <BuildPackageDialog></BuildPackageDialog>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">
          开始打包
        </el-button>
      </span>
    </el-dialog>
    <!-- 打包  弹框   结束 -->
    <!-- 发布  弹框   开始 -->
    <el-dialog
      title="服务发布开始"
      :visible.sync="dialogVisiblePush"
      width="50%"
    >
      <PushPackageDialog></PushPackageDialog>
      <span slot="footer" class="dialog-footer" style="margin: 0 46% 0 0">
        <el-button type="primary" @click="dialogVisiblePush = false">
          开始发布
        </el-button>
      </span>
    </el-dialog>
    <!-- 发布  弹框   结束 -->
    <!-- 状态信息结束 -->
    <!-- 数据信息开始 -->
    <el-table :data="details_later_list" stripe max-height="280">
      <el-table-column
        :show-overflow-tooltip="true"
        prop="podname"
        label="实例名"
        width="250"
      ></el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="pod_ip"
        label="IP"
        width="120"
      ></el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="labels.version"
        label="运行版本"
      ></el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="create_at"
        label="创建时间"
      ></el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="running"
        label="Ready"
        width="70"
      ></el-table-column>

      <el-table-column
        :show-overflow-tooltip="true"
        label="状态"
        width="120"
        center
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 'Running'" type="success">
            {{ scope.row.status }}
          </el-tag>
          <el-tag v-else-if="scope.row.status == 'ContainerCreating'">
            {{ scope.row.status }}
          </el-tag>
          <el-tag v-else type="danger">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        :show-overflow-tooltip="true"
        prop="node_name"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="small"
            @click.native.prevent="deleteRow(scope.$index, details_later_list)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 数据信息结束 -->
  </div>
</template>

<script>
  import { podsList, get_replicas, get_env, del_pods } from '@/api/podsList.js'
  import BuildPackageDialog from './BuildPackageDialog'
  import PushPackageDialog from './PushPackageDialog'
  export default {
    name: 'Packagepush',
    components: {
      BuildPackageDialog,
      PushPackageDialog,
    },
    props: {
      env: { type: String, required: true, default: 'test1' },
      app_name: { type: String, required: true, default: 'nginx' },
    },
    data() {
      return {
        btnType: false,
        dialogVisible: false,
        dialogVisiblePush: false,
        spaninfo: '10110',
        details_later_list: [], // 处理之后的数据
        new_date: '', //对时间格式进行处理
        details_head_info: '', //详情页第一栏的数据
        details_env_info: '',
        namespace: '',
        podname: '',
      }
    },
    computed: {
      service_name() {
        return this.app_name
        // return "nginx"
      },
    },
    mounted() {
      podsList(this.env, this.service_name).then((res) => {
        this.details_later_list = res.data
        // console.log(this.details_later_list);
      })
      // 详情页最上面那一栏的接口处理
      get_replicas(this.env, this.service_name)
        .then((res) => {
          this.details_head_info = res
        })
        .catch(() => {
          console.log('err')
        })
      get_env(this.env, this.service_name)
        .then((res) => {
          this.details_env_info = res
        })
        .catch(() => {
          console.log('err')
        })
    },
    methods: {
      columnStyle({ rowIndex, columnIndex }) {
        if (rowIndex + 1 && columnIndex == 5) {
          console.log(rowIndex + '....')
          if (this.details_later_list[0].status == 'Running') {
            return 'background:	red;'
          }
        }
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then((_) => {
            done()
          })
          .catch((_) => {})
      },
      // 删除行方法
      deleteRow(index, rows) {
        this.podname = this.details_later_list[index].podname
        this.namespace = this.details_later_list[index].namespace
        this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            del_pods(this.namespace, this.podname)
            rows.splice(index, 1)
            this.$message.success('恭喜！项目删除成功！')
          })
          .catch(() => {
            this.$message.info('已取消删除')
          })
      },
      // 打包弹框处理  开始
      build_package() {
        console.log('打包开始！')
        this.dialogVisible = true
      },
      // 打包弹框处理  结束
      // 发布弹框处理  开始

      push_package() {
        console.log('发布开始！')
        this.dialogVisiblePush = true
      },
      // 发布弹框处理  结束
    },
  }
</script>
<style>
  table {
    table-layout: fixed;
    word-break: break-all;
    overflow: hidden;
  }

  div {
    table-layout: fixed;
    word-wrap: break-word;
    overflow: hidden;
  }

  .container_main_page {
    width: 95%;
    /*height: 45vh;*/
    /* border: 1px solid red; */
  }

  .info_style {
    color: blue;
  }

  /* 状态栏信息  开始 */
  .status_info_style div {
    font-size: larger;
    display: inline-block;
  }

  .button_info {
  }

  .el-descriptions-item__label {
    font-weight: bold;
  }

  /* 状态栏信息  结束 */
  .has-colon {
    display: none;
  }

  .el-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  /* 删除按钮 */
  .el-button--danger {
    background: #f4606c;
  }

  /* 下拉框样式 */
  .el-dropdown-link {
    cursor: pointer;
    color: #606266;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
