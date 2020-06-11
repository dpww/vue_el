<template>
  <div class="app-container">
    <div class="container-header">
      <!-- <div class="rule-nav">项目保护规则 <span>说明：规则修改后，已过期的用户不受新规则影响，保护期内客户按新规则计算</span></div> -->
      <div class="agent" style="display: none;">
        <div class="rule-zindex">
          <el-row :gutter="20">
            <el-col :span="10">
              <div class="grid-content bg-purple rule-select">
                <div>状态逾期后强制回收客户：</div>
                <div>
                  <el-select v-model="isFouceRecycle" placeholder>
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      class="optionvule"
                    />
                  </el-select>
                </div>
              </div>
            </el-col>
            <el-col :span="14">
              <div
                class="grid-content bg-purple rule-select"
                style="line-height:32px;font-size:12px;color:#666;"
              >强制回收客户后，原拓客人员无法再操作或查阅客户</div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 自拓团队 -->

      <div class="fold-rule" style="display:none">
        <div class="grid-content bg-purple fold-rules">
          <el-collapse v-model="activeNames" height="100px" @change="handleChange">
            <el-collapse-item title name="1">
              <div>
                <el-row :gutter="20">
                  <el-col :span="7">
                    <div class="grid-content bg-purple rule-select">
                      <div class="rule-div-input">防截客（小时）：</div>
                      <div>
                        <el-input v-model="cutGuestInvite" placeholder="请输入内容" />
                      </div>
                      <!-- 说明备注 -->
                      <!--<div class="size-font">可被自拓人员再次报备</div>-->
                    </div>
                  </el-col>
                  <el-col :span="7">
                    <div class="grid-content bg-purple rule-select">
                      <div>报备保护期（小时）：</div>
                      <div>
                        <el-input v-model="reportExpireDays" placeholder="请输入内容" />
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="7">
                    <div class="grid-content bg-purple rule-select">
                      <div>报备预警（小时）：</div>
                      <div>
                        <el-input v-model="reportDaysWarning" placeholder="请输入内容" />
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="7">
                    <div class="grid-content bg-purple rule-select">
                      <div>渠道保护期（天）：</div>
                      <div>
                        <el-input v-model="channelProtectionPeriod" placeholder="请输入内容" />
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="7">
                    <div class="grid-content bg-purple rule-select">
                      <div>渠道保护期预警（天）：</div>
                      <div>
                        <el-input v-model="channelProtectionPeriodWarning" placeholder="请输入内容" />
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>

        <!-- 状态逾期后强制回收客户 -->
        <div class="rule-zindex" style="display:none;">
          <el-row :gutter="20">
            <el-col :span="10">
              <div class="grid-content bg-purple rule-select">
                <div>允许重复报备客户：</div>
                <div>
                  <el-select v-model="isAllowRepeatReport" placeholder>
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      class="optionvule"
                    />
                  </el-select>
                </div>
                <!--<div class="size-font">* 强制回收客户后，原拓客人员无法再操作或查阅客户</div>-->
              </div>
            </el-col>
            <el-col :span="10">
              <div class="grid-content bg-purple rule-select">
                <div>允许自渠报备业主：</div>
                <div>
                  <el-select v-model="isForceCustomer" placeholder>
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      class="optionvule"
                    />
                  </el-select>
                </div>
                <!--<div class="size-font">* 可被自渠人员再次报备</div>-->
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple rule-select">
                <div class="size-font">被自渠人员再次报备</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <!-- 代理团队 -->

      <div class="project-input">
        <div class="rule-introduce">自渠团队</div>
         <div class="rule-nav">项目保护规则 <span>说明：只有防截客时间支持小数计算</span></div>
        <el-form ref="form" :model="form" label-width="170px">
          <el-row :gutter="20">
            <el-col :span="7">
              <div class="grid-content bg-purple">
                <el-form-item label="防截客（小时）：">
                  <el-input v-model="cutGuestInvite" placeholder="请输入内容" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                <el-form-item label="报备保护期（小时）：">
                  <el-input v-model="reportExpireDays" placeholder="请输入内容" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                <el-form-item label="报备预警（小时）：">
                  <el-input v-model="reportDaysWarning" placeholder="请输入内容" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                <el-form-item label="渠道保护期（天）：">
                  <el-input v-model="channelProtectionPeriod" placeholder="请输入内容" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                <el-form-item label="渠道保护期预警（天）：">
                  <el-input v-model="channelProtectionPeriodWarning" placeholder="请输入内容" />
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div class="project-input" style="margin-top:12px;">
        <div class="rule-introduce">代理团队</div>

        <el-form ref="form" :model="form" label-width="170px">
          <el-row :gutter="20">
            <el-col :span="7">
              <div class="grid-content bg-purple">
                <el-form-item label="报备模式：">
                  <el-select v-model="standbyMode" placeholder>
                    <el-option
                      v-for="item in standbyModes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      class="optionvule"
                    />
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <!-- 表格 -->
      <div class="e-el-row" :style="height">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-table :data="tableData" class="table-list etable" :style="heightleft">
                <el-table-column label="代理名称" width="180">
                  <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                      <p>代理名称: {{ scope.row.companyName }}</p>
                      <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.companyName }}</el-tag>
                      </div>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column label="有效开始时间">
                  <template slot-scope="scope">
                    <span>{{ scope.row.startTime }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="有效结束时间">
                  <template slot-scope="scope">
                    <span>{{ scope.row.endTime }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="防截客时间（小时）">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.cutGuestDrainage" />
                  </template>
                </el-table-column>

                <el-table-column label="报备保护期（小时）">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.reportExpireDays" />
                  </template>
                </el-table-column>

                <el-table-column label="报备预警（小时）">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.reportDaysWarning" />
                  </template>
                </el-table-column>

                <el-table-column label="渠道保护期（天）">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.channelProtectionPeriod" />
                  </template>
                </el-table-column>

                <el-table-column label="渠道预警（天）">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.channelProtectionPeriodWarning" />
                  </template>
                </el-table-column>

                <!-- <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
                </el-table-column>-->
              </el-table>
            </div>
          </el-col>
        </el-row>
        <div class="page-submit">
          <!-- 保存取消 -->
          <div class="form-btn">
            <el-row>
              <el-button type="primary" @click="updateRule">保存</el-button>
              <!--<el-button type="info" plain @click="">取消</el-button>-->
            </el-row>
          </div>
          <!-- 分页 -->
          <!--<div class="block">
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[2, 4, 8, 10,20]"
            :page-size="2"
            :pager-count="3"
            layout=" sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  channelRule,
  channelRuleOuterCanal,
  updateChannelRule
} from "@/api/table";

export default {
  filters: {},
  data() {
    return {
      height:{
        height:''
      },
      heightleft:{
        height:''
      },
      arry: [[]],
      activeNames: ["1"],
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
      standbyMode: "",
      standbyModes: [
        {
          value: 0,
          label: "隐号"
        },
        {
          value: 1,
          label: "全号"
        }
      ],
      isAllowRepeatReport: "", // 允许报备业主
      cutGuestInvite: "", // 自渠防截客
      CutGuestDrainage: "", // 外渠防截客
      is_rep: "", // 外渠允许报备业主
      isForceCustomer: "",
      inpt: "",
      isFouceRecycle: "", // 是否强制回收客户
      tsFollowFouceRecycle: "", // 跟进逾期后强制回收客户
      reportDaysWarning: "", // 报备预警
      reportExpireDays: "", // 报备保护期
      channelProtectionPeriod: "", // 渠道保护期
      channelProtectionPeriodWarning: "", // 渠道保护期预警
      tableData: [],
      currentPage: 1,
      pageSize: 2,
      total: 10,
      projectId: localStorage.getItem("pojid"),
      userid: localStorage.getItem("id")
    };
  },
  created() {
    this.hh();
    this.getCommonParams();
    this.gettableDataList();
  },
  methods: {
       // 获取高度
    hh() {
      this.height.height = window.innerHeight - 400 + "px";
      this.heightleft.height = window.innerHeight - 500 + "px";
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
    getCommonParams() {
      this.loading = true;
      channelRule({
        projectId: this.projectId,
        sourceType: "1",
        projectOrgCategory: "1",
        projectOrgId: ""
      }).then(res => {
        console.log(res.result);
        if (res.result != null && res.result != "") {
          sessionStorage.setItem("updateId", res.result.id);
          sessionStorage.setItem("modifyType", "modify");
          this.isForceCustomer = res.result.isForceCustomer;
          this.isFouceRecycle = res.result.isFouceRecycle;
          this.isAllowRepeatReport = res.result.isAllowRepeatReport;
          if (
            res.result.cutGuestInvite != null &&
            res.result.cutGuestInvite != ""
          ) {
            this.cutGuestInvite = res.result.cutGuestInvite;
          } else {
            this.cutGuestInvite = 0;
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
            res.result.reportDaysWarning != ""
          ) {
            this.reportDaysWarning = res.result.reportDaysWarning;
          } else {
            this.reportDaysWarning = 0;
          }
          if (
            res.result.channelProtectionPeriod != null &&
            res.result.channelProtectionPeriod != ""
          ) {
            this.channelProtectionPeriod = res.result.channelProtectionPeriod;
          } else {
            this.channelProtectionPeriod = 0;
          }
          if (
            res.result.channelProtectionPeriodWarning != null &&
            res.result.channelProtectionPeriodWarning != ""
          ) {
            this.channelProtectionPeriodWarning =
              res.result.channelProtectionPeriodWarning;
          } else {
            this.channelProtectionPeriodWarning = 0;
          }
          this.loading = false;
        } else {
          this.cutGuestInvite = 0;
          this.reportDaysWarning = 0;
          this.channelProtectionPeriod = 0;
          this.reportExpireDays = 0;
          this.channelProtectionPeriodWarning = 0;
          sessionStorage.setItem("modifyType", "addNew");
          sessionStorage.setItem("updateId", "");
        }
      });
    },
    gettableDataList() {
      channelRuleOuterCanal({
        projectId: this.projectId,
        projectOrgCategory: "7",
        size: this.pageSize,
        current: this.currentPage
      }).then(res => {
        console.log(res.result);
        if (res.result.length > 0) {
          this.total = res.result.total;
          if (
            res.result[0].isAllowRepeatReport != null &&
            res.result[0].isAllowRepeatReport != ""
          ) {
            this.is_rep = res.result[0].isAllowRepeatReport;
          } else {
            this.is_rep = 0;
          }
          if (
            res.result[0].standbyMode != null &&
            res.result[0].standbyMode != ""
          ) {
            this.standbyMode = res.result[0].standbyMode;
          } else {
            this.standbyMode = 0;
          }
          this.tableData = res.result;
        } else {
          this.is_rep = 0;
          this.standbyMode = 0;
        }
      });
    },
    updateRule: function() {
      let reg = /^\d+(\.\d+)?$/;
      if(!reg.test(this.cutGuestInvite)){
        this.$message({
          message: "规则请输入数字！",
          type: "warning"
        });
        return;
      }
      let reg2 = /^[0-9]*$/;
      if(!reg2.test(this.reportExpireDays) || !reg2.test(this.reportDaysWarning)
        || !reg2.test(this.channelProtectionPeriod) || !reg2.test(this.channelProtectionPeriodWarning)){
        this.$message({
          message: "规则请输入数字！",
          type: "warning"
        });
        return;
      }

      if(this.reportDaysWarning>this.reportExpireDays){
        this.$message({
          message: "报备预警时间必须小于报备保护期时间！",
          type: "warning"
        });
        return;
      }
      if(this.channelProtectionPeriodWarning>this.channelProtectionPeriod){
        this.$message({
          message: "渠道保护期预警时间必须小于渠道保护期时间！",
          type: "warning"
        });
        return;
      }

      let bol = true;
        this.tableData.forEach(item=>{
          console.log(item.cutGuestDrainage)
          if(!reg.test(item.cutGuestDrainage)){
            this.$message({
              message: "规则时间请输入数字！",
              type: "warning"
            });
            bol = false;
          }

          if(!reg2.test(item.reportDaysWarning) || !reg2.test(item.reportExpireDays)
            || !reg2.test(item.channelProtectionPeriod) || !reg2.test(item.channelProtectionPeriodWarning)){
            this.$message({
              message: "规则时间请输入数字！",
              type: "warning"
            });
            bol = false;
          }

          if(item.reportDaysWarning>item.reportExpireDays){
            this.$message({
              message: "报备预警时间必须小于报备保护期时间！",
              type: "warning"
            });
            bol = false;
          }

          if(item.channelProtectionPeriodWarning>item.channelProtectionPeriod){
            this.$message({
              message: "渠道保护期预警时间必须小于渠道保护期时间！",
              type: "warning"
            });
            bol = false;
          }

        });
      if(!bol) return;

      updateChannelRule({
        one: {
          projectId: this.projectId,
          sourceType: "1",
          id: sessionStorage.getItem("updateId"),
          isFouceRecycle: this.isFouceRecycle,
          isAllowRepeatReport: this.isAllowRepeatReport,
          reportExpireDays: this.reportExpireDays,
          reportDaysWarning: this.reportDaysWarning,
          channelProtectionPeriod: this.channelProtectionPeriod,
          channelProtectionPeriodWarning: this.channelProtectionPeriodWarning,
          isForceCustomer: this.isForceCustomer,
          cutGuestInvite: this.cutGuestInvite,
          cutGuestDrainage: 0,
          projectOrgCategory: "1"
        },
        two: this.tableData,
        entrance: "toker",
        modifyType: sessionStorage.getItem("modifyType"), // "modeify",
        userId: this.userid,
        projectId: this.projectId,
        standbyModeStandbyMode: this.standbyMode,
        isRep: this.is_rep
      }).then(res => {
        this.$message({
          message: res.result.errmsg,
          type: "success"
        });
        _paq.push(['trackEvent', '点击', '编辑', '保护规则---修改保护规则']);

      });
    }
  }
};
</script>
<style scoped>
.el-form-item {
  margin-bottom: 4px !important;
}
.project-input {
  clear: both;
  width: 100%;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 0 8px #ebeef5;
}
</style>
<style src="@/assets/css/rules.css" scoped>
</style>
