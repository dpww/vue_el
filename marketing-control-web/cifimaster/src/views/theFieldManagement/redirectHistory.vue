<template>
  <div class="app-container"
       v-loading="loading" element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.3)">
    <div class="container-header">
      <div class="fold-rule">

        <div class="grid-content bg-purple fold-rules">
          <el-button type="text" class="collapse-btn" @click="collapseHandler">{{activeNames === '0' ? '展开' : '隐藏'}}</el-button>
          <el-collapse v-model="activeNames" @change="handleChange" height="100px">
            <el-collapse-item title name="1">
              <div>
                <el-form ref="form" :model="form" label-width="170px">
                  <el-row :gutter="20">
                    <!--<el-col :span="7">
                      <div class="grid-content bg-purple">
                        <el-form-item label="渠道归属人:">
                          <el-input v-model="input" placeholder="渠道归属人"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="7">
                      <div class="grid-content bg-purple">
                        <el-form-item label="案场归属人:">
                          <el-input v-model="inputy" placeholder="案场归属人"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>-->

                  </el-row>
                </el-form>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>

        <div class="rule-zindex" style="">
          <el-form ref="form" :model="form" label-width="0px">
            <el-row :gutter="20">
              <el-col :span="4" style="margin-left:15px">
                <div class="grid-content bg-purple">
                  <el-form-item label="">
                    <el-input  v-model="name" placeholder="客户姓名"></el-input>
                  </el-form-item>
                </div>

              </el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <el-form-item label="">
                    <el-input  v-model="cMobile" placeholder="客户电话"></el-input>
                  </el-form-item>
                </div>

              </el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <el-select v-model="selectTime" placeholder="重分配入口" class="hisFirst">
                    <el-option
                      v-for="item in selectTimes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>

              </el-col>

            </el-row>
          </el-form>

        </div>

        <div>

          <div class="form-btn form-buttonng" style="padding-left:0; margin-top:8px;">
            <el-row>
              <el-button type="primary" @click="seach">搜索</el-button>
              <el-button type="info" @click="reset" class="resit-style">重置</el-button>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <div class="task-table-list e-el-row" :style="height">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              class="etable"
              @selection-change="handleSelectionChange"
              :style="heightleft"
            >
              <el-table-column label="重分配批次" header-align="center">
                <template slot-scope="scope">
                  <div class="noWarp">{{scope.row.id}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="EmployeeName" label="操作人"></el-table-column>
              <el-table-column label="操作时间">
                <template slot-scope="scope">
                  <div class="noWarp">{{scope.row.ConfirmTime | toTime}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="RedistributionGenre" label="重分配入口"></el-table-column>
              <el-table-column prop="RedistributionType" label="分配原因"></el-table-column>
              <el-table-column prop="CustomerName" label="客户姓名"></el-table-column>
              <el-table-column prop="CustomerMobile" label="客户手机"></el-table-column>
              <el-table-column prop="ClueStatus" label="客户状态"></el-table-column>
              <el-table-column prop="SalesName" label="归属人"></el-table-column>
              <el-table-column label="归属时间">
                <template slot-scope="scope">
                  {{scope.row.ConfirmTime | toTime}}
                </template>
              </el-table-column>
              <el-table-column prop="OldSalesName" label="原归属人"></el-table-column>
              <el-table-column label="原归属时间">
                <template slot-scope="scope">
                  {{scope.row.time | toTime}}
                </template>
              </el-table-column>
            </el-table>
            <div class="page-submit">
          <div></div>
          <!-- 分页 -->
          <div class="block">
            <el-pagination
              :current-page="currentPage"
              :page-sizes="[10,  20, 50, 100]"
              :page-size="10"
              :pager-count="3"
              :total="total"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
          </div>
        </el-col>

      </el-row>
    </div>

  </div>
</template>

<script>
import { queryRedistributionRecord } from "@/api/generalpost/index";
import { parseTime } from "@/utils/index"
export default {
  filters: {
    toTime(val) {
      //{y}-{m}-{d} {h}:{i}:{s}
      if(val==undefined || val==='' || val===null){
        return '';
      }
      return parseTime(val, '{y}-{m}-{d}');
    }
  },
  data() {
    return {
      loading: false,
      height: {
        height: ""
      },
      heightleft: {
        heightleft: ""
      },
      projectId: localStorage.getItem("pojid"),
      currentPage: 1,
      pageSize: 10,
      total: 10,
      activeNames: "0",
      options: [
        {
          value: "选项1",
          label: "全部"
        },
        {
          value: "选项2",
          label: "未到访"
        },
        {
          value: "选项3",
          label: "已到访"
        },
        {
          value: "选项4",
          label: "已认等"
        },
        {
          value: "选项5",
          label: "已认购"
        },
        {
          value: "选项6",
          label: "已签约"
        },
        {
          value: "选项7",
          label: "交易中"
        },
        {
          value: "选项8",
          label: "看房"
        }
      ],
      value: "",
      name: "",
      cMobile: "",
      input: "",
      selectTime:"",
      selectTimes: [
        {
          value: "2",
          label: "案场台账重分配"
        },{
          value: "4",
          label: "公共池重分配"
        }
      ],

      inputy: "",

      ouser: "",
      tableData: [],
      categorys: [
        {
          value: "选项1",
          label: "报备"
        },
        {
          value: "选项2",
          label: "到访"
        }
      ],
       activities: [{
          content: '签约',
          timestamp: '2018-04-12 20:46',
          size: 'large',
        }, {
          content: '认购',
          timestamp: '2018-04-03 20:46',
          size: 'large',
        }, {
          content: '排大卡',
          timestamp: '2018-04-03 20:46',
          size: 'large'
        }, {
          content: '排小卡',
          timestamp: '2018-04-03 20:46',
          size: 'large',
        },
         {
          content: '首访',
          timestamp: '2018-04-03 20:46',
          size: 'large',
        },
         {
          content: '报备',
          timestamp: '2018-04-03 20:46',
          size: 'large',
        }]
    };
  },
  created() {
    this.hh();
    this.getTableDataList();
  },
  methods: {
    // 获取高度
    hh() {
      this.height.height = window.innerHeight - 200 + "px";
      this.heightleft.height = window.innerHeight - 260 + "px";
      // console.log(this.height.height)
    },
    collapseHandler() {
      this.activeNames = this.activeNames === '0' ? '1' : '0';
    },
    // 折叠菜单
    handleChange(val) {
      console.log(val);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getTableDataList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getTableDataList();
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 接收table列表
    getTableDataList() {
      this.loading = true;
      queryRedistributionRecord({
        ProjectId: this.projectId,
        pageSize: this.pageSize,
        name: this.name,
        mobile: this.cMobile,
        pageNum: this.currentPage,
        redistributionGenre: this.selectTime
      }).then(res => {
        this.total = res.result.total;
        this.tableData = res.result.list;
        this.loading = false;
      });
    },
    //搜索
    seach(){
      this.getTableDataList();
      _paq.push(['trackEvent', '点击', '搜索', '案场参数---重分配历史搜索']);
    },
  //  重置
    reset(){
      this.name = "";
      this.cMobile = "";
      this.selectTime = "";
      this.getTableDataList();
      _paq.push(['trackEvent', '点击', '重置', '案场参数---搜索重置']);
    },
  }
};
</script>
<style lang='less'>
  .resit-style{
    color: #666 !important;
  }
el-collapse-item__wrap {
  width: 80% !important;
}
.el-collapse-item__wrap {
  border-bottom: 1px dashed #f0f0f0 !important;
}
.el-collapse-item__header {
  height: 56px !important;
}
.el-form-item {
  margin-bottom: 0 !important;
}
.bgc_blue,
.el-button--primary {
  border: 1px solid #f0f0f0 !important;
}
</style>
<style src="@/assets/css/rules.css" scoped>
</style>
<style>
  .grid-content .el-collapse-item__arrow {
    display: none !important;
  }
  .grid-content .noWarp {
    white-space: nowrap;
  }
</style>
