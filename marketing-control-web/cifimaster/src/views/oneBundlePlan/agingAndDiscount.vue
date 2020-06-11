<template>
  <div class="agingAndDiscount">
    <el-collapse v-model="activeNames" @change="collapseChange">
      <el-collapse-item title name="1" disabled>
        <template slot="title">
          <h3 class="form_item_title">基础信息</h3>
        </template>
        <el-row>
          <el-col style="padding-top:7px;" :span="isPhone?24:12">
            <el-row>
              <el-col :span="8">
                <span style="float:right;">申请人:</span>
              </el-col>
              <el-col style="padding-left:10px;" :span="16">
                <span>{{stageMainData.applicant_name}}</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col style="padding-top:7px;" :span="isPhone?24:12">
            <el-row>
              <el-col style="text-algin:right;" :span="8">
                <span style="float:right;">申请人部门:</span>
              </el-col>
              <el-col style="padding-left:10px;" :span="16">
                <span>{{stageMainData.department_name}}</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col style="padding-top:7px;" :span="isPhone?24:12">
            <el-row>
              <el-col style="text-algin:right;" :span="8">
                <span style="float:right;">申请时间:</span>
              </el-col>
              <el-col style="padding-left:10px;" :span="16">
                <span>{{stageMainData.applicant_time}}</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title name="2" disabled>
        <template slot="title">
          <h3 class="form_item_title">政策基础信息</h3>
        </template>
        <el-row>
          <el-col style="padding-top:7px;" :span="isPhone?24:12">
            <el-row>
              <el-col :span="8">
                <span style="float:right;">关键事项名称:</span>
              </el-col>
              <el-col style="padding-left:10px;" :span="16">
                <el-input v-if="!isApproval" v-model="item_name" placeholder="请输入内容"></el-input>
                <span v-else>{{item_name}}</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col style="padding-top:7px;" :span="isPhone?24:12">
            <el-row>
              <el-col style="text-algin:right;" :span="8">
                <span style="float:right;">申请政策项目:</span>
              </el-col>
              <el-col style="padding-left:10px;" :span="16">
                <el-select
                  v-if="!isApproval"
                  v-model="project_id"
                  @change="selectProject(project_id)"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item,index) in projectData"
                    :key="index"
                    :label="item.ProjectName"
                    :value="item.projectId"
                  ></el-option>
                </el-select>
                <span v-else>{{projectData.find(item=>item.projectId==project_id).ProjectName}}</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <h4 style="padding-left:30px;height:30px;line-height:40px">申请正文:</h4>
          <el-col :span="24">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="stageMainData.content"
              maxlength="2000"
              show-word-limit
              style="padding:10px;"
              rows="8"
              :readonly="isApproval"
            ></el-input>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title name="3" disabled>
        <template slot="title">
          <h3 class="form_item_title">分期政策信息</h3>
          <span class="radiospan" v-if="!$route.query.BOID">是否申请分期政策</span>
          <el-radio v-model="isApplyStage" label="1" v-if="!$route.query.BOID">是</el-radio>
          <el-radio v-model="isApplyStage" label="0" v-if="!$route.query.BOID">否</el-radio>
        </template>
        <h4
          v-show="isApplyStage=='1'||$route.query.BOID"
          style="padding-left:30px;height:40px;"
          v-if="!$route.query.BOID||stageItemDataOld.length>0"
        >原有分期政策明细</h4>
        <el-table
          border
          :data="stageItemDataOld"
          style="width: 100%;"
          :header-cell-style="orangeHead"
          v-show="isApplyStage=='1'||$route.query.BOID"
          v-if="!$route.query.BOID||stageItemDataOld.length>0"
        >
          <el-table-column
            header-align="center"
            align="center"
            prop="stage_policy_type"
            label="分期政策类别"
          ></el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="stage_time_type"
            label="分期时间类别"
          ></el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="policy_effective_time"
            label="政策有效时间"
          >
            <template slot-scope="scope">{{scope.row.policy_effective_time}}</template>
          </el-table-column>
          <el-table-column header-align="center" align="center" prop="stage_days" label="分期天数"></el-table-column>

          <el-table-column header-align="center" align="center" prop="policy_num" label="政策套数"></el-table-column>
          <el-table-column header-align="center" align="center" prop="choose_num" label="已使用套数"></el-table-column>
          <el-table-column header-align="center" align="center" prop="surplus_num" label="剩余套数"></el-table-column>
          <el-table-column header-align="center" align="center" prop="append_num" label="追加套数">
            <template slot="header">
              <span style="color:red">追加套数</span>
            </template>
            <template slot-scope="scope">
              <el-input
                @blur="countSum(scope.row,scope.row.append_num)"
                v-only-number="{min:0,natural:true}"
                type="number"
                v-model="scope.row.append_num"
                v-if="!isApproval"
              ></el-input>
              <span v-else>{{scope.row.append_num}}</span>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="policy_sum_num"
            label="政策套数合计"
          >
            <template slot-scope="scope">
              <span>{{scope.row.policy_sum_num}}</span>
            </template>
          </el-table-column>
          <af-table-column header-align="center" align="center" prop="build_name" label="楼栋">
             <template slot-scope="scope">
                            <div v-html="getBr(scope.row.build_name)"></div>
            </template>
          </af-table-column>
        </el-table>
        <h4
          v-show="isApplyStage=='1'||$route.query.BOID"
          v-if="!$route.query.BOID||stageItemDataNew.length>0"
          style="padding-left:30px;position:relative;height:40px;margin-top:5px;"
        >
          新增分期政策明细
          <el-button
            v-if="!isApproval"
            @click="addListData('addStage')"
            class="addBTN main xuHuiBtn"
          >新增</el-button>
        </h4>
        <el-table
          v-show="isApplyStage=='1'||$route.query.BOID"
          border
          :data="stageItemDataNew"
          v-if="!$route.query.BOID||stageItemDataNew.length>0"
          style="width: 100%"
        >
          <el-table-column header-align="center" align="center" prop="aaa" label="分期政策类别">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.stage_policy_type"
                @input="checkRepetition(scope.row,scope.$index,'deleteStageItem')"
                @change="changeStageTime(scope.row)"
                placeholder="请选择"
                v-if="!isApproval"
              >
                <el-option value="全款分期" label="全款分期"></el-option>
                <el-option value="首付分期" label="首付分期"></el-option>
              </el-select>
              <span v-else>{{scope.row.stage_policy_type}}</span>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="bbb"
            width="170"
            label="分期时间类别"
          >
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.stage_time_type"
                @input="checkRepetition(scope.row,scope.$index,'deleteStageItem')"
                @change="changeStageDay(scope.row)"
                placeholder="请选择"
                v-if="!isApproval"
              >
                <el-option
                  v-for="item in stageTimeData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span v-else>{{scope.row.stage_time_type}}</span>
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" label="政策有效时间">
            <template slot-scope="scope">
              <el-date-picker
                style="width:100%"
                value-format="yyyy-MM"
                v-model="scope.row.policy_effective_time"
                type="month"
                v-if="!isApproval"
                placeholder="选择月"
                @change="checkTimeToday(scope.row.policy_effective_time,scope.row)"
              ></el-date-picker>
              <span v-else>{{scope.row.policy_effective_time}}</span>
            </template>
          </el-table-column>
          <af-table-column header-align="center" align="center" prop="stage_days" label="分期天数"></af-table-column>
          <el-table-column header-align="center" align="center" label="套数">
            <template slot-scope="scope">
              <el-input
                type="number"
                v-only-number="{min:0,natural:true}"
                v-model="scope.row.policy_num"
                v-if="!isApproval"
              ></el-input>
              <span v-else>{{scope.row.policy_num}}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="!isApproval" header-align="center" align="center" label="楼栋">
            <template slot-scope="scope">
              <el-select
                multiple
                style="width:100%;overflow:hidden"
                v-model="scope.row.build_id"
                @change="checkRepetition(scope.row,scope.$index,'deleteStageItem')"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in buildData"
                  :key="item.buildId"
                  :label="item.build_name"
                  :value="item.buildId"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <af-table-column header-align="center" align="center" v-else prop="build_name" label="楼栋">
            <template slot-scope="scope">
              <div v-html="getBr(scope.row.build_name)"></div>
            </template>
          </af-table-column>
          <el-table-column header-align="center" v-if="!isApproval" align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                @click="delListData(scope.$index,'deleteStageItem')"
                style="color:red"
                type="text"
                v-if="!isApproval"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item title name="4" disabled>
        <template slot="title">
          <h3 class="form_item_title">折扣政策信息</h3>
          <span class="radiospan" v-if="!$route.query.BOID">是否申请折扣政策</span>
          <el-radio v-model="isApplyDis" v-if="!$route.query.BOID" label="1">是</el-radio>
          <el-radio v-model="isApplyDis" v-if="!$route.query.BOID" label="0">否</el-radio>
        </template>
        <div class="list" v-show="isApplyDis=='1'" id="list">
          <div class="operation">
            <el-row style="padding:0 20px;line-height:40px">
              <el-col :span="24">
                <span>破底政策类型:</span>
                <el-select
                  v-model="stageMainData.policy_type"
                  @change="changePDtype(stageMainData.policy_type)"
                  placeholder="请选择"
                  v-if="!isApproval"
                >
                  <el-option label="一揽子破底政策审批(3个点以上)" value="一揽子破底政策审批(3个点以上)"></el-option>
                  <el-option label="一揽子破底政策审批(3个点以内)" value="一揽子破底政策审批(3个点以内)"></el-option>
                </el-select>
                <span v-else>{{stageMainData.policy_type}}</span>
              </el-col>
            </el-row>
            <h4 style="padding-left:30px;height:40px;line-height:40px">经营指标现状</h4>
            <el-table
              :span-method="spanCurrage"
              :data="clientInfoList"
              :header-cell-style="{background:'#F5F7FA',color:'#999'}"
              border
              style="width: 100%"
            >
              <af-table-column label="对标版本" align="center" prop="type" width="200"></af-table-column>
              <af-table-column label="货值(万元)" align="center" prop="num">
                <template slot-scope="scope">
                  <el-input
                    v-if="scope.$index!=2&&!isApproval"
                    type="number"
                    @input="setClientInfo(scope.row.val1)"
                    @blur="checkNaN(stageMainData[scope.row.val1],scope.row.val1)"
                    v-model="stageMainData[scope.row.val1]"
                  ></el-input>
                  <span v-else>{{stageMainData[scope.row.val1] | fixed}}</span>
                </template>
              </af-table-column>
              <af-table-column label="利润额(万元)" align="center" prop="num">
                <template slot-scope="scope">
                  <el-input
                    v-if="scope.$index!=2&&!isApproval"
                    type="number"
                    @input="setClientInfo(scope.row.val2)"
                    @blur="checkNaN(stageMainData[scope.row.val2],scope.row.val2)"
                    v-model="stageMainData[scope.row.val2]"
                  ></el-input>
                  <span v-else>{{stageMainData[scope.row.val2] | fixed}}</span>
                </template>
              </af-table-column>
              <af-table-column label="利润率(%)" align="center" prop="num">
                <template slot-scope="scope">
                  <el-input
                    v-if="scope.$index!=2&&!isApproval"
                    type="number"
                    @input="setClientInfo(scope.row.val3)"
                    @blur="checkNaN(stageMainData[scope.row.val3],scope.row.val3)"
                    v-model="stageMainData[scope.row.val3]"
                  ></el-input>
                  <span v-else>{{stageMainData[scope.row.val3] | fixed}}</span>
                </template>
              </af-table-column>
            </el-table>
          </div>
        </div>

        <h4
          v-show="isApplyDis=='1'||$route.query.BOID"
          v-if="!$route.query.BOID||disItemDataOld.length>0"
          style="padding-left:30px;height:40px;line-height:40px"
        >原有折扣政策明细</h4>
        <el-table
          border
          v-show="isApplyDis=='1'||$route.query.BOID"
          :data="disItemDataOld"
          style="width: 100%"
          v-if="!$route.query.BOID||disItemDataOld.length>0"
          :header-cell-style="orangeHead"
        >
          <el-table-column header-align="center" align="center" prop="policy_type" label="破底政策"></el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="policy_effective_time"
            label="政策有效时间"
          >
            <template slot-scope="scope">{{scope.row.policy_effective_time}}</template>
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="item_value_lossper"
            label="整盘货值折损率(%)"
          >
            <template slot-scope="scope">
              <el-input
                type="number"
                v-if="!isApproval"
                v-only-number="{min:0,precision:2}"
                v-model="scope.row.item_value_lossper"
              ></el-input>
              <span v-else>{{scope.row.item_value_lossper}}</span>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="iitem_profit_loss"
            label="战规版利润额折损(万元)"
          >
            <template slot-scope="scope">
              <el-input
                type="number"
                v-if="!isApproval"
                v-only-number="{min:0,precision:2}"
                v-model="scope.row.iitem_profit_loss"
              ></el-input>
              <span v-else>{{scope.row.iitem_profit_loss}}</span>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="iitem_netprofit_loss"
            label="战规版净利率折损率(%)"
          >
            <template slot-scope="scope">
              <el-input
                type="number"
                v-if="!isApproval"
                v-only-number="{min:0,precision:2}"
                v-model="scope.row.iitem_netprofit_loss"
              ></el-input>
              <span v-else>{{scope.row.iitem_netprofit_loss}}</span>
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" prop="policy_num" label="政策套数"></el-table-column>
          <el-table-column header-align="center" align="center" prop="choose_num" label="已使用套数"></el-table-column>
          <el-table-column header-align="center" align="center" prop="surplus_num" label="剩余套数"></el-table-column>
          <el-table-column header-align="center" align="center" prop="append_num" label="追加套数">
            <template slot="header">
              <span style="color:red">追加套数</span>
            </template>
            <template slot-scope="scope">
              <el-input
                type="number"
                @blur="countSum(scope.row,scope.row.append_num)"
                v-only-number="{min:0,natural:true}"
                v-model="scope.row.append_num"
                v-if="!isApproval"
              ></el-input>
              <span v-else>{{scope.row.append_num}}</span>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="policy_sum_num"
            label="政策套数合计"
          >
            <template slot-scope="scope">
              <span>{{scope.row.policy_sum_num}}</span>
            </template>
          </el-table-column>
          <af-table-column header-align="center" align="center" prop="build_name" label="楼栋">
             <template slot-scope="scope">
                            <div v-html="getBr(scope.row.build_name)"></div>
            </template>
          </af-table-column>
        </el-table>
        <h4
          v-show="isApplyDis=='1'||$route.query.BOID"
          style="padding-left:30px;position:relative;height:40px;margin-top:5px;line-height:40px"
          v-if="!$route.query.BOID||disItemDataNew.length>0"
        >
          新增折扣政策明细
          <el-button
            v-if="!isApproval"
            @click="addListData('addDis')"
            class="addBTN main xuHuiBtn"
          >新增</el-button>
        </h4>
        <el-table
          v-show="isApplyDis=='1'||$route.query.BOID"
          border
          :data="disItemDataNew"
          v-if="!$route.query.BOID||disItemDataNew.length>0"
          style="width: 100%"
        >
          <el-table-column header-align="center" align="center" prop="aaa" label="破底政策">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.policy_type"
                @change="discountRepetition(scope.row,scope.$index,'deleteDisItem')"
                placeholder="请选择"
                v-if="!isApproval"
              >
                <el-option
                  v-for="item in discount.options3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
              <span v-else>{{scope.row.policy_type}}</span>
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" prop="eee" label="政策有效时间">
            <template slot-scope="scope">
              <!-- <el-select v-model="scope.row.policy_effective_time"
                         @input="discountRepetition(scope.row,scope.$index,'deleteDisItem')" placeholder="请选择">
                <el-option
                  v-for="item in monthsData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>-->
              <el-date-picker
                style="width:100%"
                value-format="yyyy-MM"
                v-if="!isApproval"
                v-model="scope.row.policy_effective_time"
                type="month"
                placeholder="选择月"
                @change="checkTimeToday(scope.row.policy_effective_time,scope.row)"
              ></el-date-picker>
              <span v-else>{{scope.row.policy_effective_time}}</span>
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" prop="policy_num" label="套数">
            <template slot-scope="scope">
              <el-input
                type="number"
                v-only-number="{min:0,natural:true}"
                v-model="scope.row.policy_num"
                v-if="!isApproval"
              ></el-input>
              <span v-else>{{scope.row.policy_num}}</span>
            </template>
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="item_value_lossper"
            label="整盘货值折损率(%)"
          >
            <template slot-scope="scope">
              <el-input
                type="number"
                @change="discountRepetition(scope.row,scope.$index,'deleteDisItem')"
                v-model="scope.row.item_value_lossper"
                v-if="!isApproval"
              ></el-input>
              <span v-else>{{scope.row.item_value_lossper}}</span>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="iitem_profit_loss"
            label="战规版利润额折损(万元)"
          >
            <template slot-scope="scope">
              <el-input
                type="number"
                @change="discountRepetition(scope.row,scope.$index,'deleteDisItem')"
                v-model="scope.row.iitem_profit_loss"
                v-if="!isApproval"
              ></el-input>
              <span v-else>{{scope.row.iitem_profit_loss}}</span>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="iitem_netprofit_loss"
            label="战规版净利率折损率(%)"
          >
            <template slot-scope="scope">
              <el-input
                type="number"
                @change="discountRepetition(scope.row,scope.$index,'deleteDisItem')"
                v-model="scope.row.iitem_netprofit_loss"
                v-if="!isApproval"
              ></el-input>
              <span v-else>{{scope.row.iitem_netprofit_loss}}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="!isApproval"
            header-align="center"
            align="center"
            width="300"
            label="楼栋"
          >
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.build_id"
                multiple
                style="width:100%;overflow:hidden"
                @change="discountRepetition(scope.row,scope.$index,'deleteDisItem')"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in buildData"
                  :key="item.buildId"
                  :label="item.build_name"
                  :value="item.buildId"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <af-table-column v-else header-align="center" align="center" prop="build_name" label="楼栋">
            <template slot-scope="scope">
                            <div v-html="getBr(scope.row.build_name)"></div>
            </template>
          </af-table-column>
          <el-table-column header-align="center" v-if="!isApproval" align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                @click="delListData(scope.$index,'deleteDisItem')"
                style="color:red"
                type="text"
                v-if="!isApproval"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item title name="5" disabled>
        <template slot="title">
          <h3 class="form_item_title">附件</h3>
        </template>
        <div class="list" id="list">
          <div class="operation">
            <el-table
              :data="accessoryData"
              style="width: 100%"
              :header-cell-style="{background:'#F5F7FA',color:'#999'}"
            >
              <el-table-column prop="name" label="附件" align="left">
                <template slot-scope="scope">
                  <a :href="local+scope.row.url">{{scope.row.name}}</a>
                </template>
              </el-table-column>
              <el-table-column label="操作" v-if="!isApproval" align="center">
                <template slot-scope="scope">
                  <div class="fileBox" v-if="scope.$index<accessoryData.length-1">
                    <el-upload
                      v-if="!scope.row.name"
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
                      v-if="scope.row.name"
                      @click="delFielList(scope.$index)"
                    >删除</el-button>
                  </div>
                  <div class="fileBox" v-else>
                    <el-upload
                      :action="action"
                      :on-success="fileSuccess"
                      :data="{'filePath':'agingAndDiscount','bizID':'','orderIndex':scope.$index}"
                      :on-remove="fileRemove"
                      :on-error="fileError"
                    >
                      <el-button type="text">{{scope.row.handle}}</el-button>
                    </el-upload>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-collapse-item>
      <div class="btns">
        <Buttons />
      </div>
      <div class="buttonss" v-if="!isApproval">
        <div class="tops">
          <el-button @click="update('1')" v-if="!isApproval" type="primary">提交审批</el-button>
          <el-button @click="update('0')" v-if="!isApproval" type>保存</el-button>
        </div>
      </div>
    </el-collapse>
  </div>
</template>

<script>
let width = document.body.offsetWidth;
import {
  viewPackageDiscount,
  savePackageDiscount,
  getBuildDataByProjectId,
  get
} from "@/api/offerFlow";

export default {
  filters: {
    fixed: function(data) {
      if (!data) {
        return 0;
      } else if (isNaN(data)) {
        return 0;
      }
      return data.toFixed(2);
    }
  },
  components: {
    Buttons: () => import("../../views/offerFlow/component/index")
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
    isApproval() {
      if (this.$route.query.BOID) {
        return true;
      } else {
        return false;
      }
    }
  },
  data() {
    return {
      isPhone: width <= 1024,
      isApplyStage: "0",
      isApplyDis: "0",
      isShowStage: true,
      isShowDis: true,
      clientInfoList: [
        {
          type: "整盘(战规版)",
          val1: "rules_value",
          val2: "rules_margin",
          val3: "rules_per"
        },
        {
          type: "整盘(动态版)",
          val1: "dynamic_value",
          val2: "dynamic_margin",
          val3: "dynamic_per"
        },
        {
          type: "动态版对比战规版实现率(%)",
          val1: "realization_value",
          val2: "realization_margin",
          val3: "realization_per"
        }
      ],
      stageMainData: {
        applicant_name: "",
        department_name: "",
        applicant_time: "",
        project_id: ""
      },
      item_name: "",

      fileList__: [],

      project_id: "",
      activeNames: ["1", "2", "3", "4", "5"],
      aging: {
        textarea: "正文内容...",
        tableData1: [],
        tableData2: [],
        options3: [
          { label: "首付分期", value: "首付分期" },
          { label: "全款分期", value: "全款分期" }
        ],
        options6: [
          { label: "0-90", value: "0-90" },
          { label: "90天以上", value: "90天以上" },
          { label: "0-180", value: "0-180" },
          { label: "180天以上", value: "180天以上" }
        ]
      },

      discount: {
        textarea: "正文内容...",
        tableData1: [],
        tableData2: [],
        options1: [{ label: "12月", value: "12月" }],
        options2: [{ label: "3号楼(高层)", value: "3号楼(高层)" }],
        options3: [
          { label: "0-3%", value: "0-3%" },
          { label: "3%-5%", value: "3%-5%" },
          { label: "5%-10%", value: "5%-10%" },
          { label: "10%-20%", value: "10%-20%" },
          { label: "20%以上", value: "20%以上" }
        ]
      },
      accessoryData: [
        {
          type: "",
          handle: "上传"
        }
      ],
      stageTimeData: [
        {
          label: "",
          value: ""
        }
      ],
      stage_time_typeDataSF: [
        { label: "首付分期≤3个月", value: "首付分期≤3个月" },
        { label: "首付分期>3个月", value: "首付分期>3个月" }
      ],
      stage_time_typeDataQK: [
        { label: "全款分期≤6个月", value: "全款分期≤6个月" },
        { label: "全款分期>6个月", value: "全款分期>6个月" }
      ],
      stageDaysSF: [
        { label: "90天以上", value: "90天以上" },
        { label: "0～90天", value: "0～90天" }
      ],
      stageDaysQK: [
        { label: "180天以上", value: "180天以上" },
        { label: "0～180天", value: "0～180天" }
      ],
      stageDaysData: [],
      monthsData: [
        { label: "1月", value: new Date().getFullYear() + "-01" },
        { label: "2月", value: new Date().getFullYear() + "-02" },
        { label: "3月", value: new Date().getFullYear() + "-03" },
        { label: "4月", value: new Date().getFullYear() + "-04" },
        { label: "5月", value: new Date().getFullYear() + "-05" },
        { label: "6月", value: new Date().getFullYear() + "-06" },
        { label: "7月", value: new Date().getFullYear() + "-07" },
        { label: "8月", value: new Date().getFullYear() + "-08" },
        { label: "9月", value: new Date().getFullYear() + "-09" },
        { label: "10月", value: new Date().getFullYear() + "-10" },
        { label: "11月", value: new Date().getFullYear() + "-11" },
        { label: "12月", value: new Date().getFullYear() + "-12" }
      ],
      buildData: [],
      stageItemDataOld: [
        {
          //分期政策类别
          stage_policy_type: "",
          //分期时间类别
          stage_time_type: "",
          //政策有效时间
          policy_effective_time: "",
          //分期天数
          stage_days: "",
          //楼栋名称
          build_name: "",
          //政策套数
          policy_num: "",
          //已使用套数
          choose_num: "",
          //剩余套数
          surplus_num: "",
          //追加套数
          append_num: "",
          //政策套数合计
          policy_sum_num: ""
        }
      ],
      stageItemDataNew: [
        {
          //分期政策类别
          stage_policy_type: "",
          //分期时间类别
          stage_time_type: "",
          //政策有效时间
          policy_effective_time: "",
          //分期天数
          stage_days: "",
          //楼栋名称
          build_name: "",
          //政策套数
          policy_num: "",
          //已使用套数
          choose_num: "",
          //剩余套数
          surplus_num: "",
          //追加套数
          append_num: "",
          //政策套数合计
          policy_sum_num: ""
        }
      ],
      disItemDataOld: [
        {
          policy_type: "",
          policy_effective_time: "",
          build_name: "",
          iitem_profit_loss: "",
          iitem_netprofit_loss: "",
          item_value_lossper: "",
          policy_num: "",
          choose_num: "",
          surplus_num: "",
          append_num: "",
          policy_sum_num: "",
          package_stage_id: "",
          project_id: "",
          type: "",
          build_id: ""
        }
      ],
      disItemDataNew: [
        {
          policy_type: "",
          policy_effective_time: "",
          build_name: "",
          iitem_profit_loss: "",
          iitem_netprofit_loss: "",
          item_value_lossper: "",
          policy_num: "",
          choose_num: "",
          surplus_num: "",
          append_num: "",
          policy_sum_num: "",
          package_stage_id: "",
          project_id: "",
          type: "",
          build_id: ""
        }
      ],
      json_id: "",
      select1: 1,
      select2: 7,
      projectData: [{ ProjectName: "", projectId: "" }]
    };
  },
  watch: {
    isApplyDis(a, b) {
      if (a == "0") {
        let namelist = [
          "policy_type",
          "dynamic_margin",
          "dynamic_per",
          "dynamic_value",
          "rules_margin",
          "rules_per",
          "rules_value",
          "realization_value",
          "realization_margin",
          "realization_per"
        ];
        namelist.forEach((name, index) => {
          if (index == 0) {
            this.$set(this.stageMainData, name, "");
          } else {
            this.$set(this.stageMainData, name, "0");
          }
        });
        this.disItemDataNew = [];
        if (this.disItemDataOld.length > 0) {
          this.disItemDataOld.forEach(item => {
            this.$set(item, "append_num", "0");
            this.$set(item, "iitem_netprofit_loss", "0");
            this.$set(item, "iitem_profit_loss", "0");
            this.$set(item, "item_value_lossper", "0");
            this.$set(
              item,
              "policy_sum_num",
              item.policy_num + Number(item.append_num)
            );
          });
        }
      }
    },
    isApplyStage(a, b) {
      if (a == "0") {
        if (this.stageItemDataOld.length > 0) {
          this.stageItemDataOld.forEach(item => {
            this.$set(item, "append_num", "0");
            this.$set(
              item,
              "policy_sum_num",
              item.policy_num + Number(item.append_num)
            );
          });
        }
      }
    }
  },
  methods: {
    reload() {
      this.viewPackageDiscount();
    },
    getBr(str) {
      let arr = str.split(",");
      let temparr=''
      arr.forEach((item,index)=>{
        if(index==0){
        temparr+=item
        }else{
        temparr+="<br/>"+item
        }
      })
      return temparr;
    },
    selectProject: function(project_id) {
      let filter = this.projectData.filter(
        item => item.projectId == project_id
      );
      this.item_name =
        "关于" + filter[0].ProjectName + "的一揽子分期折扣政策申请";
      this.stageMainData.project_id = project_id;
      this.stageMainData.project_name = this.projectData.find(
        item => item.projectId == project_id
      ).ProjectName;
      console.log(this.stageMainData, "this.stageMainData");
      this.stageItemDataNew.map(item => {
        (item.build_id = ""), (item.build_name = "");
      });
      this.disItemDataNew.map(item => {
        (item.build_id = ""), (item.build_name = "");
      });
      //根据项目切换楼栋
      this.getBuildDataByProjectId(project_id);
    },
    getBuildDataByProjectId(project_id) {
      getBuildDataByProjectId({
        project_id: project_id,
        json_id: this.$route.query.json_id || ""
      }).then(res => {
        if (res.code == 200) {
          //更新楼栋数据
          this.buildData = res.result.buildData;
          this.stageItemDataOld = res.result.stageItemDataOld;
          this.disItemDataOld = res.result.disItemDataOld;
        } else if (res.code == 0) {
          this.$notify.warning({
            title: "提示",
            message: res.messages
          });
        }
      });
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
          type: "上传",
          // handle: "上传",
          name: res.data.name,
          id: res.data.id,
          url: res.data.url
        });
        this.accessoryData.push(temp);
      }
    },
    delFielList(idx) {
      this.accessoryData.splice(idx, 1);
    },
    exceed(files, fileList) {
      this.$message.warning(`当前限制选择1个文件`);
    },
    fileRemove(file, fileList) {},
    fileError() {
      this.$message.error("上传失败");
    },
    changeStageTime(row) {
      if (row.stage_time_type) {
        this.$set(row, "stage_time_type", "");
      }
      if (row.stage_policy_type == "全款分期") {
        this.stageTimeData = this.stage_time_typeDataQK;
        this.stageDaysData = this.stageDaysQK;
      } else if (row.stage_policy_type == "首付分期") {
        this.stageTimeData = this.stage_time_typeDataSF;
        this.stageDaysData = this.stageDaysSF;
      }
    },
    changeStageDay(row) {
      if (row.stage_time_type == "首付分期>3个月") {
        this.$set(row, "stage_days", "90天以上");
      } else if (row.stage_time_type == "首付分期≤3个月") {
        this.$set(row, "stage_days", "0～90天");
      } else if (row.stage_time_type == "全款分期≤6个月") {
        this.$set(row, "stage_days", "0～180天");
      } else if (row.stage_time_type == "全款分期>6个月") {
        this.$set(row, "stage_days", "180天以上");
      }
    },
    spanCurrage({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 4) {
        if (rowIndex == 0) {
          return [3, 1];
        } else {
          return [0, 0];
        }
      }
    },
    countSum(obj, value) {
      if (parseInt(value) < 0 || isNaN(parseInt(value))) {
        return;
      }
      this.$set(obj, "policy_sum_num", Number(obj.policy_num) + Number(value));
    },
    setClientInfo(type) {
      if (type == "rules_value" || type == "dynamic_value") {
        console.log(this.stageMainData.dynamic_value);

        if (this.stageMainData.rules_value != 0) {
          this.$set(
            this.stageMainData,
            "realization_value",
            isNaN(
              Number(this.stageMainData.dynamic_value) /
                Number(this.stageMainData.rules_value)
            )
              ? 0
              : (Number(this.stageMainData.dynamic_value) /
                  Number(this.stageMainData.rules_value)) *
                  100
          );
        } else {
          this.stageMainData.realization_value = 0;
        }
      } else if (type == "rules_margin" || type == "dynamic_margin") {
        if (this.stageMainData.rules_margin != 0) {
          this.$set(
            this.stageMainData,
            "realization_margin",
            isNaN(
              Number(this.stageMainData.dynamic_margin) /
                Number(this.stageMainData.rules_margin)
            )
              ? 0
              : (Number(this.stageMainData.dynamic_margin) /
                  Number(this.stageMainData.rules_margin)) *
                  100
          );
        } else {
          this.stageMainData.realization_margin = 0;
        }
      } else if (type == "rules_per" || type == "dynamic_per") {
        if (this.stageMainData.rules_per != 0) {
          this.$set(
            this.stageMainData,
            "realization_per",
            isNaN(
              Number(this.stageMainData.dynamic_per) /
                Number(this.stageMainData.rules_per)
            )
              ? 0
              : (Number(this.stageMainData.dynamic_per) /
                  Number(this.stageMainData.rules_per)) *
                  100
          );
        } else {
          this.stageMainData.realization_per = 0;
        }
      }
    },
    viewPackageDiscount(json_id) {
      let id = this.$route.query.json_id || json_id;
      if (this.$route.query.BOID) {
        id = this.$route.query.BOID;
      }
      viewPackageDiscount({
        json_id: id
      }).then(res => {
        console.log(res);
        this.stageMainData = { ...res.result.stageMainData };
        this.isShowStage = res.result.stageMainData.isShowStage;
        this.isShowDis = res.result.stageMainData.isShowDis;
        this.isApplyStage =
          res.result.stageMainData.isShowStage == 1 ? "1" : "0";
        this.isApplyDis = res.result.stageMainData.isShowDis == 1 ? "1" : "0";
        this.projectData = res.result.projectData;
        //默认选择第一个项目
        this.project_id = res.result.projectData[0].projectId;
        this.stageMainData.project_id = res.result.projectData[0].projectId;
        this.stageMainData.project_name = res.result.projectData[0].ProjectName;
        this.item_name =
          "关于" + this.stageMainData.project_name + "的一揽子分期折扣政策申请";
        if (res.result.stageItemDataNew) {
          this.stageItemDataNew = res.result.stageItemDataNew;
          this.stageItemDataNew.forEach(lv1 => {
            if (lv1.build_id) {
              lv1.build_id = lv1.build_id.split(",");
            }
          });
        } else {
          this.stageItemDataNew = [];
        }
        if (res.result.disItemDataNew) {
          this.disItemDataNew = res.result.disItemDataNew;
          this.disItemDataNew.forEach(lv1 => {
            if (lv1.build_id) {
              lv1.build_id = lv1.build_id.split(",");
            }
          });
        } else {
          this.disItemDataNew = [];
        }
        if (res.result.stageItemDataOld) {
          this.stageItemDataOld = res.result.stageItemDataOld;
        } else {
          this.stageItemDataOld = [];
        }
        if (res.result.disItemDataOld) {
          this.disItemDataOld = res.result.disItemDataOld;
        } else {
          this.disItemDataOld = [];
        }
        //楼栋
        this.buildData = res.result.buildData;
        let arr5 = res.result.fileList;
        this.accessoryData = [
          {
            type: "",
            handle: "上传"
          }
        ];
        if (arr5.length > 0) {
          let temp = this.accessoryData.pop();
          arr5.forEach((item, index) => {
            this.accessoryData.push({
              type: "上传",
              handle: "上传",
              id: item.id,
              name: item.name,
              url: item.url,
              orderIndex: item.orderIndex
            });
          });
          this.accessoryData.push(temp);
        }
        console.log(this.stageMainData);
      });
    },
    update(type) {
      //按钮类型
      var button;
      //提交审批
      if (type == "1") {
        button = "submit";
        this.savePackageDiscount(button);
      } else {
        button = "save";
        this.savePackageDiscount(button);
      }
      //调用接口
    },
    savePackageDiscount(button) {
      this.stageMainData.item_name = this.item_name;

      if (button == "submit") {
        if (!this.stageMainData.content) {
          this.$message.error("申请正文未填写");
          return;
        }
        if (
          this.disItemDataOld.length > 0 &&
          !this.stageMainData.policy_type &&
          this.disItemDataOld.some(item => item.append_num > 0)
        ) {
          this.$message.error("破底政策必填项未填写");
          return;
        }
        let disItemFlag = true;
        let nameList = [
          "build_id",
          "policy_type",
          "policy_effective_time",
          "iitem_netprofit_loss",
          "iitem_profit_loss",
          "item_value_lossper",
          "policy_num"
        ];
        if (this.disItemDataNew.length > 0) {
          this.disItemDataNew.forEach(item => {
            nameList.forEach((name, idx) => {
              if (idx == 0) {
                if (item[name].length == 0 && disItemFlag) {
                  disItemFlag = false;
                  return;
                }
              } else if (!item[name] && item[name] !== 0 && disItemFlag) {
                disItemFlag = false;
                return;
              }
            });
          });
        }
        if (!disItemFlag) {
          this.$message.error("新增折扣数据未填写完整");
          return;
        }
        let stageItemFlag = true;
        let itemList = [
          "build_id",
          "policy_effective_time",
          "policy_num",
          "stage_days",
          "stage_policy_type",
          "stage_time_type"
        ];
        if (this.stageItemDataNew.length > 0) {
          if (this.stageItemDataNew.length > 0) {
            this.stageItemDataNew.forEach(item => {
              itemList.forEach((name, idx) => {
                if (idx == 0) {
                  if (item[name].length == 0 && stageItemFlag) {
                    stageItemFlag = false;
                    return;
                  }
                } else if (!item[name] && item[name] !== 0 && stageItemFlag) {
                  stageItemFlag = false;
                  return;
                }
              });
            });
          }
        }
        if (!stageItemFlag) {
          this.$message.error("新增分期数据未填写完整");
          return;
        }
        let targetFlag = true;
        let targetName = [
          "dynamic_margin",
          "dynamic_per",
          "dynamic_value",
          "rules_margin",
          "rules_per",
          "rules_value"
        ];
        targetName.forEach(name => {
          console.log(this.stageMainData[name]);

          if (
            !this.stageMainData[name] &&
            targetFlag &&
            this.stageMainData.policy_type
          ) {
            targetFlag = false;
            return;
          }
        });
        if (!targetFlag) {
          this.$message.error("经营指标现状未填写完整");
          return;
        }
        if (this.isApplyStage == "1") {
          if (
            this.stageItemDataNew.length == 0 &&
            this.stageItemDataOld.every(
              item => !item.append_num || item.append_num == 0
            )
          ) {
            this.$message.error("请追加分期政策信息的套数或添加新增分期政策");
            return;
          }
        }
        if (this.isApplyDis == "1") {
          if (
            this.disItemDataNew.length == 0 &&
            this.disItemDataOld.every(
              item => !item.append_num || item.append_num == 0
            )
          ) {
            this.$message.error("请追加折扣政策信息的套数或添加新增折扣政策");
            return;
          }
        }
      }
      this.stageItemDataNew.forEach(lv1 => {
        let str = "";
        lv1.build_id.forEach(id => {
          str +=
            this.buildData.find(item => item.buildId == id).build_name + ",";
        });
        lv1.build_name = str.substr(0, str.length - 1);
        lv1.build_id = lv1.build_id.join(",");
      });
      this.disItemDataNew.forEach(lv1 => {
        let str = "";
        lv1.build_id.forEach(id => {
          str +=
            this.buildData.find(item => item.buildId == id).build_name + ",";
        });
        lv1.build_name = str.substr(0, str.length - 1);
        lv1.build_id = lv1.build_id.join(",");
      });
      savePackageDiscount({
        button: button,
        project_id: this.project_id,
        stageMainData: this.stageMainData,
        stageItemDataOld: this.stageItemDataOld,
        stageItemDataNew: this.stageItemDataNew,
        disItemDataOld: this.disItemDataOld,
        isApplyStage: this.isApplyStage,
        isApplyDis: this.isApplyDis,
        disItemDataNew: this.disItemDataNew,
        fileList: this.accessoryData
      }).then(res => {
        if (res.code == 200) {
          if (button == "submit") {
            //提交审批并调整预览页面
            get(
              `/Workflow/MTStart2.aspx?BSID=My_Sales&BTID=${res.result.BTID}&BOID=${res.result.BOID}&UserID=${res.result.UserID}&LoginKey=${res.result.LoginKey}`
            ).then(res => {
              if (res.code == 200 || res.result.code == 200) {
                window.open(res.data);
                this.$router.push("/discount/installment");
              } else {
                this.$message.error(res.messages || res.result.messages);
              }
            });
          } else {
            this.$message.success("保存成功");
            this.viewPackageDiscount(res.result.BOID);
          }
        } else if (res.code == 0) {
          this.$alert(res.messages, {
            confirmButtonText: "确定"
          });
        } else {
          this.$message({
            message: res.messages,
            type: "error"
          });
        }
      });
    },
    checkNaN(val, name) {
      if (isNaN(val) || val === "") {
        this.$set(this.stageMainData, name, 0);
      } else {
        this.$set(this.stageMainData, name, val.toFixed(2));
      }
    },
    changePDtype(type) {
      if (type == "一揽子破底政策审批(3个点以内)") {
        this.discount.options3 = [
          { label: "0-3%", value: "0-3%" }
          // { label: "3%-5%", value: "3%-5%" },
          // { label: "5%-10%", value: "5%-10%" },
          // { label: "10%-20%", value: "10%-20%" },
          // { label: "20%以上", value: "20%以上" }
        ];
      } else {
        this.discount.options3 = [
          { label: "0-3%", value: "0-3%" },
          { label: "3%-5%", value: "3%-5%" },
          { label: "5%-10%", value: "5%-10%" },
          { label: "10%-20%", value: "10%-20%" },
          { label: "20%以上", value: "20%以上" }
        ];
      }
    },
    collapseChange(val) {
      // console.log(val);
    },
    addListData(type) {
      console.log(this.stageMainData);
      if (!this.stageMainData.policy_type && type == "addDis") {
        this.$message.error("破底政策类型未填写");
        return;
      }
      //新增分期
      if (type == "addStage") {
        this.stageItemDataNew.push({
          //分期政策类别
          stage_policy_type: "",
          //分期时间类别
          stage_time_type: "",
          //政策有效时间
          policy_effective_time: "",
          //分期天数
          stage_days: "",
          //楼栋名称
          build_name: "",
          //政策套数
          policy_num: "",
          //已使用套数
          choose_num: "",
          //剩余套数
          surplus_num: "",
          //追加套数
          append_num: "",
          //政策套数合计
          policy_sum_num: ""
        });
      }
      //新增折扣
      else if (type == "addDis") {
        this.disItemDataNew.push({
          policy_type: "",
          policy_effective_time: "",
          build_name: "",
          iitem_profit_loss: "",
          iitem_netprofit_loss: "",
          item_value_lossper: "",
          policy_num: "",
          choose_num: "",
          surplus_num: "",
          append_num: "",
          policy_sum_num: "",
          package_stage_id: "",
          project_id: "",
          type: "",
          build_id: ""
        });
      }
    },

    delListData(index, type) {
      // console.log(row);
      if (type == "deleteStageItem") {
        this.stageItemDataNew.splice(index, 1);
      } else {
        this.disItemDataNew.splice(index, 1);
      }
    },
    orangeHead({ row, column, rowIndex, columnIndex }) {
      // console.log(column);
      if (column.property == "zzz") {
        return { color: "orange" };
      }
    },
    checkRepetition(row, idx, name) {
      console.log(123);

      let flag = false;
      this.stageItemDataOld.forEach(item => {
        if (
          item.stage_policy_type == row.stage_policy_type &&
          item.stage_time_type == row.stage_time_type &&
          item.policy_effective_time == row.policy_effective_time &&
          item.stage_days == row.stage_days &&
          item.build_id == row.build_id
        ) {
          flag = true;
        }
      });
      if (flag) {
        this.$alert("与原有政策一致，直接追加套数即可", "提示", {
          confirmButtonText: "确定",
          callback: action => {
            this.delListData(idx, name);
          }
        });
      }
    },
    discountRepetition(row, idx, name) {
      let flag = false;
      this.disItemDataOld.forEach(item => {
        if (
          item.policy_type == row.policy_type &&
          item.policy_effective_time == row.policy_effective_time &&
          item.build_id == row.build_id
        ) {
          flag = true;
        }
      });
      if (flag) {
        this.$alert("与原有政策一致，直接追加套数即可", "提示", {
          confirmButtonText: "确定",
          callback: action => {
            this.delListData(idx, name);
          }
        });
      }
    },
    checkTimeToday(time, row) {
      if (!time) {
        return;
      }
      let flag = true;
      if (new Date(time).getMonth() < new Date().getMonth()) {
        // flag = false;
        if (new Date(time).getFullYear() <= new Date().getFullYear()) {
          flag = false;
        }
      } else {
        if (new Date(time).getFullYear() < new Date().getFullYear()) {
          flag = false;
        }
      }

      if (!flag) {
        this.$set(row, "policy_effective_time", "");
        this.$message.warning("时间不得小于当前月份");
      }
    }
  },
  created() {
    this.viewPackageDiscount();
  },
  updated(){
    console.log(this.$parent.$el.offsetHeight,"this.$parent.$el.offsetHeight");
    let timeid = setTimeout(() => {
      if (window.cifioa) {
        console.log(this.$parent.$el.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$parent.$el.offsetHeight
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
.agingAndDiscount {
  margin: 0 20px;
  ::v-deep .el-table tbody td {
    min-height: 35px;
  }
}
.form_item_title {
  border-left: 3px solid #2661ff;
  height: 20px;
  line-height: 20px;
  text-indent: 1em;
  margin-left: 15px;
}
::v-deep .el-upload-list {
  display: none;
}
.el-upload-list {
  display: none !important;
}
.el-table {
  margin: 0 20px;
}
@media (max-width: 1024px) {
  .el-table {
    margin: 0;
  }
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

::v-deep input[type="number"] {
  -moz-appearance: textfield;
}

.addBTN {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  color: #fff !important;
}
.radiospan {
  margin: 0 10px;
}
.buttonss {
  width: 100%;
  margin: 0 auto;
  margin-left: 40%;
  height: 100px;
  display: flex;
  .tops {
    margin-top: 10px;
    margin-right: 10px;
  }
}
</style>
