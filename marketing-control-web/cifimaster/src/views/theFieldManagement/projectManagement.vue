<template>
  <div class="app-container">
    <div class="container-header">
      <div class="rule-nav rule-navtitle">
        项目保护规则
        <!--<span>说明：规则修改后，已过期的用户不受新规则影响，保护期内客户按新规则计算</span>-->
      </div>

      <div class="agent" style="display: none">
        <div class="rule-zindex">
          <el-row :gutter="20">
            <el-col :span="10">
              <div class="grid-content bg-purple rule-select">
                <div>老业主再次报备：</div>
                <div>
                  <el-select v-model="oldOwnerReport" placeholder>
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      class="optionvule"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </el-col>

            <el-col :span="10">
              <div class="grid-content bg-purple rule-select">
                <div>客户再次报备：</div>
                <div>
                  <el-select v-model="ownerAgain" placeholder>
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      class="optionvule"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 自拓团队 -->

      <div class="fold-rule e-el-row" :style="height">
        <div class="rule-introduce">置业顾问</div>
        <div class="grid-content bg-purple fold-rules">
          <!--<el-collapse v-model="activeNames" @change="handleChange" height="100px">-->
          <!--<el-collapse-item title name="1">-->
          <div>
            <el-row :gutter="20">
              <el-col :span="7">
                <div class="grid-content bg-purple rule-select">
                  <div>报备保护期（小时）：</div>
                  <div>
                    <el-input v-model="reportExpireDays" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="7">
                <div class="grid-content bg-purple rule-select">
                  <div>报备预警（小时）：</div>
                  <div>
                    <el-input v-model="reportDaysWarning" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="7">
                <div class="grid-content bg-purple rule-select">
                  <div>认购逾期（天）：</div>
                  <div>
                    <el-input v-model="visitExpireDays" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="7">
                <div class="grid-content bg-purple rule-select">
                  <div>认购预警（天）：</div>
                  <div>
                    <el-input v-model="visitingWarning" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="7">
                <div class="grid-content bg-purple rule-select">
                  <div>签约预警（天）：</div>
                  <div>
                    <el-input v-model="validityOfWarning" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="7">
                <div class="grid-content bg-purple rule-select">
                  <div>回款预警（天）：</div>
                  <div>
                    <el-input v-model="remittanceWarning" placeholder="请输入内容"></el-input>
                  </div>
                  <!-- 说明备注 -->
                </div>
              </el-col>
              <el-col :span="7">
                <div class="grid-content bg-purple rule-select">
                  <div>跟进逾期（天）：</div>
                  <div>
                    <el-input v-model="theNextVisitFollowupExpireDays" placeholder="请输入内容"></el-input>
                  </div>
                  <!-- 说明备注 -->
                </div>
              </el-col>
              <el-col :span="7">
                <div class="grid-content bg-purple rule-select">
                  <div>跟进预警（天）：</div>
                  <div>
                    <el-input v-model="followupExpireDaysWarning" placeholder="请输入内容"></el-input>
                  </div>
                  <!-- 说明备注 -->
                </div>
              </el-col>
              <el-col :span="7" style="display:none">
                <div class="grid-content bg-purple rule-select">
                  <div>跟进逾期后强制回收客户：</div>
                  <div>
                    <el-select v-model="isFollowFouceRecycle" placeholder>
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        class="optionvule"
                      ></el-option>
                    </el-select>
                  </div>
                </div>
              </el-col>
              <!-- 保存取消 -->
              <div class="form-btn" style="padding-left:8px;box-sizing:boder-box;">
                <el-row>
                  <el-button type="primary" @click="updateRule">保存</el-button>
                  <!--<el-button type="info" plain>历史</el-button>-->
                </el-row>
              </div>
            </el-row>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { channelRule, updateChannelRule } from "@/api/table";

export default {
  filters: {},
  data() {
    return {
      height: {
        height: ""
      },
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      activeNames: ["0"],
      options: [
        {
          value: 0,
          label: "是"
        },
        {
          value: 1,
          label: "否"
        }
      ],
      standbyMode: [
        {
          value: 0,
          label: "隐号"
        },
        {
          value: 1,
          label: "全号"
        }
      ],
      isForceCustomer: "",
      isFouceRecycle: "", // 是否强制回收客户
      theNextVisitFollowupExpireDays: "", // 跟进逾期
      followupExpireDaysWarning: "", // 跟进预警
      isFollowFouceRecycle: "", // 跟进逾期后强制回收客户
      reportDaysWarning: "", // 报备预警
      reportExpireDays: "", // 报备保护期
      visitExpireDays: "", // 认购逾期
      remittanceWarning: "", // 回款预警
      validityOfWarning: "", // 签约预警
      oldOwnerReport: "", //  老业主是否可以再次报备
      ownerAgain: "", // 老客户再次报备
      visitingWarning: "", // 认购预警
      tableData: [
        {
          ids: "1",
          date: "2016-05-02",
          name: "合富置业",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          ids: "2",
          date: "2016-05-04",
          name: "房博士",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          ids: "3",
          date: "2016-05-01",
          name: "拓客-分销",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          ids: "4",
          date: "2016-05-03",
          name: "广州家家顺",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      list: {},
      pageSize: 20,
      currentPage: 1,
      projectId: localStorage.getItem("pojid"),
      userid: localStorage.getItem("id")
    };
  },
  created() {
    this.hh();
    this.gettableDataList();
  },
  methods: {
    // 获取高度
    hh() {
      this.height.height = window.innerHeight - 156 + "px";
      // this.heightleft.height = window.innerHeight - 500 + "px";
      // console.log(this.height.height)
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
      this.gettableDataList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.gettableDataList();
      console.log(`当前页: ${val}`);
    },
    gettableDataList() {
      this.loading = true;
      channelRule({
        projectId: this.projectId,
        sourceType: "2",
        projectOrgCategory: "",
        projectOrgId: ""
      }).then(res => {
        console.log(res.result);
        if (res.result != null && res.result != "") {
          sessionStorage.setItem("updateId", res.result.id);
          sessionStorage.setItem("modifyType", "modify");
          if (
            res.result.isForceCustomer != "" &&
            res.result.isForceCustomer != ""
          ) {
            this.isForceCustomer = res.result.isForceCustomer;
          } else {
            this.isForceCustomer = 0;
          }
          this.isFouceRecycle = res.result.isFouceRecycle;

          if (res.result.standbyMode != null && res.result.standbyMode !== "") {
            this.standbyMode = res.result.standbyMode;
          } else {
            this.standbyMode = 1;
          }

          if (
            res.result.reportExpireDays != null &&
            res.result.reportExpireDays != ""
          ) {
            this.reportExpireDays = res.result.reportExpireDays;
          } else {
            this.reportExpireDays = 0;
          }
          if (
            res.result.reportDaysWarning != null &&
            res.result.reportDaysWarning !== ""
          ) {
            this.reportDaysWarning = res.result.reportDaysWarning;
          } else {
            this.reportDaysWarning = 0;
          }

          if (
            res.result.visitExpireDays != null &&
            res.result.visitExpireDays !== ""
          ) {
            this.visitExpireDays = res.result.visitExpireDays;
          } else {
            this.visitExpireDays = 0;
          }
          if (
            res.result.remittanceWarning != null &&
            res.result.remittanceWarning != ""
          ) {
            this.remittanceWarning = res.result.remittanceWarning;
          } else {
            this.remittanceWarning = 0;
          }
          this.theNextVisitFollowupExpireDays =
            res.result.theNextVisitFollowupExpireDays;
          if (
            res.result.theNextVisitFollowupExpireDays != null &&
            res.result.theNextVisitFollowupExpireDays != ""
          ) {
            this.theNextVisitFollowupExpireDays =
              res.result.theNextVisitFollowupExpireDays;
          } else {
            this.theNextVisitFollowupExpireDays = 0;
          }
          if (
            this.isFollowFouceRecycle != null &&
            this.isFollowFouceRecycle != ""
          ) {
            this.isFollowFouceRecycle = res.result.isFollowFouceRecycle;
          } else {
            this.isFollowFouceRecycle = 0;
          }
          if (
            res.result.validityOfWarning != null &&
            res.result.validityOfWarning != ""
          ) {
            this.validityOfWarning = res.result.validityOfWarning;
          } else {
            this.validityOfWarning = 0;
          }
          if (
            res.result.oldOwnerReport != null &&
            res.result.oldOwnerReport != ""
          ) {
            this.oldOwnerReport = res.result.oldOwnerReport;
          } else {
            this.oldOwnerReport = 0;
          }
          if (res.result.ownerAgain != null && res.result.ownerAgain != "") {
            this.ownerAgain = res.result.ownerAgain;
          } else {
            this.ownerAgain = 0;
          }
          if (
            res.result.visitingWarning != null &&
            res.result.visitingWarning != ""
          ) {
            this.visitingWarning = res.result.visitingWarning;
          } else {
            this.visitingWarning = 0;
          }
          if (
            res.result.followupExpireDaysWarning != null &&
            res.result.followupExpireDaysWarning
          ) {
            this.followupExpireDaysWarning =
              res.result.followupExpireDaysWarning;
          } else {
            this.followupExpireDaysWarning = 0;
          }

          this.loading = false;
        } else {
          sessionStorage.setItem("modifyType", "addNew");
          sessionStorage.setItem("updateId", "");
          this.isForceCustomer = 0;
          this.isFouceRecycle = 0;
          this.standbyMode = 1;
          this.reportExpireDays = 0;
          this.reportDaysWarning = 0;
          this.visitExpireDays = 0;
          this.isFollowFouceRecycle = 0;
          this.oldOwnerReport = 0;
          this.ownerAgain = 0;
          this.visitingWarning = 0;
          this.followupExpireDaysWarning = 0;
          this.remittanceWarning = 0;
          this.theNextVisitFollowupExpireDays = 0;
          this.validityOfWarning = 0;
        }
        // this.list = res.result;
      });
    },
    updateRule: function() {
      let reg = /^[0-9]*$/;
      if(!reg.test(this.reportExpireDays) || !reg.test(this.reportDaysWarning) || !reg.test(this.visitExpireDays)
        || !reg.test(this.visitingWarning) || !reg.test(this.validityOfWarning) || !reg.test(this.remittanceWarning)
        || !reg.test(this.theNextVisitFollowupExpireDays) || !reg.test(this.followupExpireDaysWarning)
        || !reg.test(this.isFollowFouceRecycle)|| !reg.test(this.oldOwnerReport)|| !reg.test(this.ownerAgain)){
        this.$message({
          message: "规则请输入正整数！",
          type: "warning"
        });
        return;
      }

      if(this.reportDaysWarning>this.reportExpireDays){
        this.$message({
          message: "报备预警时间必须小于报备时间！",
          type: "warning"
        });
        return;
      }

      if(this.visitingWarning>this.visitExpireDays){
        this.$message({
          message: "认购逾期预警时间必须小于认购逾期时间！",
          type: "warning"
        });
        return;
      }

      if(this.followupExpireDaysWarning>this.theNextVisitFollowupExpireDays){
        this.$message({
          message: "跟进逾期预警时间必须小于跟进逾期时间！",
          type: "warning"
        });
        return;
      }


      updateChannelRule({
        one: {
          projectId: this.projectId,
          isAllowRepeatReport: "0",
          sourceType: "2",
          id: sessionStorage.getItem("updateId"),
          reportExpireDays: this.reportExpireDays,
          reportDaysWarning: this.reportDaysWarning,
          visitExpireDays: this.visitExpireDays,
          visitingWarning: this.visitingWarning,
          validityOfWarning: this.validityOfWarning,
          remittanceWarning: this.remittanceWarning,
          theNextVisitFollowupExpireDays: this.theNextVisitFollowupExpireDays,
          followupExpireDaysWarning: this.followupExpireDaysWarning,
          isFollowFouceRecycle: this.isFollowFouceRecycle,
          oldOwnerReport: this.oldOwnerReport,
          ownerAgain: this.ownerAgain,
          standbyMode: 1,
          projectOrgCategory: 1
        },
        two: [],
        entrance: "site",
        modifyType: sessionStorage.getItem("modifyType"), // "modeify",
        userId: this.userid,
        projectId: this.projectId
      }).then(res => {
        this.$message({
          message: res.result.errmsg,
          type: "success"
        });
        _paq.push(['trackEvent', '点击', '编辑', '保护规则---案场参数修改保护规则']);
      });
    }
  }
};
</script>
<style src="@/assets/css/rules.css">
</style>
