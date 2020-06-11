<template>
  <div class="areaWeeklyData app-container">
    <el-row class="container">
      <div class="top">
        <div class="top_l fl">营销周计划详情</div>
        <div class="top_r fr" v-if="$store.state.user.userPower.includes('导出数据')">
          <el-link
            class="outData"
            :href="exportTemp()"
            @click.prevent="exportMatomo"
            download="download"
          >导出数据</el-link>
        </div>
      </div>
    </el-row>
    <el-row class="container">
      <div class="areaWeeklyForm">
        <h3 class="weekTitle">
          {{weekStart|getYear}}{{weekStart|getMonthDay}}-{{weekEnd|getMonthDay}}周报
          <span>金额单位: (万元)</span>
        </h3>
        <el-checkbox
          v-if="$route.query.plan_status!=1&&$store.state.user.userPower.includes('复核')&&showCheckeds"
          style="float:right"
          v-model="isAllNow"
          @input="allSure"
        >{{"复核全选"}}</el-checkbox>

        <el-table
          :data="areaWeeklyData"
          row-key="id"
          style="width: 100%;min-height:200px;"
          :height="tableHeight"
          lazy
          :load="load"
          :default-expand-all="true"
          :tree-props="{children: 'children', hasChildren: 'hasChildren2'}"
          align="center"
        >
          <el-table-column
            prop="project_name"
            fixed
            label="事业部/项目"
            width="200"
            header-align="center"
          >
            <template slot-scope="scope">
              <a
                href="javascript:void(0);"
                style="color:#333"
                :title="scope.row.project_name"
              >{{scope.row.project_name}}</a>
            </template>
          </el-table-column>
          <el-table-column label="状态" fixed align="center" width="120" class="Color">
            <template slot-scope="scope">
              <!-- {{scope.row.plan_status}} -->
              <span v-if="scope.row.plan_status==-1" style="color:red">已驳回</span>
              <span v-if="scope.row.plan_status==0" style="color:red">未上报</span>
              <span v-if="scope.row.plan_status==1" style="color:green">已上报</span>
              <!-- <span v-if="scope.row.plan_status==2" style="color:green">区域已上报</span> -->
              <span v-if="scope.row.plan_status==2" style="color:green">已上报</span>
            </template>
          </el-table-column>
          <el-table-column prop="report_time" align="center" label="上报时间" width="100"></el-table-column>

          <el-table-column label="项目信息" align="center">
            <el-table-column label="项目编码" align="center" width="180">
              <template slot-scope="scope">
                <a
                  href="javascript:void(0);"
                  style="color:#333"
                  :title="scope.row.project_code"
                >{{scope.row.project_code}}</a>
              </template>
            </el-table-column>
            <el-table-column prop="trader_name" align="center" label="操盘手" width="100"></el-table-column>
            <el-table-column prop="islast" label="是否尾盘" align="center" width="80"></el-table-column>
            <el-table-column prop="issales_trade" label="是否我方营销操盘" align="center" width="140"></el-table-column>
          </el-table-column>
          <el-table-column
            prop="subscribe_price"
            align="center"
            label="上月未转签约的认购金额"
            header-align="center"
            width="110"
          ></el-table-column>
          <el-table-column label="目标" align="center">
            <el-table-column label="月度目标" align="center">
              <el-table-column prop="target_month_bearer" label="来人(组)" align="center" width="100"></el-table-column>
              <el-table-column
                prop="target_month_sign"
                label="签约金额"
                header-align="center"
                align="center"
                width="100"
              ></el-table-column>
            </el-table-column>
            <el-table-column :label="nowWeek+'目标'" align="center">
              <el-table-column prop="target_week_bearer" label="来人(组)" align="center" width="100"></el-table-column>
              <el-table-column
                prop="target_week_sign"
                label="签约金额"
                header-align="center"
                align="center"
                width="100"
              ></el-table-column>
            </el-table-column>
            <el-table-column prop="city" :label="nowWeek+'目标占比'" align="center">
              <el-table-column
                prop="target_week_bearer_per"
                label="来人占比"
                align="center"
                width="100"
              ></el-table-column>
              <el-table-column prop="target_week_sign_per" label="签约占比" align="center" width="80"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="完成情况" align="center">
            <el-table-column
              prop="fact_month_bearer_total"
              label="月度累计来人(组)"
              align="center"
              width="100"
            ></el-table-column>
            <el-table-column prop="fact_month_bearer_per" label="月度来人完成率" align="center" width="80"></el-table-column>
            <el-table-column
              prop="fact_week_bearer"
              :label="nowWeek+'来人(组)'"
              align="center"
              width="80"
            ></el-table-column>
            <el-table-column
              prop="fact_week_bearer_per"
              :label="nowWeek+'来人完成率'"
              align="center"
              width="80"
            ></el-table-column>
            <el-table-column
              prop="fact_month_sign"
              label="月度签约金额(系统签约)"
              header-align="center"
              align="center"
              width="130"
            ></el-table-column>
            <el-table-column prop="fact_month_sign_per" label="月度签约完成率" align="center" width="80"></el-table-column>
            <el-table-column
              prop="fact_week_sign"
              :label="nowWeek+'签约金额'"
              align="center"
              width="130"
            ></el-table-column>
            <el-table-column
              prop="fact_week_sign_per"
              :label="nowWeek+'签约完成率'"
              align="center"
              width="110"
            ></el-table-column>
            <el-table-column
              prop="fact_signed"
              label="系统大定未签金额"
              header-align="center"
              align="center"
              width="100"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="预估情况" align="center">
            <el-table-column
              prop="plan_reserve"
              label="线下锁定未进系统，且本月可签金额"
              header-align="center"
              align="center"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="plan_signed"
              label="系统大定未签，且可签金额"
              header-align="center"
              align="center"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="plan_month_lock_price"
              label="本月锁定金额"
              header-align="center"
              align="center"
              width="120"
            >
              <!-- <template
                slot-scope="scope"
              >{{Number(scope.row.fact_month_sign)+Number(scope.row.plan_reserve)+Number(scope.row.plan_signed) | numFilter}}</template> -->
            </el-table-column>
            <el-table-column prop="plan_month_lock_per" label="本月锁定率" align="center" width="120">
              <!-- <template slot-scope="scope">
                <span
                  v-if="Number(scope.row.target_month_sign)==0"
                >{{(Number(scope.row.fact_month_sign)+Number(scope.row.plan_reserve)+Number(scope.row.plan_signed))/1*100 | numFilter}}%</span>
                <span
                  v-if="Number(scope.row.target_month_sign)!=0"
                >{{(Number(scope.row.fact_month_sign)+Number(scope.row.plan_reserve)+Number(scope.row.plan_signed))/Number(scope.row.target_month_sign)*100 | numFilter}}%</span>
              </template> -->
            </el-table-column>
            <el-table-column
              prop="plan_month_newsign"
              label="本月预估新增签约金额"
              header-align="center"
              align="center"
              width="140"
            ></el-table-column>
            <el-table-column
              prop="plan_month_sign"
              label="本月预估签约金额"
              header-align="center"
              align="center"
              width="140"
            >
              <!-- <template
                slot-scope="scope"
              >{{Number(scope.row.fact_month_sign)+Number(scope.row.plan_reserve)+Number(scope.row.plan_signed)+Number(scope.row.plan_month_newsign) | numFilter}}</template> -->
            </el-table-column>
            <el-table-column prop="plan_week_bearer_gap" label="周度来人缺口" align="center" width="110"></el-table-column>
            <el-table-column
              prop="plan_week_sign_gap"
              label="周度签约缺口"
              header-align="center"
              align="center"
              width="110"
            ></el-table-column>
            <el-table-column
              prop="plan_month_sign_gap"
              label="本月预估签约缺口"
              header-align="center"
              align="center"
              width="140"
            >
              <template
                slot-scope="scope"
              >{{scope.row.plan_month_sign/1-scope.row.target_month_sign/1 | numFilter}}</template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="缺口原因说明" align="center">
            <el-table-column prop="gap_cause" label="预计缺口主要原因" align="center" width="100"></el-table-column>
            <el-table-column label="主要原因详情说明" align="center" width="200">
              <template slot-scope="scope">
                <a
                  href="javascript:void(0);"
                  style="color:#333"
                  :title="scope.row.cause_details"
                >{{scope.row.cause_details}}</a>
              </template>
            </el-table-column>
            <el-table-column prop="minor_details" label="预计缺口次要原因" align="center" width="100"></el-table-column>
            <el-table-column label="次要原因详情说明" align="center" width="200">
              <template slot-scope="scope">
                <a
                  href="javascript:void(0);"
                  style="color:#333"
                  :title="scope.row.detailed_description"
                >{{scope.row.detailed_description}}</a>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="达成月度目标需要的支持政策及政策使用情况" align="center" width="200">
            <template slot-scope="scope">
              <a
                href="javascript:void(0);"
                style="color:#333"
                :title="scope.row.policy_for_target"
              >{{scope.row.policy_for_target}}</a>
            </template>
          </el-table-column>
          <el-table-column label="备注" align="center" width="200">
            <template slot-scope="scope">
              <a
                href="javascript:void(0);"
                style="color:#333"
                :title="scope.row.remarks"
              >{{scope.row.remarks}}</a>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="300">
            <template slot="header">
              <span>操作</span>

              <!-- <el-button  v-if="$route.query.plan_status!=1&&$store.state.user.userPower.includes('复核')"  class="allSet" :checked="isAllNow"  @click="allSet">{{alltext}}</el-button> -->
              <!-- <input v-if="$route.query.plan_status!=1&&$store.state.user.userPower.includes('复核')" type="checkbox" class="allSet" v-model="isAllNow" @change="allSet"> -->
            </template>
            <template slot-scope="scope">
              <el-button
                type="text"
                class="editBox"
                v-if="$route.query.plan_status!=1&&scope.row.type==3&&scope.row.checkeds==0"
                @click="editDialog(scope.row)"
              >编辑</el-button>
              <!-- <el-button type="text"  v-if='scope.row.plan_status== 0' style="color: red">未上报</el-button>
              <el-button type="text"  v-if='scope.row.plan_status== -1' style="color: red">已驳回</el-button>-->
              <!-- <el-button type="text"  v-if='scope.row.plan_status== 2' style="color: green">已通过</el-button> -->
              <!-- <el-button type="text" v-if='scope.row.plan_status == 1' @click="handleEdit({'project_id':scope.row.project_id,'how_week':scope.row.how_week,'this_time':scope.row.this_time,'area_id':scope.row.area_id, 'is_effective': 2},'通过')">通过</el-button> -->
              <el-button
                type="text"
                v-if="scope.row.plan_status >= 1&&scope.row.type==3&& $route.query.plan_status!=1&&$store.state.user.userPower.includes('驳回')&&scope.row.checkeds==0"
                style="color:red"
                @click="handleEdit({'project_id':scope.row.project_id,'how_week':scope.row.how_week,'this_time':scope.row.this_time,'area_id':scope.row.area_id, 'is_effective': 0,'plan_status': -1,'type':scope.row.type, },'驳回',scope.row)"
              >驳回</el-button>
              <div
                class="checkedBox"
                v-if="$route.query.plan_status!=1&&$store.state.user.userPower.includes('复核')&&showCheckeds"
              >
                <el-checkbox
                  @change="checkedStatus(scope.row)"
                  label="复核"
                  v-if="scope.row.type==3"
                  name="checkeds"
                  :value="scope.row.checkeds==1"
                ></el-checkbox>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-row>

    <el-row type="flex" justify="center">
      <el-button
        v-if="$route.query.plan_status!=1&&isWithin"
        v-show="showSubmit"
        type="primary"
        @click="submitApproval"
        style="margin-right:30px"
        class="xuHuiBtn main"
      >提交审批</el-button>
      <!-- <el-button
        v-if="$store.state.user.userPower.includes('上报')&& $route.query.plan_status!=1"
        @click="reported(areaWeeklyData)"
        style="margin-right:30px"
        class="xuHuiBtn main"
        type="primary"
      >上报</el-button> -->
      <!-- <el-button v-if="userPowerList.includes('暂存')&& $route.query.plan_status!=1" @click="hold(areaWeeklyData)" class="xuHuiBtn secondary" style="margin-right:30px" type="primary">暂存</el-button> -->
      <el-button type="primary" @click="$router.back(-1)" class="xuHuiBtn main">返回</el-button>
    </el-row>
    <!-- <el-row
        class="annotation"
    >
      </el-row>-->
    <!-- 编辑模态框 -->
    <el-dialog title="区域编辑项目" :visible.sync="dialogVisible" width="70%" top="10px">
      <div class="projectWeeklyForm" style="min-height:200px">
        <h3 class="weekTitle">
          {{weekStart|getYear}}{{weekStart|getMonthDay}}-{{weekEnd|getMonthDay}}周报
          <span>金额单位: (万元)</span>
        </h3>
        <el-table
          :data="projectWeeklyData"
          row-key="id"
          border
          :height="180"
          style="max-height:400px;width:100%;min-height:200px;"
        >
          <el-table-column prop="project_name" fixed label="事业部/项目" align="center" width="200"></el-table-column>
          <el-table-column label="项目信息" align="center">
            <el-table-column label="项目编码" align="center" width="180">
              <template slot-scope="scope">
                <a
                  href="javascript:void(0);"
                  style="color:#333"
                  :title="scope.row.project_code"
                >{{scope.row.project_code}}</a>
              </template>
            </el-table-column>
            <el-table-column prop="trader_name" label="操盘手" align="center" width="100"></el-table-column>
            <el-table-column prop="islast" label="是否尾盘" align="center" width="80"></el-table-column>
            <el-table-column prop="issales_trade" label="是否我方营销操盘" align="center" width="140"></el-table-column>
          </el-table-column>
          <el-table-column
            prop="subscribe_price"
            label="上月未转签约的认购金额"
            header-align="center"
            align="center"
            width="110"
          ></el-table-column>
          <el-table-column label="目标" align="center">
            <el-table-column label="月度目标" align="center">
              <el-table-column prop="target_month_bearer" label="来人(组)" align="center" width="100"></el-table-column>
              <el-table-column prop="target_month_sign" label="签约" align="center" width="100"></el-table-column>
            </el-table-column>
            <el-table-column :label="nowWeek+'目标'" align="center">
              <el-table-column prop="target_week_bearer" label="来人(组)" align="center" width="100"></el-table-column>
              <el-table-column
                prop="target_week_sign"
                label="签约"
                header-align="center"
                align="center"
                width="100"
              ></el-table-column>
            </el-table-column>
            <el-table-column prop="city" :label="nowWeek+'目标占比'" align="center">
              <el-table-column
                prop="target_week_bearer_per"
                label="来人占比"
                align="center"
                width="100"
              ></el-table-column>
              <el-table-column prop="target_week_sign_per" label="签约占比" align="center" width="80"></el-table-column>
            </el-table-column>
          </el-table-column>

          <el-table-column label="完成情况" align="center">
            <el-table-column
              prop="fact_month_bearer_total"
              label="月度累计来人(组)"
              align="center"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="fact_month_bearer_per"
              label="月度来人完成率"
              align="center"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="fact_week_bearer"
              :label="nowWeek+'来人(组)'"
              align="center"
              width="80"
            ></el-table-column>
            <el-table-column
              prop="fact_week_bearer_per"
              :label="nowWeek+'来人完成率'"
              align="center"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="fact_month_sign"
              label="月度签约金额(系统签约)"
              header-align="center"
              align="center"
              width="130"
            >
              <template slot-scope="scope">
                <span>{{scope.row.fact_month_sign}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="fact_month_sign_per" label="月度签约完成率" align="center" width="100"></el-table-column>
            <el-table-column
              prop="fact_week_sign"
              :label="nowWeek+'签约金额'"
              header-align="center"
              align="center"
              width="130"
            ></el-table-column>
            <el-table-column
              prop="fact_week_sign_per"
              :label="nowWeek+'签约完成率'"
              align="center"
              width="110"
            ></el-table-column>
            <el-table-column
              prop="fact_signed"
              label="系统大定未签金额"
              header-align="center"
              align="center"
              width="100"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="预估情况" align="center">
            <el-table-column
              prop="plan_reserve"
              label="线下锁定未进系统，且本月可签金额"
              header-align="center"
              align="center"
              width="150"
            >
              <template slot-scope="scope">
                <el-input
                  type="number"
                  :disabled="areaDisabled"
                  @keyup.native="
                scope.row.plan_signed=scope.row.plan_signed.replace(/[^\d.]/g,'');
                scope.row.plan_signed =scope.row.plan_signed.replace(/\.{2,}/g,'.');
                scope.row.plan_signed =scope.row.plan_signed.replace(/^\./g,'');
                scope.row.plan_signed =scope.row.plan_signed.replace('.','$#$').replace(/\./g,'').replace('$#$','.');
                scope.row.plan_signed =scope.row.plan_signed.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
                "
                  v-model.trim="scope.row.plan_reserve"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="plan_signed"
              label="系统大定未签，且可签金额"
              header-align="center"
              align="center"
              width="150"
            >
              <template slot-scope="scope">
                <el-input
                  type="number"
                  :disabled="areaDisabled"
                  @keyup.native="
                scope.row.plan_signed=scope.row.plan_signed.replace(/[^\d.]/g,'');
                scope.row.plan_signed =scope.row.plan_signed.replace(/\.{2,}/g,'.');
                scope.row.plan_signed =scope.row.plan_signed.replace(/^\./g,'');
                scope.row.plan_signed =scope.row.plan_signed.replace('.','$#$').replace(/\./g,'').replace('$#$','.');
                scope.row.plan_signed =scope.row.plan_signed.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
                scope.row.plan_signed =Number(scope.row.plan_signed)>Number(scope.row.fact_signed)?scope.row.fact_signed:scope.row.plan_signed;
                "
                  v-model.trim="scope.row.plan_signed"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="本月锁定金额" header-align="center" align="center" width="120">
              <template
                slot-scope="scope"
              >{{Number(scope.row.fact_month_sign)+Number(scope.row.plan_reserve)+Number(scope.row.plan_signed) | numFilter}}</template>
            </el-table-column>
            <el-table-column prop="plan_month_lock_per" label="本月锁定率" align="center" width="120">
              <template slot-scope="scope">
                <span
                  v-if="Number(scope.row.target_month_sign)==0"
                >{{scope.row.fact_month_sign*100 | numFilter}}%</span>
                <span
                  v-if="Number(scope.row.target_month_sign)!=0"
                >{{((Number(scope.row.fact_month_sign)+Number(scope.row.plan_reserve)+Number(scope.row.plan_signed))/Number(scope.row.target_month_sign))*100 | numFilter}}%</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="plan_month_newsign"
              label="本月预估新增签约金额"
              header-align="center"
              align="center"
              width="140"
            >
              <template slot-scope="scope">
                <el-input
                  type="number"
                  :disabled="areaDisabled"
                  @keyup.native="
                scope.row.plan_signed=scope.row.plan_signed.replace(/[^\d.]/g,'');
                scope.row.plan_signed =scope.row.plan_signed.replace(/\.{2,}/g,'.');
                scope.row.plan_signed =scope.row.plan_signed.replace(/^\./g,'');
                scope.row.plan_signed =scope.row.plan_signed.replace('.','$#$').replace(/\./g,'').replace('$#$','.');
                scope.row.plan_signed =scope.row.plan_signed.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
                "
                  v-model.trim="scope.row.plan_month_newsign"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="plan_month_sign"
              label="本月预估签约金额"
              header-align="center"
              align="center"
              width="140"
            >
              <template slot-scope="scope">
                <!-- 本月锁定金额+本月预估新增签约金额 -->
                {{Number(scope.row.fact_month_sign)+Number(scope.row.plan_reserve)+Number(scope.row.plan_signed)+Number(scope.row.plan_month_newsign) | numFilter}}
                <!-- <el-input type="number" :disabled="areaDisabled" v-model.number="scope.row.plan_month_sign"></el-input> -->
              </template>
            </el-table-column>
            <el-table-column prop="plan_week_bearer_gap" label="周度来人缺口" align="center" width="110"></el-table-column>
            <el-table-column prop="plan_week_sign_gap" label="周度签约缺口" align="center" width="110"></el-table-column>
            <el-table-column
              prop="plan_month_sign_gap"
              label="本月预估签约缺口"
              header-align="center"
              align="center"
              width="140"
            >
              <template
                slot-scope="scope"
              >{{Number(scope.row.fact_month_sign)+Number(scope.row.plan_reserve)+Number(scope.row.plan_signed)+Number(scope.row.plan_month_newsign)-scope.row.target_month_sign/1| numFilter}}</template>
            </el-table-column>
            <!-- <el-table-column label="缺口原因说明(3类接口存在均需说明)" align="center" width="250">
              <template slot-scope="scope">
                <el-input v-if="readonly == 0" v-model="scope.row.gap_cause"></el-input>
                <span v-else>{{scope.row.gap_cause}}</span>
              </template>
            </el-table-column>-->
          </el-table-column>
        </el-table>
      </div>

      <div class="editText">
        <el-row>
          <el-col :span="24">
            <div class="grid-content cause bg-purple-dark">缺口原因说明</div>
          </el-col>
        </el-row>
        <el-row>
          <!-- // detailed_description:areaText2,
        // cause_details:areaText1,
        // minor_details:selectData2,
          // gap_cause:selectData1-->
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form label-width="140px">
                <el-form-item label="预估缺口主要原因">
                  <el-select v-model="selectData1" :disabled="areaDisabled" placeholder="请选择主要原因">
                    <el-option
                      :label="item.DictName"
                      v-for="(item,index) in filterOption1"
                      :key="index"
                      :value="item.DictName"
                    >{{item.DictName}}</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="主要原因详细说明">
                  <el-input
                    :disabled="areaDisabled"
                    @input="textLength1"
                    maxlength="500"
                    type="textarea"
                    class="areaText"
                    v-model="areaText1"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form label-width="140px">
                <el-form-item label="预估缺口次要原因">
                  <el-select :disabled="areaDisabled" v-model="selectData2" placeholder="请选择次要原因">
                    <el-option
                      :label="item.DictName"
                      v-for="(item,index) in filterOption2"
                      :key="index"
                      :value="item.DictName"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="次要原因详细说明">
                  <el-input
                    :disabled="areaDisabled"
                    @input="textLength2"
                    type="textarea"
                    class="areaText"
                    maxlength="500"
                    v-model="areaText2"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-top:10px">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form label-width="140px">
                <el-form-item label="达成月度目标需要的支持政策及政策使用情况">
                  <el-input
                    :disabled="areaDisabled"
                    @input="textLength3"
                    maxlength="500"
                    type="textarea"
                    v-model="areaText3"
                    class="areaThree"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form label-width="140px">
                <el-form-item label="备注">
                  <el-input
                    :disabled="areaDisabled"
                    @input="textLength4"
                    maxlength="500"
                    type="textarea"
                    v-model="areaText4"
                    class="areaThree"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </div>

      <el-row class="annotation">注：周报在每周末晚18点30分将自动刷新从售楼系统中获取的本月和本周实际完成情况，你需要尽快填写预估情况</el-row>
      <!-- </el-row> -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" v-if="!areaDisabled" @click="saveEdit">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { render, sendJSON, downLoad, get,windowPhase} from "@/api/request";
import { sortList } from "@/utils/methods";
import { changeChecked, submitApproval } from "@/api/weekly";
export default {
  name: "areaWeeklyParticulars",
  data() {
    return {
      areaWeeklyData: [],
      tableHeight: 460,
      userPowerList: [],
      areaId: "",
      nowWeek: "",
      dialogVisible: false,
      dialogH: "",
      dialogW: "",
      projectWeeklyData: [],
      readonly: this.$route.query.is_effective,
      selectData1: "",
      selectData2: "",
      areaText2: "",
      areaText1: "",
      areaText3: "",
      areaText4: "",
      optionList: [],
      areaDisabled: false,
      allButton: false,
      isAllNow: "",
      showSubmit: true,
      alltext: "全选",
      userId: JSON.parse(localStorage.getItem("userInfo")).username,
      showCheckeds:true,
      isWithin:false
    };
  },
  filters: {
    getMonthDay(value) {
      return new Date(value).getAppointedFormatTime("MM月dd日");
    },
    getYear(value) {
      return new Date(value).getAppointedFormatTime("yyyy年");
    },
    // 保留两位小数四舍五入
    numFilter(value) {
      let realVal = "";
      if (value) {
        realVal = parseFloat(value).toFixed(2);
      } else {
        realVal = "0.00";
      }
      return realVal;
    }
  },
  computed: {
    filterOption1() {
      return this.optionList;
    },
    filterOption2() {
      return this.optionList;
    }
  },
  mounted() {
    // this.tableHeight=document.body.clientHeight - 220
    this.dialogH = document.body.clientHeight + "px";
    this.dialogW = document.body.clientWidth + "px";
  },
  created() {
    // console.log(document.body.clientHeight);
    //  if(localStorage.getItem('username')!=="admin"){
   windowPhase({}).then(res => {
      let start= res.result.data.windowsStart.replace(/-/g, '/')
      let end= res.result.data.windowsEnd.replace(/-/g, '/')
      if (
        new Date().getTime() > new Date(start).getTime() &&
        new Date().getTime() < new Date(end).getTime()
      ) {
        this.isWithin=true
      }else{
        this.isWithin=false
      }
    });
    // }
    this.getHeight();
    this.reload();
    this.weekStart = this.$route.query.start;
    this.weekEnd = this.$route.query.end;
    this.nowWeek =
      this.$route.query.start.split("-")[
        this.$route.query.start.split("-").length - 1
      ] +
      "-" +
      this.$route.query.end.split("-")[
        this.$route.query.end.split("-").length - 1
      ] +
      "号";
  },
  methods: {
    // 获取高度
    getHeight() {
      this.tableHeight = window.innerHeight - 288;
    },
    // 重新渲染
    reload() {
      sendJSON("/weeklyMarketing/ProjectExamineWeekly", {
        project_id: this.$route.query.project_id,
        this_time: this.$route.query.this_time,
        how_week: Number(this.$route.query.how_week),
        type: Number(this.$route.query.type),
        is_effective: 1,
        userId: "6d445313-3554-11e7-a3f8-5254007b6f02"
      }).then(res => {
        this.optionList = res.result[res.result.length - 1].gap;
        res.result.pop();
        this.areaId = res.result[res.result.length - 1].id;
        this.userPowerList = this.$store.state.user.userPower;
        this.$data.areaWeeklyData.splice(
          0,
          this.$data.areaWeeklyData.length,
          ...sortList(res.result, "business_unit_id", "father_id", "type", true)
        );
        if (this.areaWeeklyData[0].children.every(item => item.checkeds == 1)) {
          this.isAllNow = true;
          this.allButton = true;
        }
        if (
          this.areaWeeklyData[0].flow_status == 3 ||
          this.areaWeeklyData[0].flow_status == 4
        ) {
          this.showSubmit = false;
          this.showCheckeds=false
        }
        if(this.$route.query.plan_status==-1&&this.areaWeeklyData[0].flow_status == 4){
          this.showSubmit=true
          this.showCheckeds=true
        }
        if(this.$route.query.plan_status==0 && this.areaWeeklyData[0].flow_status == 7) {
          this.showSubmit=true
          this.showCheckeds=true
        }
      });
    },
    // 表格
    load(tree, treeNode, resolve) {
      sendJSON("/weeklyMarketing/ProjectExamineWeekly", {
        project_id: this.$route.query.project_id,
        this_time: this.$route.query.this_time,
        how_week: this.$route.query.how_week,
        userId: "6d445313-3554-11e7-a3f8-5254007b6f02"
      }).then(res => {
        console.log(res);
        res.result.forEach(item => {
          if (item.father_count > 0) {
            item.hasChildren = true;
          }
        });
        resolve(res.result);
      });
    },

    // 驳回
    handleEdit(query, text, row) {
      this.$confirm("确认驳回吗？").then(() => {
        sendJSON("/weeklyMarketing/weekMarketingPlanEffective", {
          ...query
        }).then(res => {
          _paq.push(["trackEvent", "点击", "区域周度计划驳回"]);
          this.$message.success("驳回成功");
          if (row.checkeds == 1) {
            this.checkedStatus(row);
          } else {
            this.reload();
          }
          this.$set(row, "plan_status", -1);
          this.$message.success("驳回成功");
        });
      });
    },
    // 导出数据
    exportTemp() {
      let { this_time, how_week, project_id } = this.$route.query;
      return downLoad("/weeklyMarketing/regionWeeklyDataExport", {
        this_time: this_time,
        how_week: how_week,
        projectId: project_id
      });
    },
    exportMatomo() {
      _paq.push(["trackEvent", "点击", "导出", "区域查看周报数据导出"]);
    },
    // 上报
    reported(primary) {
      let flag = this.areaWeeklyData[0].children.every(
        item => item.checkeds == 1
      );
      this.$confirm("确认上报吗？")
        .then(() => {
          if (flag) {
            sendJSON("/weeklyMarketing/weekMarketingPlanEffective", {
              ...this.$route.query,
              is_effective: 1,
              type: primary[0].type,
              plan_status: 1
            }).then(res => {
              _paq.push(["trackEvent", "点击", "上报", "区域周度计划管理上报"]);
              this.$message.success("上报成功");
              this.$router.back(-1);
            });
          } else {
            let message = "";
            this.areaWeeklyData[0].children
              .filter(item => item.checkeds != 1)
              .forEach(
                item => (message = message + item.business_name + ",<br>")
              );
            this.$alert(`<div>${message}以上项目未进行复核</div>`, "提示", {
              dangerouslyUseHTMLString: true
            });
          }
        })
        .catch(() => {
          this.$message("已取消");
        });
    },
    // 暂存
    hold(primary) {
      sendJSON(
        "/weeklyMarketing/weekMarketingPlanAreaUpdate",
        primary[0].children.filter(item => item.is_self_write == 1)
      ).then(res => {
        _paq.push(["trackEvent", "点击", "暂存", "区域周度计划管理暂存"]);

        this.$message.success("暂存成功");
        this.reload();
      });
    },
    // 勾选
    checkedStatus(row) {
      let { checkeds, project_id, how_week, this_time, area_id } = row;
      let status = checkeds == 1 ? 0 : 1;
      if (row.plan_status == 0 && (checkeds == 0 || checkeds == undefined)) {
        this.$confirm("该项目未上报,确认复核么？")
          .then(() => {
            this.$set(row, "checkeds", status);
            row.checkeds = status
            this.changeChecked(row)
          })
          .catch(() => {
            status = !status;
            this.$set(row, "checkeds", status);
            row.checkeds = status;
            if (
              this.areaWeeklyData[0].children.every(item => item.checkeds == 1)
            ) {
              this.isAllNow = true;
            } else {
              this.isAllNow = false;
            }
          });
      }else{
            row.checkeds = status;
            this.changeChecked(row)
      }
    },
    changeChecked(row){
      changeChecked([
        {
          ...row
        }
      ]).then(res => {
        // console.log(this.areaWeeklyData[0].children);
        // console.log(row.checkeds);

        // console.log(res.result);
        // for(let key in res.result){
        //   console.log(res.result[key]);

        //   this.$set(this.areaWeeklyData[0],key,res.result[key])
        // }
        //  let temp= {
        //   ...res.result,
        //   children: this.areaWeeklyData[0].children
        // };
        // this.areaWeeklyData[0]=temp
        if (this.areaWeeklyData[0].children.every(item => item.checkeds == 1)) {
          this.isAllNow = true;
        } else {
          this.isAllNow = false;
          this.allButton = false;
        }
        this.reload()
        _paq.push(["trackEvent", "点击", "已阅", "区域周度计划管理已阅"]);
      });
    },
    // 展开模态框
    editDialog(row) {
      console.log(row);
      this.dialogVisible = true;
      if (this.$route.query.plan_status == 1) {
        this.areaDisabled = true;
      }
      this.projectWeeklyData = [row];
      this.selectData1 = row.gap_cause || "";
      this.selectData2 = row.minor_details || "";
      this.areaText2 = row.detailed_description || "";
      this.areaText1 = row.cause_details || "";
      this.areaText3 = row.policy_for_target || "";
      this.areaText4 = row.remarks || "";
    },
    //  文本长度不超过五百
    textLength1() {
      if (this.areaText1.length >= 500) {
        this.$message.error("文本长度不能超过500字");
      }
    },
    //  文本长度不超过五百
    textLength2() {
      if (this.areaText2.length >= 500) {
        this.$message.error("文本长度不能超过500字");
      }
    },
    //  文本长度不超过五百
    textLength3() {
      if (this.areaText3.length >= 500) {
        this.$message.error("文本长度不能超过500字");
      }
    },
    textLength4() {
      console.log(this.areaText2, this.areaText1);
      if (this.areaText4.length >= 500) {
        this.$message.error("文本长度不能超过500字");
      }
    },
    // 保存上报
    saveEdit() {
      this.$confirm("确认保存修改并上报吗？").then(() => {
        (this.projectWeeklyData[0].detailed_description = this.areaText2),
          (this.projectWeeklyData[0].cause_details = this.areaText1),
          (this.projectWeeklyData[0].minor_details = this.selectData2),
          (this.projectWeeklyData[0].gap_cause = this.selectData1);
        this.projectWeeklyData[0].policy_for_target = this.areaText3;
        this.projectWeeklyData[0].remarks = this.areaText4;
        if (this.projectWeeklyData[0].target_month_sign == 0) {
          this.projectWeeklyData[0].target_month_sign = 1;
        }
        this.projectWeeklyData[0].plan_month_lock_per = parseFloat(
          ((Number(this.projectWeeklyData[0].fact_month_sign) +
            Number(this.projectWeeklyData[0].plan_reserve) +
            Number(this.projectWeeklyData[0].plan_signed)) /
            Number(this.projectWeeklyData[0].target_month_sign)) *
            100
        ).toFixed(2);
        this.projectWeeklyData[0].plan_month_lock_price = parseFloat(
          Number(this.projectWeeklyData[0].fact_month_sign) +
            Number(this.projectWeeklyData[0].plan_reserve) +
            Number(this.projectWeeklyData[0].plan_signed)
        ).toFixed(2);
        this.projectWeeklyData[0].plan_month_sign = parseFloat(
          Number(this.projectWeeklyData[0].fact_month_sign) +
            Number(this.projectWeeklyData[0].plan_reserve) +
            Number(this.projectWeeklyData[0].plan_signed) +
            Number(this.projectWeeklyData[0].plan_month_newsign)
        ).toFixed(2);
        this.projectWeeklyData[0].plan_month_sign_gap = parseFloat(
          Number(this.projectWeeklyData[0].fact_month_sign) +
            Number(this.projectWeeklyData[0].plan_reserve) +
            Number(this.projectWeeklyData[0].plan_signed) +
            Number(this.projectWeeklyData[0].plan_month_newsign) -
            this.projectWeeklyData[0].target_month_sign / 1
        ).toFixed(2);
        this.projectWeeklyData[0].is_regionwrite=1
        sendJSON("/weeklyMarketing/weekMarketingPlanUpdate", {
          ...this.projectWeeklyData[0]
        }).then(res => {
          sendJSON("/weeklyMarketing/weekMarketingPlanEffective", {
            ...this.projectWeeklyData[0],
            is_effective: 1,
            plan_status: 2,
            is_regionwrite:1
          }).then(res => {
            _paq.push(["trackEvent", "点击", "上报", "项目周度计划管理上报"]);
            this.$message.success("上报成功");
            this.dialogVisible = false;
            this.reload();
          });
        });
      });
    },
    // 确认全选
    allSure() {
      if (this.isAllNow) {
        if (
          this.areaWeeklyData[0].children.every(item => item.plan_status != 0)
        ) {
          this.allSet();
        } else {
          this.$confirm("全选的项目中有未进行上报的,确认复核么?")
            .then(() => {
              this.allSet();
            })
            .catch(() => {
              this.isAllNow = false;
            });
        }
      } else {
        this.allSet();
      }
    },
    // 复核全选
    allSet() {
      this.allButton = !this.allButton;
      let all = this.areaWeeklyData[0].children;
      let status;
      this.allButton ? (status = 1) : (status = 0);
      all.forEach(item => {
        item.checkeds = status;
      });
      changeChecked(all).then(res => {
        this.reload();
      });
    },
    submitApproval() {
      let flag = this.areaWeeklyData[0].children.every(
        item => item.checkeds == 1
      );
      this.$confirm("是否发起审批？确认后流程不能撤回!")
        .then(() => {
          if (flag) {
            let tempData = {
              ...this.areaWeeklyData[0]
            };
            tempData.children = null;
            submitApproval({
              ...tempData,
              creator: localStorage.getItem("username"),
              Date:
                new Date(this.weekStart).getAppointedFormatTime("MM月dd日") +
                "-" +
                new Date(this.weekEnd).getAppointedFormatTime("MM月dd日"),
              userId: localStorage.getItem("id")
            }).then(res => {
              if (res.code == 0||res.code == 200) {
                get(
                  `/Workflow/MTStart2.aspx?BSID=My_Sales&BTID=week_area_report&BOID=${res.data}&UserID=${this.userId}&LoginKey=''`
                ).then(res => {
                  if (res.code == 0 || res.code == 200) {
                    this.showSubmit = false;
                    this.showCheckeds=false
                    open(res.data);
                  } else {
                    this.$message.error("审批发起失败");
                  }
                });
              }else if(res.code == -1){
                this.$message.error(res.messages);
              } else {
                this.$message.error("未获取到审批单id");
              }
            });
          } else {
            let message = "";
            this.areaWeeklyData[0].children
              .filter(item => item.checkeds != 1)
              .forEach(
                item => (message = message + item.business_name + ",<br>")
              );
            this.$alert(`<div>${message}以上项目未进行复核</div>`, "提示", {
              dangerouslyUseHTMLString: true
            });
          }
        })
        .catch(() => {
          this.$message("已取消");
        });
    }
  }
};
</script>
<style lang="scss">
@import "@/styles/form.scss";
</style>
<style lang="less">
  // .el-table {
  //   .el-table__fixed {
  //     height:auto !important; // 此处的important表示优先于element.style
  //     bottom:17px; // 改为自动高度后，设置与父容器的底部距离，则高度会动态改变
  //   }
  // }
.el-message-box__content{
    max-height: 400px!important;
    overflow: auto;
  }
.outData {
  display: block;
  width: 100px;
  height: 30px;
  background-color: #2761ff;
  line-height: 30px;
  text-align: center;
  color: #fff !important;
  border-radius: 4px;
}
.outData:hover {
  color: #fff;
  background-color: #023bd8 !important;
}
.allSet {
  height: 20px;
  position: absolute;
  right: 30px;
  padding: 3px;
  // z-index: 999999999;
}
 ::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.el-form-item__label {
  // color: red !important;
  line-height: 20px;
}
input[type="number"] {
  -moz-appearance: textfield;
}
.areaText {
  .el-textarea__inner {
    height: 140px;
  }
}
.areaThree {
  .el-textarea__inner {
    height: 140px;
  }
}
textarea {
  resize: none !important;
}
.el-dialog__footer {
  text-align: center;
  button {
    margin-right: 30px;
  }
}
.editText {
  height: 450px;
  margin-top: 20px;
}
</style>
<style lang='less' scoped>
.areaWeeklyData {

  .targetTitle {
    text-indent: 2em;
    font-size: 12px;
    color: #606266;
    padding: 5px 0;
  }
  height: 100%;
  .checkedBox {
    // background-color: red;
    float: right;
    height: 36px;
    line-height: 36px;
    margin-right: 20px;
  }
  .editBox {
    float: left;
    height: 36px;
    margin-left: 20px;
  }
  .weekTitle {
    text-align: center;
    font-size: 18px;
    margin-bottom: 10px;
    span {
      float: right;
      font-size: 12px;
      color: #999;
      margin-top: 4px;
    }
  }
  .annotation {
    margin-top: 10px;
    font-size: 12px;
    color: #999;
    text-align: center;
  }
  .top {
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    .top_l {
      color: #2761ff;
    }
  }
  .areaWeeklyForm {
    margin-top: 10px;
  }
  .el-button + .el-button {
    margin-left: 0;
  }
}
</style>
