<template>
  <div class="clientStorage">
    <div class="link" v-if="!readonlyflag">
      <span @click="anchor('node')">节点储客计划</span>
      <span @click="anchor('come')">来访周拆分</span>
      <span @click="anchor('card')">办卡方式</span>
      <span @click="anchor('operation')">附件清单</span>
    </div>
      <div class="node" id="node">
        <div class="meeting">
          <div class="t">
            <p>
              节点客储计划
              <span>（备注：此处指各个节点累计客储计划数）</span>
            </p>
          </div>
          <el-button class="reject" v-if="!$route.query.BOID">
            <a :href="exportTemp()" download="download">导出</a>
          </el-button>
        </div>
        <el-table
          :data="nodeDataCopy"
          border
          :header-cell-style="{ background: '#F6F8FD', color: '#999' }"
          style="width: 100%"
        >
          <el-table-column prop="nide_name" label="节点" width="180"></el-table-column>
          <el-table-column prop="node_time" label="日期" width="180"></el-table-column>
          <el-table-column prop="num" label="报备(组)">
            <template slot-scope="scope">
              <el-input
                type="number"
                v-only-number="{ min: 0 }"
                v-model="scope.row.report_num"
                v-if="!readonlyflag"
                @input.native="
                scope.row.report_num = parseInt(scope.row.report_num)
              "
              ></el-input>
              <span v-else>{{ scope.row.report_num }}</span>
            </template>
          </el-table-column>
          <el-table-column label="来访(组)">
            <template slot-scope="scope">
              <el-input
                type="number"
                v-only-number="{ min: 0 }"
                v-model="scope.row.visit_num"
                v-if="!readonlyflag"
                @input.native="
                scope.row.visit_num = parseInt(scope.row.visit_num)
              "
              ></el-input>
              <span v-else>{{ scope.row.visit_num }}</span>
            </template>
          </el-table-column>
          <el-table-column label="小卡(组)">
            <template slot-scope="scope">
              <span>{{ scope.row.little_num || 0 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="little_per" label="小卡率(%)">
            <template slot-scope="scope">
              <el-input
                type="number"
                v-only-number="{ min: 0, precision: 2 }"
                v-model="scope.row.little_per"
                v-if="!readonlyflag"
              ></el-input>
              <span v-else>{{ scope.row.little_per + '%'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="大卡(组)">
            <template slot-scope="scope">
              <span>{{ scope.row.big_num || 0 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="big_per" label="大卡率(%)">
            <template slot-scope="scope">
              <el-input
                type="number"
                v-only-number="{ min: 0, precision: 2 }"
                v-model="scope.row.big_per"
                v-if="!readonlyflag"
              ></el-input>
              <span v-else>{{ scope.row.big_per + '%' || 0 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="认购(套)">
            <template slot-scope="scope">
              <el-input
                type="number"
                v-only-number="{ min: 0 }"
                v-model="scope.row.sub_num"
                @input.native="scope.row.sub_num = parseInt(scope.row.sub_num)"
                v-if="!readonlyflag&&scope.row.nide_name!='首开'"
              ></el-input>
              <span v-else-if="scope.row.nide_name=='首开'">{{scope.row.sub_num=designtwo_selling_num}}</span>
              <span v-else>{{ scope.row.sub_num }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="make_per" label="成交率(%)">
            <template slot-scope="scope">{{ scope.row.make_per + '%' || 0 }}</template>
          </el-table-column>
        </el-table>
      </div>
      <div class="come" id="come">
        <p>来访周拆分</p>
        <el-table
          :data="comeDataCopy"
          border
          :span-method="mergeCome"
          :header-cell-style="{ background: '#F6F8FD', color: '#999' }"
          :cell-style="cellStyle"
          style="width: 100%"
        >
          <el-table-column prop="week" label="周期" width="180"></el-table-column>
          <el-table-column prop="day_date" label="日期" width="180"></el-table-column>
          <el-table-column prop="plan_add" label="计划新增(组)">
            <template slot-scope="scope">
              <span v-if="scope.row.week == '完整波段'">{{ allSum || 0 }}</span>
              <el-input
                type="number"
                v-only-number="{ min: 0 }"
                v-model="scope.row.plan_add"
                @input.native="scope.row.plan_add = parseInt(scope.row.plan_add)"
                v-else-if="!readonlyflag"
              ></el-input>
              <span v-else>{{ scope.row.plan_add }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="plan_total" label="计划累计(组)">
            <template slot-scope="scope">
              <!-- <el-input v-model="scope.row.plan_add" v-if="scope.row.week!='完整波段'"></el-input> -->
              <span>{{ scope.row.plan_total || 0 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="plan_task_per" label="计划阶段任务占比(%)">
            <template slot-scope="scope">
              <span>{{ scope.row.plan_task_per || 0 }}</span>
            </template>
          </el-table-column>
        </el-table>
        <span style="color:red;font-size:14px;">注：因四舍五入，计划阶段任务占比会存在合计值与100%有偏差。</span>
      </div>

      <div class="card" id="card">
        <p>办卡方式</p>
        <!-- <el-input type="textarea" label="111"></el-input>
        -->
        <el-form :model="cardForm" ref="cardForm" class="cardForm">
          <el-form-item label="小卡:" prop="desc">
            <el-input
              type="textarea"
              show-word-limit
              placeholder="文字描述（500字以内）"
              maxlength="500"
              v-model="cardForm.little_way"
              :readonly="readonlyflag"
            ></el-input>
            <!-- v-if="!readonlyflag" -->
            <!-- <span v-else>{{cardForm.little_way}}</span> -->
          </el-form-item>
          <el-form-item label="大卡:" prop="desc">
            <el-input
              type="textarea"
              show-word-limit
              placeholder="文字描述（500字以内）"
              maxlength="500"
              v-model="cardForm.big_way"
              :readonly="readonlyflag"
            ></el-input>
            <!-- v-if="!readonlyflag" -->
            <!-- <span v-else>{{cardForm.big_way}}</span> -->
          </el-form-item>
        </el-form>
      </div>
      <div class="operation" id="operation">
        <p>附件清单</p>
        <el-table
          :data="accessoryData"
          style="width: 100%"
          :header-cell-style="{ background: '#F5F7FA', color: '#999' }"
        >
          <el-table-column prop="type" label="附件名称" align="left" width="250"></el-table-column>
          <el-table-column prop="name" label="附件" align="left">
            <template slot-scope="scope">
              <a :href="local + scope.row.url">{{ scope.row.name }}</a>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template slot-scope="scope">
              <div class="fileBox" v-if="scope.$index < accessoryData.length - 1">
                <el-upload
                  :on-exceed="exceed"
                  :action="action"
                  :data="{
                  filePath: 'setSecond',
                  bizID: '',
                  orderIndex: scope.$index
                }"
                  :on-success="fileSuccess"
                  :file-list="fileList__[scope.$index]"
                  v-if="!readonlyflag && !scope.row.name"
                  :on-remove="fileRemove"
                  :on-error="fileError"
                >
                  <el-button class="operationItem" type="text">{{ scope.row.handle }}</el-button>
                </el-upload>
                <el-button
                  class="operationItem"
                  type="text"
                  v-if="!readonlyflag && scope.row.name"
                  @click="delFielList(scope.$index)"
                >删除</el-button>
              </div>
              <div class="fileBox" v-else>
                <el-upload
                  :action="action"
                  :on-success="fileSuccess"
                  :data="{
                  filePath: 'setSecond',
                  bizID: '',
                  orderIndex: scope.$index
                }"
                  v-if="!readonlyflag"
                  :on-remove="fileRemove"
                  :on-error="fileError"
                >
                  <el-button v-if="!readonlyflag" class="operationItem" type="text">
                    +{{
                    scope.row.handle
                    }}
                  </el-button>
                </el-upload>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

  </div>
</template>

<script>
import { selectStorageNodePlan } from "@/api/firstPlan";
import { downLoad } from "@/api/request";
export default {
  name: "clientStorage",
  props: ["beforeAct", "versions", "flowId", "readonly"],

  data() {
    return {
      comeData: [],
      nodeData: [],
      cardForm: {
        little_way: "",
        big_way: ""
      },
      allSum: 0,
      plan_id: this.$route.query.plan_id,
      plan_node_id: this.$route.query.plan_node_id,
      flow_id: "",
      accessoryData: [
        { type: "《顶设2报告》", handle: "上传" },
        { type: "《大定价楼幢系数表&综合系数表》", handle: "上传" },
        { type: "《全面预算》", handle: "上传" },
        { type: "《顶设2会议纪要》", handle: "上传" },
        { type: "", handle: "其他上传" }
      ],
      fileList__: [],
      fileList: []
    };
  },
  filters: {
    fixed: function(data) {
      if (!data) {
        return "0.00";
      }
      return data.toFixed(0);
    }
  },
  computed: {
    designtwo_selling_num(){
      return this.$parent.$parent.$parent.$refs.coreStandard.numberTable.designtwo_selling_num||0
    },
    activeTab() {
      return this.beforeAct;
    },
    action() {
      let href = process.env.VUE_APP_BASE_API;
      return href + "/Upload/uploadFile_2";
    },
    local() {
      let host;
      if (location.origin.includes("test")) {
        host = "https://salesmgt-test.cifi.com.cn";
      } else if (location.origin.includes("uat")) {
        host = "https://salesmgt-uat.cifi.com.cn";
      } else {
        host = "https://salesmgt.cifi.com.cn";
      }
      return host;
    },
    readonlyflag() {
      if (this.$route.query.BOID) {
        return true;
      } else if (this.$route.query.disabled) {
        return true;
      } else if (this.$route.query.readonly) {
        return this.$route.query.readonly;
      } else {
        return this.readonly;
      }
    },
    actVersions() {
      return this.versions;
    },
    FLOWID() {
      return this.flowId;
    },
    comeDataCopy() {
      let arr = [...this.comeData];
      if (arr.length > 0) {
        arr[0].plan_add = 0;
      }
      arr.forEach((item, index) => {
        if (index == 0) {
          if (isNaN(Number(item.plan_add))) {
            item.plan_total = 0;
          } else {
            item.plan_total = Number(item.plan_add);
          }
        }
        if (index >= 1) {
          if (isNaN(Number(item.plan_add))) {
            item.plan_total = 0;
          } else {
            item.plan_total =
              Number(item.plan_add) +
              Number(this.comeData[index - 1].plan_total);
          }
        }
      });

      arr.forEach(item => {
        let plan_task_per = 0;
        if (Number(this.allSum)) {
          plan_task_per = isNaN(
            (Number(item.plan_add) / Number(this.allSum)) * 100
          )
            ? 0
            : (Number(item.plan_add) / Number(this.allSum)) * 100;
        }
        item.plan_task_per = plan_task_per.toFixed(0);
      });

      return arr;
    },
    nodeDataCopy() {
      let arr = [...this.nodeData];
      arr.forEach(item => {
        if (
          isNaN(Number(item.visit_num)) ||
          isNaN(Number(item.little_per)) ||
          Number(item.visit_num) == 0
        ) {
          item.little_num = 0;
        } else {
          item.little_num = (
            (Number(item.little_per) * Number(item.visit_num)) /
            100
          ).toFixed(0);
        }
        if (
          isNaN(Number(item.visit_num)) ||
          isNaN(Number(item.big_per)) ||
          Number(item.visit_num) == 0
        ) {
          item.big_num = 0;
        } else {
          item.big_num = (
            (Number(item.big_per) * Number(item.visit_num)) /
            100
          ).toFixed(0);
        }
        if (
          isNaN(Number(item.visit_num)) ||
          isNaN(Number(item.sub_num)) ||
          Number(item.visit_num) == 0
        ) {
          item.make_per = 0;
        } else {
          item.make_per = (
            (Number(item.sub_num) / Number(item.visit_num)) *
            100
          ).toFixed(0);
        }
      });
      return arr;
    }
  },
  watch: {
    comeData: {
      handler(a, b) {
        let sum = 0;
        a.forEach(item => {
          if (item.plan_add) {
            sum += Number(item.plan_add);
          }
        });
        this.allSum = sum;
      },
      deep: true
    },
    activeTab: {
      handler(a, b) {
        if (a == "coreStandard") {
          this.reload();
        }
      },
      deep: true
    },
    actVersions: {
      handler(a, b) {
        this.reload();
      },
      deep: true
    },
    FLOWID: {
      handler(a, b) {
        this.flow_id = a;
      },
      deep: true
    }
  },
  methods: {
    exportTemp() {
      let { plan_id, plan_node_id } = this.$route.query;
      if (this.$route.query.BOID) {
        plan_node_id = this.$route.query.BOID;
      }
      return downLoad("/TopSettingTwoExcel/CustomerSavingsPlanExcel", {
        plan_id: plan_id,
        plan_node_id: plan_node_id
      });
    },
    exceed(files, fileList) {
      this.$message.warning(`当前限制选择1个文件`);
    },
    delFielList(idx) {
      let namelist = [
        "《顶设2报告》",
        "《大定价楼幢系数表&综合系数表》",
        "《全面预算》"
      ];
      if (idx <= 3) {
        this.accessoryData.splice(idx, 1, {
          type: namelist[idx],
          handle: "上传"
        });
      } else {
        this.accessoryData.splice(idx, 1);
      }
    },
    fileError() {
      this.$message.error("上传失败");
    },
    fileRemove(file, fileList) {},
    fileSuccess(res, file, fileList) {
      if (!res.data) {
        this.$message.error(res.messages);
        return;
      }
      if (res.data.orderIndex < this.accessoryData.length - 1) {
        this.$set(
          this.accessoryData[res.data.orderIndex],
          "name",
          res.data.name
        );
        this.$set(this.accessoryData[res.data.orderIndex], "id", res.data.id);
        this.$set(this.accessoryData[res.data.orderIndex], "url", res.data.url);
      } else {
        let temp = this.accessoryData[this.accessoryData.length - 1];
        this.accessoryData.pop();
        this.accessoryData.push({
          type: "其他上传",
          handle: "上传",
          name: res.data.name,
          id: res.data.id,
          url: res.data.url
        });
        this.accessoryData.push(temp);
      }
    },
    mergeCome({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0 && columnIndex == 2) {
        return {
          rowspan: 1,
          colspan: 3
        };
      } else if (rowIndex == 0 && columnIndex > 2) {
        return {
          rowspan: 0,
          colspan: 0
        };
      }
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < 2) {
        return {
          background: "#F6F8FD",
          color: "#999"
        };
      }
    },
    anchor(id) {
      document.getElementById(id).scrollIntoView({block:'end'});
      // document.querySelector("#containter").scrollTop =
      //   document.getElementById(id).offsetTop - 40;
    },
    reload() {
      let obj = {
        plan_id: this.plan_id || "",
        plan_node_id: this.plan_node_id || this.$route.query.BOID
      };
      obj.plan_node_id = this.versions;
      if (this.$route.query.BOID) {
        obj.plan_node_id = this.$route.query.BOID;
      }
      selectStorageNodePlan(obj).then(res => {
        if (res.code == 0) {
          this.nodeData = res.result.NodePlan;
          if (res.result.NodePlan.length > 0) {
            this.cardForm = {
              little_way: res.result.NodePlan[0].little_way,
              big_way: res.result.NodePlan[0].big_way
            };
          }
          this.comeData = res.result.Week;
        }
        if (res.result.flow.length > 0) {
          this.flow_id = res.result.flow[0].flow_id;
        } else {
          this.flow_id = "";
        }
        let arr5 = res.result.fileList;
        this.accessoryData = [
          { type: "《顶设2报告》", handle: "上传" },
          { type: "《大定价楼幢系数表&综合系数表》", handle: "上传" },
          { type: "《全面预算》", handle: "上传" },
          { type: "《顶设2会议纪要》", handle: "上传" },

          { type: "", handle: "其他上传" }
        ];
        if (arr5.length > 0) {
          let temp = this.accessoryData.pop();
          arr5.forEach((item, index) => {
            if (item.orderIndex > 3) {
              this.accessoryData.push({
                type: "其他上传",
                handle: "上传",
                id: item.id,
                name: item.name,
                url: item.url,
                orderIndex: item.orderIndex
              });
            } else {
              this.accessoryData[item.orderIndex].id = item.id;
              this.accessoryData[item.orderIndex].name = item.name;
              this.accessoryData[item.orderIndex].url = item.url;
              this.accessoryData[item.orderIndex].orderIndex = item.orderIndex;
            }
          });
          this.accessoryData.push(temp);
        }
      });
    }
  },
  created() {
    this.reload();
  }
};
</script>

<style lang="less" scoped>
@tiTleFontSize: #666666; //拿地后表格Title字体颜色
@ContainerFontSize: #333333; //拿地后内容字体颜色
@import url("../../../assets/css/GlobalBtn.less");

.clientStorage {
  overflow: hidden;
  background: #fff;
  // position: relative;
  // .containter {
  // }
  ::v-deep .el-upload-list {
    display: none;
  }
  .link {
    // height: 40px;
    // list-style: 40px;
    text-align: left;
    margin-top: 10px;
    padding: 5px 10px;
    cursor: pointer;

    // position: fixed;
    // top: 135px;
    // left: auto;
    // height: 40px;
    // line-height: 40px;
    // text-align: left;
    // padding: 0 10px;
    // z-index: 100;
    span {
      margin-right: 25px;
      font-size: 14px;
      color: #2761ff;
    }
  }
  .come {
    ::v-deep .el-table .cell {
      text-align: left;
    }
    ::v-deep .el-input__inner {
      color: #333;
    }
    padding: 10px;
    p {
      height: 40px;
      line-height: 40px;
      font-weight: 700;
    }
  }
  .node {
    padding: 10px;
    ::v-deep .el-table .cell {
      text-align: left;
    }
    p {
      height: 40px;
      line-height: 40px;
      font-weight: 700;
      span {
        font-weight: normal;
      }
    }
    ::v-deep .el-input__inner {
      color: #333;
    }
  }
  .operation {
    padding: 10px;
    ::v-deep .el-table th:first-child .cell:first-child {
      text-indent: 8px;
    }
    p {
      height: 40px;
      line-height: 40px;
      font-weight: 700;
    }
    .fileBox {
      position: relative;
      left: 18px;
      // ::v-deep .el-upload-list {
      //   position: absolute;
      //   top: 0;
      //   left: -100%;
      //   z-index: 10;
      // }
    }
    .operationItem {
      margin-left: -34px;
      color: #2761ff;
    }
  }
  .card {
    padding: 10px;
    p {
      height: 40px;
      line-height: 40px;
      font-weight: 700;
    }
    .cardForm {
      ::v-deep .el-form-item {
        display: flex;
      }
      ::v-deep .el-form-item__label {
        white-space: nowrap;
      }
      ::v-deep .el-form-item__content {
        margin-bottom: 10px;
        flex: 1;
      }
    }
    ::v-deep .el-textarea__inner {
      height: 100px;
      color: #333;
    }
  }
  .meeting {
    height: 40px;
    width: 100%;
    .t {
      float: left;
    }
    .reject {
      float: right;
      .primaryBtn(#333, 500, 12px);
    }
  }
  ::v-deep .is-leaf {
    color: @tiTleFontSize !important;
  }
  ::v-deep .el-table_5_column_57 {
    color: @tiTleFontSize !important;
  }
  ::v-deep .el-table_5_column_58 {
    color: @ContainerFontSize !important;
  }
  .blankBtn {
    .primaryBtn(#fff, 500, 12px);
  }
}
</style>
