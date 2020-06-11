<template>
  <div class="twoMonthInfo" ref="twoMonthInfo">
    <el-collapse v-model="openList" @change="openChange">
      <el-collapse-item title="基础信息" name="1">
        <template slot="title">
          <h3 class="titleText">基础信息</h3>
        </template>
        <ul class="baseInfo">
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">项目名称 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{projectInfo.projectName}}</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请人部门 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{projectInfo.post_name}}</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请时间 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{projectInfo.zddate}}</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请人 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{projectInfo.EmployeeName}}</el-col>
            </el-row>
          </li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="审批信息" name="2">
        <template slot="title">
          <h3 class="titleText">审批信息</h3>
        </template>
        <div class="threeMonthValueInfo">
          <div class="containter">
            <div class="node" id="node">
              <p class="bold">节点客储计划</p>
              <el-table
                :data="nodeData"
                border
                :header-cell-style="{background:'#F5F7FA',color:'#999'}"
                style="width: 100%"
                :span-method="mergeCol"
              >
                <el-table-column label="节点" prop="nide_name" width="160" align="center"></el-table-column>
                <el-table-column align="center" prop="node_time" width="160" label="日期"></el-table-column>
                <el-table-column align="center" prop="line_name" label></el-table-column>
                <el-table-column align="center" prop="report_num" label="报备(组)"></el-table-column>
                <el-table-column align="center" prop="visit_num" label="来访(组)"></el-table-column>
                <el-table-column align="center" prop="little_num" label="小卡(组)"></el-table-column>
                <el-table-column align="center" prop="little_per" label="小卡率(%)">
                  <template slot-scope="scope">{{scope.row.little_per + '%'}}</template>
                </el-table-column>
                <el-table-column align="center" prop="big_num" label="大卡(组)"></el-table-column>
                <el-table-column align="center" prop="big_per" label="大卡率(%)">
                  <template slot-scope="scope">{{scope.row.big_per + '%'}}</template>
                </el-table-column>
                <el-table-column align="center" prop="sub_num" label="认购(套)"></el-table-column>
                <el-table-column align="center" prop="make_per" label="成交"></el-table-column>
              </el-table>
            </div>
            <div class="come" id="come">
              <p class="bold">来访周拆分</p>
              <el-table
                :data="comeData"
                border
                :span-method="mergeSpan"
                :header-cell-style="{background:'#F5F7FA',color:'#999'}"
                style="width: 100%"
              >
                <el-table-column label="周期" width="160" prop="week" align="center"></el-table-column>
                <el-table-column align="center" width="160" prop="day_date" label="日期"></el-table-column>
                <el-table-column align="center" prop="plan_add" label="计划新增(组)">
                  <template slot-scope="scope">
                    <span v-if="scope.row.week=='完整波段'">{{allSum}}</span>
                    <span v-else>{{scope.row.plan_add}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="plan_total" label="计划累计(组)">
                  <!-- <template slot-scope="scope">
                  <el-input v-if="scope.row.isWrite==1&&scope.row.week!=='完整波段'" v-model="scope.row.plan_total"></el-input>
                  <span v-else>{{scope.row.plan_total}}</span>
                  </template>-->
                </el-table-column>
                <el-table-column align="center" prop="plan_task_per" label="计划阶段任务占比(%)">
                  <template slot-scope="scope">
                  <!-- <el-input v-if="scope.row.isWrite==1&&scope.row.week!=='完整波段'" v-model="scope.row.plan_task_per"></el-input> -->
                  <span>{{scope.row.plan_task_per + '%'}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="actual_add" label="实际新增(组)">
                  <template slot-scope="scope">
                    <span v-if="scope.row.week=='完整波段'">{{allRate}}</span>
                    <span v-else>{{scope.row.actual_add}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="actual_total" label="实际累计(组)">
                  <!-- <template slot-scope="scope">
                  <el-input v-if="scope.row.isWrite==1&&scope.row.week!=='完整波段'" v-model="scope.row.actual_total"></el-input>
                  <span v-else>{{scope.row.actual_total}}</span>
                  </template>-->
                </el-table-column>
                <el-table-column align="center" prop="actual_task_per" label="实际阶段任务占比(%)">
                  <template slot-scope="scope">
                  <!-- <el-input v-if="scope.row.isWrite==1&&scope.row.week!=='完整波段'" v-model="scope.row.actual_task_per"></el-input> -->
                  <span>{{scope.row.actual_task_per + '%'}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="bias_value" label="绝对偏差值">
                  <!-- <template slot-scope="scope">
                  <el-input v-if="scope.row.isWrite==1&&scope.row.week!=='完整波段'" v-model="scope.row.bias_value"></el-input>
                  <span v-else>{{scope.row.bias_value}}</span>
                  </template>-->
                </el-table-column>
                <el-table-column align="center" prop="bias_per" label="偏差率">
                  <!-- <template slot-scope="scope">
                  <el-input v-if="scope.row.isWrite==1&&scope.row.week!=='完整波段'" v-model="scope.row.bias_per"></el-input>
                  <span v-else>{{scope.row.bias_per}}</span>
                  </template>-->
                </el-table-column>
                <el-table-column align="center" prop="bias_cause" width="200" label="偏差原因">
                  <template slot-scope="scope">
                    <span
                      v-if="scope.row.causeisWrite==1&&scope.row.week!=='完整波段' && !readonly"
                      v-text="scope.row.bias_cause"
                    ></span>

                    <span v-else>{{scope.row.bias_cause}}</span>
                  </template>
                </el-table-column>
              </el-table>
              <span style="color:red;font-size:14px;">注：因四舍五入，计划阶段任务占比会存在合计值与100%有偏差。</span>
            </div>
            <div class="node" v-show="isCheck" id="node_">
              <p class="bold">变更节点客储计划</p>
              <el-table
                :data="nodePlan"
                border
                :header-cell-style="{background:'#F5F7FA',color:'#999'}"
                style="width: 100%"
              >
                <el-table-column label="节点" prop="nide_name" width="160" align="center"></el-table-column>
                <el-table-column align="center" prop="node_time" width="160" label="日期"></el-table-column>
                <el-table-column align="center" prop="line_name" label></el-table-column>
                <el-table-column align="center" prop="report_num" label="报备(组)">
                  <template slot-scope="scope">
                    <span
                      v-if="node_level<scope.row.node_level  && !readonly"
                      v-text="scope.row.report_num"
                    ></span>
                    <span v-else>{{scope.row.report_num}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="visit_num" label="来访(组)">
                  <template slot-scope="scope">
                    <span
                      v-if="node_level<scope.row.node_level && !readonly"
                      v-text="scope.row.visit_num"
                    ></span>
                    <span v-else>{{scope.row.visit_num}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="little_num" label="小卡(组)">
                  <template slot-scope="scope">
                    <span
                      v-if="node_level<scope.row.node_level && !readonly"
                      v-text="scope.row.little_num"
                    ></span>
                    <span v-else>{{scope.row.little_num}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="little_per" label="小卡率(%)">
                  <template
                    slot-scope="scope"
                  >{{isNaN(scope.row.little_per)?0:scope.row.little_per + '%'}}</template>
                </el-table-column>
                <el-table-column align="center" prop="big_num" label="大卡(组)">
                  <template slot-scope="scope">
                    <span
                      v-if="node_level<scope.row.node_level && !readonly"
                      v-text="scope.row.big_num"
                    ></span>
                    <span v-else>{{scope.row.big_num}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="big_per" label="大卡率(%)">
                  <template slot-scope="scope">{{isNaN(scope.row.big_per)?0:scope.row.big_per + '%'}}</template>
                </el-table-column>
                <el-table-column align="center" prop="sub_num" label="认购(套)">
                  <template slot-scope="scope">
                    <span
                      v-if="node_level<scope.row.node_level && !readonly"
                      v-text="scope.row.sub_num"
                    ></span>
                    <span v-else>{{scope.row.sub_num}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="make_per" label="成交">
                  <template slot-scope="scope">{{isNaN(scope.row.make_per)?0:scope.row.make_per}}</template>
                </el-table-column>
              </el-table>
            </div>
            <div class="come" v-show="isCheck" id="come_">
              <p class="bold">变更来访周拆分</p>
              <el-table
                :data="comeDataCopy"
                :span-method="mergeSpan"
                border
                :header-cell-style="{background:'#F5F7FA',color:'#999'}"
                style="width: 100%"
              >
                <el-table-column label="周期" width="160" prop="week" align="center"></el-table-column>
                <el-table-column align="center" width="160" prop="day_date" label="日期"></el-table-column>
                <el-table-column align="center" prop="plan_add" label="计划新增(组)">
                  <template slot-scope="scope">
                    <!-- <span v-if="scope.row.week=='完整波段'">{{allSum}}</span> -->
                    <!-- <span v-else>{{scope.row.plan_add}}</span> -->
                    <span
                      v-if="scope.row.isWrite==1&&scope.row.week!=='完整波段'  && !readonly "
                      v-text="scope.row.plan_add"
                    ></span>
                    <span v-else-if="scope.row.week=='完整波段' ">{{come_sum}}</span>
                    <span v-else>{{scope.row.plan_add}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="plan_total" label="计划累计(组)">
                  <!-- <template slot-scope="scope">
                  <el-input v-if="scope.row.isWrite==1&&scope.row.week!=='完整波段'" v-model="scope.row.plan_total"></el-input>
                  <span v-else>{{scope.row.plan_total}}</span>
                  </template>-->
                </el-table-column>
                <el-table-column align="center" prop="plan_task_per" label="计划阶段任务占比(%)">
                  <template slot-scope="scope">
                    <!-- <el-input v-if="scope.row.isWrite==1&&scope.row.week!=='完整波段'" v-model="scope.row.plan_task_per"></el-input> -->
                    <span>{{scope.row.plan_task_per | fixed}}%</span>
                  </template>
                </el-table-column>
              </el-table>
              <span style="color:red;font-size:14px;">注：因四舍五入，计划阶段任务占比会存在合计值与100%有偏差。</span>
            </div>
            <div class="card" id="card" v-show="isCheck">
              <p class="bold">办卡方式</p>
              <el-form class="cardForm" :model="cardForm" ref="cardForm" label-width="60px">
                <el-form-item label="小卡" prop="small">
                  <span
                    type="textarea"
                    show-word-limit
                    maxlength="100"
                    v-text="cardForm.little_way"
                    v-if="!readonly"
                  ></span>
                  <span v-else>{{cardForm.little_way}}</span>
                </el-form-item>
                <el-form-item label="大卡" prop="big">
                  <span
                    type="textarea"
                    show-word-limit
                    maxlength="100"
                    v-text="cardForm.big_way"
                    v-if="!readonly"
                  ></span>
                  <span v-else>{{cardForm.big_way}}</span>
                </el-form-item>
              </el-form>
            </div>

            <div class="list" id="list">
              <p class="bold">附件清单</p>
              <div class="operation">
                <el-table
                  :data="accessoryData"
                  style="width: 100%"
                  :header-cell-style="{background:'#F5F7FA',color:'#999'}"
                >
                  <el-table-column prop="type" label="附件名称" align="left" width="200"></el-table-column>
                  <el-table-column prop="name" label="附件" align="left">
                    <template slot-scope="scope">
                      <a v-if="!isMobile" :href="local+scope.row.url">{{scope.row.name}}</a>
                      <span v-else @click="YZ_link(scope.row)">{{scope.row.name}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div style="text-align: center;">
      <el-button type @click="fastUpdate()" v-if="this.$route.query.isKSAP">快速审批</el-button>
    </div>
    <Buttons />
  </div>
</template>

<script>
let width = document.body.offsetWidth;
import $ from "jquery";
import {
  selectNodePlan,
  updateNodePlan,
  forMtstartThreeAndTwo,
  get,
  fastUpdate
} from "@/api/firstPlan";
export default {
  components: {
    Buttons: () => import("../../views/offerFlow/component/index")
  },
  data() {
    let isMobile = width <= 1024;
    return {
      isType: "",
      isMobile: width <= 1024,
      projectInfo: "",
      activeTab: "1",
      openList: ["1", "2"],
      isCheck: false,
      isShowKS: localStorage.getItem("employeeName") == "管理员",
      newVersionFlag: false,
      cardForm: {
        big_way: "",
        little_way: ""
      },
      createTime: "",
      fileList__: [],
      fileList: [],
      isShowVersion: false,
      versions: "",
      node_level: this.$route.query.node_level,
      comeData: [],
      nodeData: [],
      NodePlanWrite: [],
      accessoryData: [
        {
          type: "",
          handle: "其他上传"
        }
      ],
      come_Data: [],
      versionsList: [],
      allSum: 0,
      readonly: true
    };
  },
  created() {
    this.reload();
  },
  filters: {
    fixed: function(data) {
      return parseInt(data);
    }
  },
  computed: {
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
    allRate() {
      return this.comeData[this.comeData.length - 1].actual_total;
    },
    nodePlan() {
      return this.NodePlanWrite.filter(item => item.level == 1);
    },
    come_sum() {
      let sum = 0;
      let mylist = [...this.come_Data].concat();
      mylist.splice(0, 1);
      mylist.forEach(item => {
        sum += Number(item.plan_add);
      });
      return sum;
    },
    comeDataCopy() {
      let arr = [...this.come_Data];
      arr.forEach((item, index) => {
        if (index == 1) {
          if (isNaN(Number(item.plan_add))) {
            item.plan_total = 0;
          } else {
            item.plan_total = Number(item.plan_add);
          }
        }
        if (index > 1) {
          if (isNaN(Number(item.plan_add))) {
            item.plan_total = 0;
          } else {
            item.plan_total =
              Number(item.plan_add) +
              Number(this.come_Data[index - 1].plan_total);
          }
        }
      });
      arr.forEach(item => {
        if (isNaN(Number(this.allSum))) {
          item.plan_task_per == "0";
        } else {
          item.plan_task_per = isNaN(
            (Number(item.plan_add) / Number(this.allSum)) * 100
          )
            ? 0
            : (Number(item.plan_add) / Number(this.allSum)) * 100;
        }
      });
      return arr;
    }
  },
  watch: {
    come_Data: {
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
    }
  },
  methods: {
    openChange(val) {},
    fastUpdate() {
      //快速审批
      fastUpdate({
        flow_id: this.$route.query.BOID,
        node_level: "4",
        orgName: "fp_open_two"
      }).then(res => {
        window.close();
      });
    },

    changeVersion() {
      this.reload();
    },
    tabClick(tab, event) {},
    reload(num) {
      //监控进入只查看
      if (this.$route.query.type != null && this.$route.query.type == "view") {
        this.isType = this.$route.query.type;
      }
      let obj = {
        plan_id: this.$route.query.plan_id,
        node_level: this.$route.query.node_level,
        plan_node_id: this.$route.query.plan_node_id
      };
      if (this.versions) {
        obj.flow_id = this.versions;
      }

      if (num) {
        obj.newVersion = num;
        obj.flow_id = "";
      }
      if (this.$route.query.BOID) {
        obj.flow_id = this.$route.query.BOID;
      }
      selectNodePlan(obj).then(res => {
        if (res.code == 0) {
          this.projectInfo = res.result.flow[0];
          this.isShowVersion = res.result.judgeVersion == 1 ? true : false;
          this.comeData = res.result.Week.concat();
          this.come_Data = [...res.result.WeekWrite].concat();
          this.nodeData = res.result.NodePlan.concat();
          this.NodePlanWrite = res.result.NodePlanWrite.concat();
          this.versionsList = res.result.flow.concat();
          if (this.nodeData.length > 1) {
            this.createTime = this.nodeData[1].create_time;
          }
          if (res.result.flow.length > 0) {
            this.versions = res.result.flow[0].flow_id;
            if (res.result.flow[0].approval_stuat) {
              this.readonly =
                res.result.flow[0].approval_stuat == 4 ||
                res.result.flow[0].approval_stuat == 3
                  ? true
                  : false;
            }
          }
          if (
            res.result.flow.length == 0 ||
            res.result.flow[0].approval_stuat == 10
          ) {
            this.readonly = false;
          }
          this.isCheck = res.result.change == 1 ? true : false;
          this.cardForm = {
            big_way: this.nodeData[0].big_way,
            little_way: this.nodeData[0].little_way
          };

          let arr5 = res.result.fileList;
          this.accessoryData = [
            {
              type: "",
              handle: "其他上传"
            }
          ];
          if (arr5.length > 0) {
            let temp = this.accessoryData.pop();
            arr5.forEach((item, index) => {
              if (item.orderIndex >= 0) {
                this.accessoryData.push({
                  type: "其他上传",
                  handle: "上传",
                  id: item.id,
                  name: item.name,
                  url: item.url,
                  orderIndex: item.orderIndex
                });
              } else {
                this.accessoryData[0].id = item.id;
                this.accessoryData[0].name = item.name;
                this.accessoryData[0].url = item.url;
                this.accessoryData[0].orderIndex = item.orderIndex;
              }
            });
            this.accessoryData.push(temp);
          }
        }
      });
    },
    scrollLink(id) {
      document.getElementById(id).scrollIntoView();
    },

    mergeSpan({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        if ((columnIndex - 2) % 3 === 0 && columnIndex - 2 < 6) {
          return {
            rowspan: 1,
            colspan: 3
          };
        } else if (columnIndex < 2 || columnIndex - 2 > 6) {
          return {
            rowspan: 1,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    mergeCol({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < 2) {
        if (rowIndex % 3 === 0) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    YZ_link(file) {
      console.log(this.isMobile);
      if (this.isMobile) {
        var isTest = ["salesmgt-uat", "salesmgt-test"].some(function(item) {
          return window.location.href.indexOf(item) !== -1;
        });
        let wm = {
          htmlTitle: "首开前两月",
          wmContent: this.userID || "旭辉集团",
          wmSize: 10,
          wmFont: "microsoft yahei",
          wmColor: 7,
          isDelSrc: 1
        };
        // let resquestUrl=isTest?`${location.origin}/dcs.web/onlinefile`:`${location.origin}/dcs.web/onlinefile`
        let resquestUrl = `https://oadoc.cifi.com.cn/dcs.web/onlinefile`;
        let requrl = file.url.split("?n=")[0];
        let end = requrl.split(".")[requrl.split(".").length - 1];
        let convertType;
        if (end == "pdf") {
          convertType = "20";
        } else if (end == "tif") {
          convertType = "17";
        } else {
          convertType = "0";
        }
        // var tempwindow=window.open('about:blank');
        $.ajax({
          url: resquestUrl,
          data: {
            ...wm,
            downloadUrl: location.origin + requrl,
            convertType
          },
          dataType: "json",
          async: false,
          type: "post",
          success: function(data) {
            if (data.result == 0) {
              if (parent) {
                parent.window.location.href = data.data[0];
              } else {
                window.location.href = data.data[0];
              }
            } else {
              this.$message.error("转换失败");
            }
          },
          error: function(data) {
            alert("报错:" + JSON.stringify(data));
            open(file.url);
          }
        });
      } else {
        let requrl = file.url.split("?")[0];
        open(file.url);
      }
    }
  },
  mounted() {
    let timeid = setTimeout(() => {
      if (window.cifioa) {
        console.log(this.$refs.twoMonthInfo.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.twoMonthInfo.offsetHeight
        });
      } else {
        console.warn("缺少cifioa插件");
      }
      clearTimeout(timeid);
    }, 700);
  },
  updated() {
    let timeid = setTimeout(() => {
      if (window.cifioa) {
        console.log(this.$refs.twoMonthInfo.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.twoMonthInfo.offsetHeight
        });
      } else {
        console.warn("缺少cifioa插件");
      }
      clearTimeout(timeid);
    }, 700);
  }
};
</script>

<style lang="less" scoped>
.twoMonthInfo {
  .titleText {
    border-left: 3px solid #2661ff;
    height: 20px;
    line-height: 20px;
    text-indent: 1em;
    font-size: 16px;
    margin-left: 5px;
  }
  .lightFather {
    height: 20px;
    line-height: 20px;
    padding-left: 10px;
    .light {
      height: 16px;
      width: 16px;
      border-radius: 50%;
      // background-color: red;
      float: left;
      margin-top: 2px;
    }
    span {
      padding-left: 10px;
    }
  }
  .green {
    background-color: green;
  }
  .red {
    background-color: red;
  }
  .baseInfo {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 33.33%;
      padding-left: 10px;
    }
  }
  ::v-deep .form_item_title {
    border: none !important;
  }
  ::v-deep .form-container .form_item {
    padding: 0px;
    margin-top: 0px;
  }
  @media (max-width: 1024px) {
    .baseInfo {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 100%;
        padding-left: 10px;
      }
    }
    ::v-deep .el-form-item__label {
      width: 120px !important;
    }
    ::v-deep .el-form-item__content {
      margin-left: 120px !important;
    }

    ::v-deep .inputForm .el-col-8 {
      width: 100% !important;
    }
  }
}

.threeMonthValueInfo {
  ::v-deep input::-webkit-outer-spin-button,
  ::v-deep input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::v-deep input[type="number"] {
    -moz-appearance: "textfield";
  }
  ::v-deep .el-form {
    width: 40%;
  }
  .top {
    background: #fff;
    color: #333;
    font-size: 14px;
    height: 50px;
    ::v-deep .el-button {
      height: 30px;
      float: right;
      margin-left: 10px;
      margin-top: 10px;
    }
    ::v-deep .el-button:first-child {
      margin-right: 15px;
    }
  }
  .containter {
    margin: 10px;
    background-color: #fff;
    ::v-deep .el-tabs {
      padding: 0 15px;
    }
    .come {
      padding: 0 15px;
      margin-bottom: 15px;
      p {
        height: 30px;
        line-height: 30px;
        color: #333;
        font-size: 14px;
      }
      .bold {
        font-weight: 700;
      }
    }
    .node {
      padding: 0 15px;
      margin-bottom: 15px;

      p {
        height: 30px;
        line-height: 30px;
        color: #333;
        font-size: 14px;
        position: relative;
        ::v-deep .el-checkbox {
          position: absolute;
          top: 50%;
          right: 30px;
          transform: translateY(-50%);
          color: #333;
        }
        ::v-deep .el-checkbox__label {
          font-size: 12px;
        }
        .time {
          position: absolute;
          top: 50%;
          right: 200px;
          transform: translateY(-50%);
          color: #999;
          font-size: 12px;
          font-weight: normal;
        }
      }
      .bold {
        font-weight: 700;
      }
    }
    .list {
      padding: 0 15px;
      margin-bottom: 15px;

      p {
        height: 30px;
        line-height: 30px;
        color: #333;
        font-size: 14px;
      }
      .bold {
        font-weight: 700;
      }
    }
    .card {
      padding: 0 15px;
      margin-bottom: 15px;
      .cardForm {
        width: 100%;
      }
      p {
        height: 30px;
        line-height: 30px;
        color: #333;
        font-size: 14px;
      }
      .bold {
        font-weight: 700;
      }
      ::v-deep .el-textarea__inner {
        height: 100px;
      }
      ::v-deep .el-form-item__content {
        margin-bottom: 10px;
      }
    }
  }
  .bottom {
    text-align: center;
    height: 60px;
    line-height: 60px;
    background: #fff;
    margin: 0 15px;
    ::v-deep .el-button {
      height: 30px;
    }
  }
}
</style>
