<template>
  <div class="twoMonth">
    <navbarLink></navbarLink>
    <div class="headerFixed">
      <div class="top" v-if="isType!='view'">
        <div class="right-btn">
          <el-button>
            <a
              class="educe"
              :href="`${locals}/designmonths/getMonthsExcel.action?flowId=${versions}`"
              target="_blank"
            >导出</a>
          </el-button>
          <el-button @click="$router.push({path:'/planWrite'})">返回列表</el-button>
          <el-button v-show="readonly" @click="toPreview">查看审批</el-button>
          <el-button
            @click="createVersion"
            v-if="isShowVersion"
            v-show="readonly"
            type="primary"
          >创建版本</el-button>
        </div>
        <el-form ref="form" label-width="80px">
          <el-form-item label="选择版本:">
            <el-select @change="changeVersion" v-model="versions" placeholder="请选择版本">
              <el-option
                v-for="(item,index) in versionsList"
                :key="index"
                :label="item.name"
                :value="item.flow_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="tabsFlxed" :class="{isViewFixed:$route.query.type == 'view'}">
        <el-tabs v-model="activeTab" @tab-click="tabClick">
          <el-tab-pane label="客储达成进度" name="1">
            <div class="link" @click="(ev) =>  scrollLink(ev,ev.target.className)">
              <span :class="{isActive: firstEl  || ref == '_node'}" class="_node">节点客储计划</span>
              <span :class="{isActive: ref == '_come' }" class="_come">来访周拆分</span>
              <span :class="{isActive: ref == '_node_'}" class="_node_" v-show="isCheck">变更节点客储计划</span>
              <span :class="{isActive: ref == '_come_'}" class="_come_" v-show="isCheck">变更来访周拆分</span>
              <span :class="{isActive: ref == '_card'}" class="_card" v-show="isCheck">办卡方式</span>
              <span :class="{isActive: ref == '_list'}" class="_list">附件清单</span>
              <!-- <el-button type="text" @click="scrollLink('node')">节点客储计划</el-button>
              <el-button type="text" @click="scrollLink('come')">来访周拆分</el-button>
              <el-button type="text" v-show="isCheck" @click="scrollLink('node_')">变更节点客储计划</el-button>
              <el-button type="text" v-show="isCheck" @click="scrollLink('come_')">变更来访周拆分</el-button>
              <el-button type="text" v-show="isCheck" @click="scrollLink('card')">办卡方式</el-button>
              <el-button type="text" @click="scrollLink('list')">附件清单</el-button>-->
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="null" style="height:105px" v-if="isType=='view'"></div>
    <div style="height:160px" v-else></div>
    <div class="containter" id="containter" :class="{isView:isType == 'view'}">
      <div class="node" id="node">
        <p class="bold">
          节点客储计划
          <el-checkbox :disabled="readonly" v-model="isCheck">变更客储计划</el-checkbox>
          <span class="time">数据更新日期：{{createTime}}</span>
        </p>
        <el-table
          :data="nodeData"
          border
          :header-cell-style="{background:'#F5F7FA',color:'#666'}"
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
            <template slot-scope="scope">{{scope.row.little_per | fixedPercent}}</template>
          </el-table-column>
          <el-table-column align="center" prop="big_num" label="大卡(组)"></el-table-column>
          <el-table-column align="center" prop="big_per" label="大卡率(%)">
            <template slot-scope="scope">{{scope.row.big_per | fixedPercent}}</template>
          </el-table-column>
          <el-table-column align="center" prop="sub_num" label="认购(套)"></el-table-column>
          <el-table-column align="center" prop="make_per" label="成交率(%)">
            <template slot-scope="scope">{{scope.row.make_per | fixedPercent}}</template>
          </el-table-column>
        </el-table>
      </div>
      <div class="come" id="come">
        <p class="bold">来访周拆分</p>
        <el-table
          :data="comeData"
          border
          :span-method="mergeSpan"
          :header-cell-style="{background:'#F5F7FA',color:'#666'}"
          style="width: 100%"
        >
          <el-table-column label="周期" width="160" prop="week" align="center"></el-table-column>
          <el-table-column align="center" width="190" prop="day_date" label="日期"></el-table-column>
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
                  <span >{{scope.row.actual_task_per + '%'}}</span>
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
            <template slot-scope="scope">{{scope.row.bias_per | fixed}}</template>
          </el-table-column>
          <el-table-column align="center" prop="bias_cause" width="200" label="偏差原因">
            <template slot-scope="scope">
              <el-input
                v-if="scope.row.causeisWrite==1&&scope.row.week!=='完整波段' && !readonly"
                v-model="scope.row.bias_cause"
              ></el-input>

              <span v-else>{{scope.row.bias_cause}}</span>
            </template>
          </el-table-column>
          <span style="color:red;font-size:14px;">注：因四舍五入，计划阶段任务占比会存在合计值与100%有偏差。</span>
        </el-table>
      </div>
      <div class="node" v-show="isCheck" id="node_">
        <p class="bold">变更节点客储计划</p>
        <el-table
          :data="nodePlan"
          border
          :header-cell-style="{background:'#F5F7FA',color:'#666'}"
          style="width: 100%"
        >
          <el-table-column label="节点" prop="nide_name" width="160" align="center"></el-table-column>
          <el-table-column align="center" prop="node_time" width="160" label="日期"></el-table-column>
          <el-table-column align="center" prop="line_name" label></el-table-column>
          <el-table-column align="center" prop="report_num" label="报备(组)">
            <template slot-scope="scope">
              <el-input
                type="number"
                v-only-number="{min:0}"
                @change="setSum(scope.row)"
                v-if="node_level<scope.row.node_level  && !readonly"
                v-model="scope.row.report_num"
              ></el-input>
              <span v-else>{{scope.row.report_num}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="visit_num" label="来访(组)">
            <template slot-scope="scope">
              <el-input
                type="number"
                v-only-number="{min:0}"
                @change="setSum(scope.row)"
                v-if="node_level<scope.row.node_level && !readonly"
                v-model="scope.row.visit_num"
              ></el-input>
              <span v-else>{{scope.row.visit_num}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="little_num" label="小卡(组)">
            <template slot-scope="scope">
              <span>{{scope.row.little_num || 0}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="little_per" label="小卡率(%)">
            <template slot-scope="scope">
              <el-input
                type="number"
                v-only-number="{min:0,precision:2}"
                @change="setSum(scope.row)"
                v-if="node_level<scope.row.node_level && !readonly"
                v-model="scope.row.little_per"
              ></el-input>
              <span v-else>{{isNaN(scope.row.little_per)?0:scope.row.little_per | fixed}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="big_num" label="大卡(组)">
            <template slot-scope="scope">
              <span>{{scope.row.big_num || 0}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="big_per" label="大卡率(%)">
            <template slot-scope="scope">
              <el-input
                type="number"
                v-only-number="{min:0,precision:2}"
                @change="setSum(scope.row)"
                v-if="node_level<scope.row.node_level && !readonly"
                v-model="scope.row.big_per"
              ></el-input>
              <span v-else>{{isNaN(scope.row.big_per)?0:scope.row.big_per | fixed}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="sub_num" label="认购(套)">
            <template slot-scope="scope">
              <el-input
                type="number"
                v-only-number="{min:0}"
                @change="setSum(scope.row)"
                v-if="node_level<scope.row.node_level && !readonly"
                v-model="scope.row.sub_num"
              ></el-input>
              <span v-else>{{scope.row.sub_num}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="make_per" label="成交率(%)">
            <template slot-scope="scope">{{isNaN(scope.row.make_per)?0:scope.row.make_per | fixed}}</template>
          </el-table-column>
        </el-table>
      </div>
      <div class="come" v-show="isCheck" id="come_">
        <p class="bold">变更来访周拆分</p>
        <el-table
          :data="comeDataCopy"
          :span-method="mergeSpan"
          border
          :header-cell-style="{background:'#F5F7FA',color:'#666'}"
          style="width: 100%"
        >
          <el-table-column label="周期" width="160" prop="week" align="center"></el-table-column>
          <el-table-column align="center" width="200" prop="day_date" label="日期"></el-table-column>
          <el-table-column align="center" prop="plan_add" label="计划新增(组)">
            <template slot-scope="scope">
              <!-- <span v-if="scope.row.week=='完整波段'">{{allSum}}</span> -->
              <!-- <span v-else>{{scope.row.plan_add}}</span> -->
              <el-input
                v-if="scope.row.isWrite==1&&scope.row.week!=='完整波段'  && !readonly "
                v-model="scope.row.plan_add"
                @input.native="scope.row.plan_add=parseInt(scope.row.plan_add)"
              ></el-input>
              <span v-else-if="scope.row.week=='完整波段' ">{{come_sum}}</span>
              <span v-else>{{scope.row.plan_add}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="plan_total" label="计划累计(组)">
            <template slot-scope="scope">
              <!-- <el-input v-if="scope.row.isWrite==1&&scope.row.week!=='完整波段'" v-model="scope.row.plan_total"></el-input> -->
              <span>{{scope.row.plan_total | fixed}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="plan_task_per" label="计划阶段任务占比(%)">
            <template slot-scope="scope">
              <!-- <el-input v-if="scope.row.isWrite==1&&scope.row.week!=='完整波段'" v-model="scope.row.plan_task_per"></el-input> -->
              <span>{{scope.row.plan_task_per | fixed}}</span>
            </template>
          </el-table-column>
        </el-table>
        <span style="color:red;font-size:14px;">注：因四舍五入，计划阶段任务占比会存在合计值与100%有偏差。</span>
      </div>
      <div class="card" id="card" v-show="isCheck">
        <p class="bold">办卡方式</p>
        <el-form class="cardForm" :model="cardForm" ref="cardForm" label-width="60px">
          <el-form-item label="小卡" prop="small">
            <el-input
              type="textarea"
              show-word-limit
              maxlength="100"
              v-model="cardForm.little_way"
              v-if="!readonly"
            ></el-input>
            <span v-else>{{cardForm.little_way}}</span>
          </el-form-item>
          <el-form-item label="大卡" prop="big">
            <el-input
              type="textarea"
              show-word-limit
              maxlength="100"
              v-model="cardForm.big_way"
              v-if="!readonly"
            ></el-input>
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
            :header-cell-style="{background:'#F5F7FA',color:'#666'}"
          >
            <el-table-column prop="type" label="附件名称" align="left" width="200"></el-table-column>
            <el-table-column prop="name" label="附件" align="left">
              <template slot-scope="scope">
                <a :href="local+scope.row.url">{{scope.row.name}}</a>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120" align="center">
              <template slot-scope="scope">
                <div class="fileBox" v-if="scope.$index<accessoryData.length-1">
                  <el-upload
                    v-if="!readonly&&!scope.row.name"
                    :on-exceed="exceed"
                    :action="action"
                    :data="{'filePath':'salesOffice','bizID':'','orderIndex':scope.$index}"
                    :on-success="fileSuccess"
                    :file-list="fileList__[scope.$index]"
                    :on-remove="fileRemove"
                    :on-error="fileError"
                  >
                    <el-button type="text">{{scope.row.handle}}</el-button>
                  </el-upload>
                  <el-button
                    type="text"
                    v-if="!readonly&&scope.row.name"
                    @click="delFielList(scope.$index)"
                  >删除</el-button>
                </div>
                <div class="fileBox" v-else>
                  <el-upload
                    :action="action"
                    :on-success="fileSuccess"
                    :data="{'filePath':'salesOffice','bizID':'','orderIndex':scope.$index}"
                    :on-remove="fileRemove"
                    :on-error="fileError"
                  >
                    <el-button v-if="!readonly" type="text">+{{scope.row.handle}}</el-button>
                  </el-upload>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- </el-tab-pane> -->
      <!-- </el-tabs> -->
    </div>
    <div class="bottom" v-if="isType!='view'">
      <el-button
        type="primary"
        v-show="$store.state.user.userPower.includes('提交审批')"
        v-if="!readonly"
        @click="update('1')"
      >提交审批</el-button>
      <el-button v-if="!readonly" @click="update('0')">保存</el-button>
      <el-button v-if="isShowKS" @click="update('1',true)">快速审批</el-button>
    </div>
  </div>
</template>
<script>
import {
  selectNodePlan,
  updateNodePlan,
  forMtstartThreeAndTwo,
  get
} from "@/api/firstPlan";

import { toHistoryUrl, queryFlowId } from "@/api/offerFlow.js";

export default {
  data() {
    return {
      ref: null,
      firstEl: true,
      isType: "",
      activeTab: "1",
      isCheck: false,
      isShowKS: location.origin.includes("uat"),
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
        // {
        //   type: "开盘前两个月清项清单",
        //   handle: "上传"
        // },
        {
          type: "",
          handle: "其他上传"
        }
      ],
      come_Data: [],
      versionsList: [],
      allSum: 0,
      readonly: true,
      isKSAP: false
    };
  },
  components: {
    navbarLink: () => import("./components/navbarLink")
  },
  created() {
    if (this.$route.query.disabled) {
      this.readonly = true;
    }
    this.reload();
    // this.changeFlowId();
  },
  filters: {
    fixed: function(data) {
      if (!data && data !== 0) {
        return "";
      } else if (isNaN(data)) {
        return "";
      } else {
        // return parseInt(data);
        return data.toFixed(2);
      }
    },
    fixedPercent: function(data) {
      if (!data && data !== 0) {
        return "";
      } else if (isNaN(data)) {
        return "";
      } else {
        // return parseInt(data);
        return data.toFixed(2) + "%";
      }
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
    locals() {
      let host;
      if (location.origin.includes("test")) {
        host = "https://salesmgt-test-api.cifi.com.cn";
      } else if (location.origin.includes("uat")) {
        host = "https://salesmgt-uat-api.cifi.com.cn";
      } else {
        host = "https://salesmgt-api.cifi.com.cn";
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
      console.log(this.come_Data, "......>");
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
      // let sum =arr[arr.length-1].plan_total
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
        // console.log(a, "12121212");
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
    toPreview() {
      queryFlowId({}, this.versions).then(res => {
        if (res.code == 200 && res.data) {
          if (res.data.flow_status == 7) {
            this.isShowDiscard = false;
          }
          this.flow_id = res.data.flow_id;
          toHistoryUrl({
            proInstId: res.data.flow_id
          }).then(res => {
            window.open(res.data);
          });
        }
      });
    },
    changeFlowId() {
      queryFlowId({}, this.versions).then(res => {
        if (res.code == 200 && res.data) {
          if (res.data.flow_status == 7) {
            this.isShowDiscard = false;
          }
          this.flow_id = res.data.flow_id;
        }
      });
    },
    ksap() {
      //快速审批

      forMtstartThreeAndTwo({
        flow_id: this.versions
      }).then(res => {
        var hht =
          this.local +
          "/#/firstPlanPreview?BOID=" +
          res.result.result.codeBOID +
          "&t=1585017217401&isKSAP=1";
        window.open(hht);
      });
    },
    changeVersion() {
      console.log(this.versions);
      this.reload();
      // this.changeFlowId();
    },
    tabClick(tab, event) {
      console.log(tab);
    },
    fileRemove(file, fileList) {
      console.log(file, "this.fileList ");
    },
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
    fileError() {
      this.$message.error("上传失败");
    },
    exceed(files, fileList) {
      this.$message.warning(`当前限制选择1个文件`);
    },
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
      selectNodePlan(obj).then(res => {
        if (res.code == 0) {
          this.isShowVersion = res.result.judgeVersion == 1 ? true : false;
          this.comeData = res.result.Week.concat();
          this.come_Data = [...res.result.WeekWrite].concat();
          this.nodeData = res.result.NodePlan.concat();
          this.NodePlanWrite = res.result.NodePlanWrite.concat();
          this.versionsList = res.result.flow.concat();
          if (this.nodeData.length > 1) {
            this.createTime = this.nodeData[0].create_time + " 06:30:00";
          }
          console.log(this.createTime);
          if (res.result.flow.length > 0) {
            this.versions = res.result.flow[0].flow_id;
            if (res.result.flow[0].approval_stuat) {
              this.readonly =
                res.result.flow[0].approval_stuat == 4 ||
                res.result.flow[0].approval_stuat == 3 ||
                res.result.flow[0].approval_stuat == 7
                  ? true
                  : false;
            } else {
              this.readonly = false;
            }
          }
          if (
            res.result.flow.length == 0 ||
            res.result.flow[0].approval_stuat == 10
          ) {
            this.readonly = false;
          }

          if (this.$route.query.disabled) {
            this.readonly = true;
          }
          this.isCheck = res.result.change == 1 ? true : false;
          this.cardForm = {
            big_way: this.nodeData[0].big_way,
            little_way: this.nodeData[0].little_way
          };

          let arr5 = res.result.fileList;
          this.accessoryData = [
            // {
            //   type: "开盘前两个月清项清单",
            //   handle: "上传",
            //   id: "",
            //   name: "",
            //   url: ""
            // },
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
    scrollLink(ev, id) {
      this.firstEl = false;
      id = id.substring(1, id.length);
      this.ref = ev.target.className;
      // document.getElementById(id).scrollIntoView({block:'end',behavior: 'smooth'});
      document.querySelector("#containter").scrollTop =
        document.getElementById(id).offsetTop - 200;
    },
    createVersion() {
      this.newVersionFlag = true;
      this.isShowVersion = false;
      this.reload("1");
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
    update(update, isksap = false) {
      if (isksap) {
        this.isKSAP = true;
      }
      this.comeData.forEach((item, index) => {
        this.comeDataCopy[index].bias_cause = item.bias_cause;
      });
      let obj = {
        plan_id: this.$route.query.plan_id,
        node_level: this.$route.query.node_level,
        plan_node_id: this.$route.query.plan_node_id,
        NodePlan: this.NodePlanWrite,
        Week: this.comeDataCopy,
        isUpdate: update,
        change: this.isCheck ? "1" : "0",
        fileList: this.accessoryData
      };
      obj.NodePlan[0].big_way = this.cardForm.big_way;
      obj.NodePlan[0].little_way = this.cardForm.little_way;
      if (!this.newVersionFlag) {
        obj.flow_id = this.versions;
      }
      obj.fileList = this.accessoryData;

      //必填校验
      if (update == 1) {
        if (this.isCheck) {
          console.log(obj);
          let nodeflag = true;
          let nodeCheckList = obj.NodePlan.filter(item => item.level == 1);
          let nodeNameList = [
            "big_num",
            "little_num",
            "report_num",
            "sub_num",
            "visit_num"
          ];
          nodeCheckList.forEach(item => {
            nodeNameList.forEach(name => {
              if (!item[name] && item[name] !== 0 && nodeflag) {
                nodeflag = false;
                return;
              }
            });
          });
          console.log(nodeCheckList);
          if (!nodeflag) {
            this.$message({
              type: "error",
              message: "变更节点客储计划必填项未填写"
            });
            return;
          }
          let weekflag = true;
          obj.Week.forEach(item => {
            if (!item["plan_add"] && item["plan_add"] !== 0 && weekflag) {
              weekflag = false;
              return;
            }
          });
          if (!weekflag) {
            this.$message({
              type: "error",
              message: "变更来访周拆分必填项未填写"
            });
            return;
          }
        }
        //附件上传
        if (
          this.accessoryData.some(
            i => i.type && i.type !== "其他上传" && !i.name
          )
        ) {
          this.$message({
            type: "error",
            message: "必须上传附件清单"
          });
          return;
        }
      }
      updateNodePlan(obj).then(res => {
        console.log(res);
        this.newVersionFlag = false;
        this.versionsList = res.result;
        this.versions = res.result[0].flow_id;
        if (update == "0") {
          this.$message.success("保存草稿成功");
          this.reload();
        } else if (update == "1") {
          this.reload();
          this.approve();
          this.$message.success("提交审批成功");
        }
      });
    },
    approve() {
      forMtstartThreeAndTwo({
        flow_id: this.versions
      }).then(res => {
        if (this.isKSAP) {
          var hht =
            this.local +
            "/#/firstPlanPreview?BOID=" +
            res.result.result.codeBOID +
            "&t=1585017217401&isKSAP=1";
          window.open(hht);
        } else {
          get(
            `/Workflow/MTStart2.aspx?BSID=FP&BTID=${res.result.result.BTID}&BOID=${res.result.result.codeBOID}&UserID=${res.result.result.bkUserID}&LoginKey=${res.result.result.loginKey}`
          ).then(res => {
            if (res.code == 200 || res.result.code == 200) {
              window.open(res.data);
            } else {
              this.$message.error(res.messages || res.result.messages);
            }
          });
        }
        this.$router.push("planWrite");
      });
    },
    setSum(row) {
      if (row["visit_num"]) {
        this.$set(
          row,
          "little_num",
          isNaN((row["little_per"] * row["visit_num"]) / 100)
            ? 0
            : ((row["little_per"] * row["visit_num"]) / 100).toFixed(2)
        );
        this.$set(
          row,
          "make_per",
          isNaN((row["sub_num"] / row["visit_num"]) * 100)
            ? 0
            : ((row["sub_num"] / row["visit_num"]) * 100).toFixed(2)
        );
        this.$set(
          row,
          "big_num",
          isNaN((row["big_per"] * row["visit_num"]) / 100)
            ? 0
            : ((row["big_per"] * row["visit_num"]) / 100).toFixed(2)
        );
      }
    },
    delFielList(idx) {
      // if (idx == 0) {
      //   this.accessoryData.splice(idx, 1, {
      //     type: "售楼处开放",
      //     handle: "上传"
      //   });
      // } else {
      this.accessoryData.splice(idx, 1);
      // }
    }
  }
};
</script>

<style lang="less" scoped>
.twoMonth {
  height: calc(100vh - 40px);
  overflow: hidden;
  padding-bottom: 60px;
  .fileBox {
    position: relative;
    left: -18px;
  }
  .bold {
    color: #333333 !important;
    font-weight: 700 !important;
    font-family: PingFangSC-Medium, PingFang SC;
  }
  ::v-deep input::-webkit-outer-spin-button,
  ::v-deep input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  ::v-deep .el-upload-list {
    display: none;
  }
  ::v-deep input[type="number"] {
    -moz-appearance: "textfield";
  }
  ::v-deep .el-form {
    width: 40%;
  }
  .headerFixed {
    width: 100%;
    position: fixed;
    height: 100px;
    background: #fff;
    top: 40px;
    z-index: 10;

    .top {
      ::v-deep .el-form {
        width: 40%;
      }
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
      .right-btn {
        position: fixed;
        right: 0;
        z-index: 10;
      }
    }
    .isViewFixed {
      position: absolute;
      left: auto;
      z-index: 12;
      width: 100%;
      top: 50px;
    }
  }
  .isView {
    margin-top: 55px;
  }
  .tabsFlxed {
    height: 100px;
    background: #fff;
    ::v-deep .is-active::after {
      content: "";
      display: block;
      position: absolute;
      width: 26px;
      background: #2761ff;
      bottom: 1px;
      left: 50%;
      height: 3px;
      transform: translateX(-50%);
    }
    ::v-deep .is-active {
      font-weight: 700;
    }
    span {
      margin: 0 20px;
      cursor: pointer;
    }
    .isActive {
      color: #2761ff;
      font-weight: 700;
    }
  }
  ::v-deep .el-tabs__active-bar {
    display: none;
  }
  .containter {
    overflow-y: auto;
    height: calc(100vh - 160px);
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    padding-bottom: 100px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    border: 1px solid rgba(216, 216, 216, 0.34);
    ::v-deep .is-active {
      color: #2761ff;
    }
    .link {
      ::v-deep .el-button {
        color: #2761ff;
      }
    }
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
    position: fixed;
    z-index: 100;
    width: 100%;
    bottom: 0px;
    left: 50%;
    width: 100%;
    transform: translateX(-50%);
    ::v-deep .el-button {
      height: 30px;
    }
  }
  ::v-deep .el-input__inner {
    width: 210px;
  }
  ::v-deep .el-table th {
    background: rgba(246, 248, 253, 1) !important;
  }
  ::v-deep .el-button--text {
    color: #2761ff !important;
  }
  ::v-deep .el-button--text {
    color: #2761ff !important;
  }
  ::v-deep .el-input__inner {
    color: #333333 !important;
    font-size: 14px !important;
  }
  ::v-deep .el-tabs__nav-scroll {
    margin-left: 20px !important;
  }
}
</style>
