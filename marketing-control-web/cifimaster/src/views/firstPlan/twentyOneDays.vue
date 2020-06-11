<template>
  <div class="twentyOneDays">
    <navbarLink></navbarLink>
    <div class="headerFixed">
      <div class="top" v-if="isType != 'view'">
        <div class="right-btn">
          <el-button @click="$router.push({ path: '/planWrite' })">返回列表</el-button>
          <el-button
            @click="toPreview"
            v-if="approval_stuat == 3 || approval_stuat == 4"
            v-show="activeTab == 2"
          >查看审批</el-button>
          <el-button @click="toPreview" v-if="readonly" v-show="activeTab == 1">查看审批</el-button>
          <el-button
            @click="createVersion"
            type="primary"
            v-show="!$route.query.disabled"
            v-if="activeTab == 1 && isShowVersion"
          >创建版本</el-button>
          <el-button
            @click="createVersion"
            type="primary"
            v-show="!$route.query.disabled"
            v-if="
              activeTab == 2 && (approval_stuat == 4 || approval_stuat == 3)
            "
          >创建版本</el-button>
          <el-button v-show="activeTab == 1 && versions" @click="exportDelayData">导出</el-button>
          <el-button @click="exportDelayData" v-show="activeTab == 2 && thisVserion">导出</el-button>
        </div>
        <el-form label-width="80px" ref="form" v-show="activeTab == 1">
          <el-form-item label="选择版本:">
            <el-select @change="changeVersion()" placeholder="请选择版本" v-model="versions">
              <el-option
                :key="index"
                :label="item.name"
                :value="item.flow_id"
                v-for="(item, index) in versionsList"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form :model="form" label-width="80px" ref="form" v-show="activeTab == 2">
          <el-form-item label="选择版本:">
            <el-select @change="switchVersion()" placeholder="请选择版本" v-model="thisVserion">
              <el-option
                :key="index"
                :label="item.name"
                :value="item.id"
                v-for="(item, index) in versionData"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="tabsFlxed" :class="{isViewFixed:$route.query.type == 'view'}">
        <el-tabs @tab-click="tabClick" v-model="activeTab">
          <el-tab-pane label="客储达成进度" name="1">
            <div class="link">
              <el-button @click="scrollLink('node')" type="text">节点客储计划</el-button>
              <el-button @click="scrollLink('come')" type="text">来访周拆分</el-button>
              <el-button @click="scrollLink('node_')" type="text" v-show="isCheck">变更节点客储计划</el-button>
              <el-button @click="scrollLink('come_')" type="text" v-show="isCheck">变更来访周拆分</el-button>
              <el-button @click="scrollLink('card')" type="text" v-show="isCheck">办卡方式</el-button>
              <el-button @click="scrollLink('list')" type="text">附件清单</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="延期开盘申请" name="2">
            <div class="link">
              <el-button @click="scrollLink('open')" type="text">延期开盘申请表</el-button>
              <el-button @click="scrollLink('rate')" type="text">客储达成进度</el-button>
              <el-button @click="scrollLink('chageNode')" type="text">变更节点客储计划</el-button>
              <el-button @click="scrollLink('card_2')" type="text">办卡方式</el-button>
              <el-button @click="scrollLink('chageCome')" type="text">变更来访周拆分</el-button>
              <el-button @click="scrollLink('lists')" type="text">附件清单</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <div class="null" style="height:105px" v-if="isType == 'view'"></div>
    <div style="height:145px" v-else></div>
    <div class="containter" id="containter" :class="{ isView: isType == 'view' }">
      <el-tabs @tab-click="tabClick" v-model="activeTab">
        <el-tab-pane name="1">
          <!-- label="客储达成进度"  -->
          <!-- <div class="link">
            <el-button @click="scrollLink('node')" type="text"
              >节点客储计划</el-button
            >
            <el-button @click="scrollLink('come')" type="text"
              >来访周拆分</el-button
            >
            <el-button @click="scrollLink('node_')" type="text" v-show="isCheck"
              >变更节点客储计划</el-button
            >
            <el-button @click="scrollLink('come_')" type="text" v-show="isCheck"
              >变更来访周拆分</el-button
            >
            <el-button @click="scrollLink('card')" type="text" v-show="isCheck"
              >办卡方式</el-button
            >
            <el-button @click="scrollLink('list')" type="text"
              >附件清单</el-button
            >
          </div>-->
          <div class="node" id="node">
            <p class="bold">
              节点客储计划
              <el-checkbox :disabled="readonly" v-model="isCheck">
                <span style="font-size:14px;color:#333">变更客储计划</span>
              </el-checkbox>
              <span class="time">数据更新日期：{{ createTime }}</span>
            </p>
            <el-table
              :data="nodeData"
              :header-cell-style="{ background: '#F5F7FA', color: '#999' }"
              :span-method="mergeCol"
              border
              style="width: 100%"
            >
              <el-table-column align="center" label="节点" prop="nide_name" width="160"></el-table-column>
              <el-table-column align="center" label="日期" prop="node_time" width="160"></el-table-column>
              <el-table-column align="center" label prop="line_name"></el-table-column>
              <el-table-column align="center" label="报备(组)" prop="report_num"></el-table-column>
              <el-table-column align="center" label="来访(组)" prop="visit_num"></el-table-column>
              <el-table-column align="center" label="小卡(组)" prop="little_num"></el-table-column>
              <el-table-column align="center" label="小卡率(%)">
                <!-- prop="little_per" -->
                <template slot-scope="scope">
                  <span>{{scope.row.little_per + '%'}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="大卡(组)" prop="big_num"></el-table-column>
              <el-table-column align="center" label="大卡率(%)">
                <!--  prop="big_per" -->
                <template slot-scope="scope">
                  <span>{{scope.row.big_per + '%'}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="认购(套)" prop="sub_num"></el-table-column>
              <el-table-column align="center" label="成交率(%)">
                <template slot-scope="scope">
                  <!-- prop="make_per" -->
                  <span>{{scope.row.make_per + '%'}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="come" id="come">
            <p class="bold">来访周拆分</p>
            <el-table
              :data="comeData"
              :header-cell-style="{ background: '#F5F7FA', color: '#999' }"
              :span-method="mergeSpan"
              border
              style="width: 100%"
            >
              <el-table-column align="center" label="周期" prop="week" width="160"></el-table-column>
              <el-table-column align="center" label="日期" prop="day_date" width="190"></el-table-column>
              <el-table-column align="center" label="计划新增(组)" prop="plan_add">
                <template slot-scope="scope">
                  <span v-if="scope.row.week == '完整波段'">{{ allSum }}</span>
                  <span v-else>{{ scope.row.plan_add }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="计划累计(组)" prop="plan_total"></el-table-column>
              <el-table-column align="center" label="计划阶段任务占比(%)">
                <!-- prop="plan_task_per" -->
                <template slot-scope="scope">
                  <span>{{ scope.row.plan_task_per + '%' }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="实际新增(组)" prop="actual_add">
                <template slot-scope="scope">
                  <span v-if="scope.row.week == '完整波段'">{{ allRate }}</span>
                  <span v-else>{{ scope.row.actual_add }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="实际累计(组)" prop="actual_total"></el-table-column>
              <el-table-column align="center" label="实际阶段任务占比(%)">
                <!--  prop="actual_task_per" -->
                <template slot-scope="scope">
                  <span>{{ scope.row.actual_task_per + '%' }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="绝对偏差值" prop="bias_value"></el-table-column>
              <el-table-column align="center" label="偏差率" prop="bias_per"></el-table-column>
              <el-table-column align="center" label="偏差原因" prop="bias_cause" width="200">
                <template slot-scope="scope">
                  <el-input
                    v-if="
                      scope.row.causeisWrite == 1 &&
                        scope.row.week !== '完整波段' &&
                        !readonly
                    "
                    v-model="scope.row.bias_cause"
                  ></el-input>

                  <span v-else>{{ scope.row.bias_cause }}</span>
                </template>
              </el-table-column>
            </el-table>
            <span style="color:red;font-size:14px;">注：因四舍五入，计划阶段任务占比会存在合计值与100%有偏差。</span>
          </div>
          <div class="node" id="node_" v-show="isCheck">
            <p class="bold">变更节点客储计划</p>
            <el-table
              :data="nodePlan"
              :header-cell-style="{ background: '#F5F7FA', color: '#999' }"
              border
              style="width: 100%"
            >
              <el-table-column align="center" label="节点" prop="nide_name" width="160"></el-table-column>
              <el-table-column align="center" label="日期" prop="node_time" width="160"></el-table-column>
              <el-table-column align="center" label prop="line_name"></el-table-column>
              <el-table-column align="center" label="报备(组)" prop="report_num">
                <template slot-scope="scope">
                  <el-input
                    @change="setSum(scope.row)"
                    type="number"
                    v-if="node_level < scope.row.node_level && !readonly"
                    v-model="scope.row.report_num"
                    v-only-number="{ min: 0 }"
                  ></el-input>
                  <span v-else>{{ scope.row.report_num }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="来访(组)" prop="visit_num">
                <template slot-scope="scope">
                  <el-input
                    @change="setSum(scope.row)"
                    type="number"
                    v-if="node_level < scope.row.node_level && !readonly"
                    v-model="scope.row.visit_num"
                    v-only-number="{ min: 0 }"
                  ></el-input>
                  <span v-else>{{ scope.row.visit_num }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="小卡(组)" prop="little_num">
                <template slot-scope="scope">
                  <span>{{ scope.row.little_num }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="小卡率(%)" prop="little_per">
                <template slot-scope="scope">
                  <el-input
                    @change="setSum(scope.row)"
                    type="number"
                    v-if="node_level < scope.row.node_level && !readonly"
                    v-model="scope.row.little_per"
                    v-only-number="{ min: 0, precision: 2 }"
                  ></el-input>
                  <span v-else>
                    {{
                    isNaN(scope.row.little_per) ? 0 : scope.row.little_per
                    }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="大卡(组)" prop="big_num">
                <template slot-scope="scope">
                  <span>{{ scope.row.big_num }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="大卡率(%)" prop="big_per">
                <template slot-scope="scope">
                  <el-input
                    @change="setSum(scope.row)"
                    type="number"
                    v-if="node_level < scope.row.node_level && !readonly"
                    v-model="scope.row.big_per"
                    v-only-number="{ min: 0, precision: 2 }"
                  ></el-input>
                  <span v-else>
                    {{
                    isNaN(scope.row.big_per) ? 0 : scope.row.big_per
                    }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="认购(套)" prop="sub_num">
                <template slot-scope="scope">
                  <el-input
                    @change="setSum(scope.row)"
                    type="number"
                    v-if="node_level < scope.row.node_level && !readonly"
                    v-model="scope.row.sub_num"
                    v-only-number="{ min: 0 }"
                  ></el-input>
                  <span v-else>{{ scope.row.sub_num }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="成交率(%)" prop="make_per">
                <template slot-scope="scope">
                  {{
                  isNaN(scope.row.make_per) ? 0 : scope.row.make_per
                  }}
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="come" id="come_" v-show="isCheck">
            <p class="bold">变更来访周拆分</p>
            <el-table
              :data="comeDataCopy"
              :header-cell-style="{ background: '#F5F7FA', color: '#999' }"
              :span-method="mergeSpan"
              border
              style="width: 100%"
            >
              <el-table-column align="center" label="周期" prop="week" width="160"></el-table-column>
              <el-table-column align="center" label="日期" prop="day_date" width="160"></el-table-column>
              <el-table-column align="center" label="计划新增(组)" prop="plan_add">
                <template slot-scope="scope">
                  <el-input
                    v-if="
                      scope.row.isWrite == 1 &&
                        scope.row.week !== '完整波段' &&
                        !readonly
                    "
                    v-model="scope.row.plan_add"
                    v-only-number="{ min: 0 }"
                    @input.native="
                      scope.row.plan_add = parseInt(scope.row.plan_add)
                    "
                    type="number"
                  ></el-input>
                  <span v-else-if="scope.row.week == '完整波段'">
                    {{
                    come_sum
                    }}
                  </span>
                  <span v-else>{{ scope.row.plan_add }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="计划累计(组)" prop="plan_total"></el-table-column>
              <el-table-column align="center" label="计划阶段任务占比(%)" prop="plan_task_per">
                <template slot-scope="scope">
                  <span>{{ scope.row.plan_task_per }}</span>
                </template>
              </el-table-column>
            </el-table>
            <span style="color:red;font-size:14px;">注：因四舍五入，计划阶段任务占比会存在合计值与100%有偏差。</span>
          </div>
          <div class="card" id="card" v-show="isCheck">
            <p class="bold">办卡方式</p>
            <el-form :model="cardForm" class="cardForm" label-width="60px" ref="cardForm">
              <el-form-item label="小卡" prop="small">
                <el-input
                  maxlength="100"
                  show-word-limit
                  type="textarea"
                  v-if="!readonly"
                  v-model="cardForm.little_way"
                ></el-input>
                <span v-else>{{ cardForm.little_way }}</span>
              </el-form-item>
              <el-form-item label="大卡" prop="big">
                <el-input
                  maxlength="100"
                  show-word-limit
                  type="textarea"
                  v-if="!readonly"
                  v-model="cardForm.big_way"
                ></el-input>
                <span v-else>{{ cardForm.big_way }}</span>
              </el-form-item>
            </el-form>
          </div>
          <div class="list" id="list">
            <p class="bold">附件清单</p>
            <div class="operation">
              <el-table
                :data="accessoryData"
                :header-cell-style="{ background: '#F5F7FA', color: '#999' }"
                style="width: 100%"
              >
                <el-table-column align="left" label="附件名称" prop="type" width="200"></el-table-column>
                <el-table-column align="left" label="附件" prop="name">
                  <template slot-scope="scope">
                    <a :href="local + scope.row.url">{{ scope.row.name }}</a>
                  </template>
                </el-table-column>
                <el-table-column align="center" width="120" label="操作">
                  <template slot-scope="scope">
                    <div class="fileBox" v-if="scope.$index < accessoryData.length - 1">
                      <el-upload
                        :action="action"
                        :data="{
                          filePath: 'salesOffice',
                          bizID: '',
                          orderIndex: scope.$index
                        }"
                        :file-list="fileList__[scope.$index]"
                        :on-error="fileError"
                        :on-exceed="exceed"
                        :on-remove="fileRemove"
                        :on-success="fileSuccess"
                        v-if="!readonly && !scope.row.name"
                      >
                        <el-button type="text">
                          {{
                          scope.row.handle
                          }}
                        </el-button>
                      </el-upload>
                      <el-button
                        @click="delFielList(scope.$index)"
                        type="text"
                        v-if="!readonly && scope.row.name"
                      >删除</el-button>
                    </div>
                    <div class="fileBox" v-else>
                      <el-upload
                        :action="action"
                        :data="{
                          filePath: 'twentyOneDays',
                          bizID: '',
                          orderIndex: scope.$index
                        }"
                        :on-error="fileError"
                        :on-remove="fileRemove"
                        :on-success="fileSuccess"
                      >
                        <el-button type="text" v-if="!readonly">
                          {{
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
        </el-tab-pane>

        <el-tab-pane name="2">
          <!-- label="延期开盘申请" -->
          <!-- <div class="link">
            <el-button @click="scrollLink('open')" type="text"
              >延期开盘申请表</el-button
            >
            <el-button @click="scrollLink('rate')" type="text"
              >客储达成进度</el-button
            >
          </div>-->
          <div class="open" id="open">
            <p class="bold">延期开盘申请表</p>
            <div class="table">
              <div class="table_top">
                <div class="left">日期调整</div>
                <div>
                  <div :key="index" class="_cell" v-for="(item, index) in dateList">{{ item.type }}</div>
                </div>
                <div>
                  <div :key="index" class="_cell" v-for="(item, index) in dateList">
                    <span v-if="index != 4">
                      {{
                      openApplyData[item.date]
                      }}
                    </span>
                    <el-date-picker
                      @change="countDate(openApplyData.new_first_time)"
                      format="yyyy-MM-dd"
                      placeholder="选择日期"
                      type="date"
                      v-else-if="
                        index == 4 && approval_stuat != 4 && approval_stuat != 3
                      "
                      v-model="openApplyData.new_first_time"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                    <span v-else>{{ openApplyData.new_first_time }}</span>
                  </div>
                </div>
              </div>
              <div class="table_bottom">
                <div class="left">延期原因</div>
                <div>
                  <el-input
                    type="textarea"
                    v-if="approval_stuat != 4 && approval_stuat != 3"
                    v-model="openApplyData.delay_reasons"
                  ></el-input>
                  <span v-else>{{ openApplyData.delay_reasons }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="rate" id="rate">
            <p class="bold">客储达成进度</p>
            <el-table
              :data="firstReportData"
              :header-cell-style="{ background: '#F5F7FA', color: '#999' }"
              :span-method="mergeRow"
              border
              style="width: 100%"
            >
              <el-table-column label prop="type" width="180">
                <template slot-scope="scope">
                  <div class="db_cell" width="100">{{ scope.row.type }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="name">
                <template slot-scope="scope" width="100">
                  <div class="db_cell">{{ scope.row.name1 }}</div>
                </template>
              </el-table-column>
              <el-table-column label="时间段" prop="num" width="200">
                <template slot-scope="scope">
                  <div class="db_cell">{{ openApplyData[scope.row.val1] }}</div>
                </template>
              </el-table-column>
              <el-table-column label="来访" prop="num">
                <template slot-scope="scope">
                  <div class="db_cell">
                    <div v-if="scope.$index != 2">
                      {{
                      isNaN(openApplyData[scope.row.val2])
                      ? 0
                      : openApplyData[scope.row.val2]
                      }}
                    </div>
                    <el-input
                      @change="setSum_2(scope.row)"
                      type="number"
                      v-else-if="
                        scope.$index == 2 &&
                          approval_stuat != 4 &&
                          approval_stuat != 3
                      "
                      v-model="openApplyData[scope.row.val2]"
                      v-only-number="{ min: 0 }"
                    ></el-input>
                    <span v-else>
                      {{
                      isNaN(openApplyData[scope.row.val2])
                      ? 0
                      : openApplyData[scope.row.val2]
                      }}
                    </span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="小卡" prop="num">
                <template slot-scope="scope">
                  <div class="db_cell">
                    <span>
                      {{
                      isNaN(openApplyData[scope.row.val3])
                      ? 0
                      : parseInt(openApplyData[scope.row.val3])
                      }}
                    </span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="小卡率(%)" prop="num">
                <template slot-scope="scope">
                  <div class="db_cell">
                    <div v-if="scope.$index != 2">
                      {{
                      isNaN(openApplyData[scope.row.val4])
                      ? 0
                      : openApplyData[scope.row.val4]
                      }}%
                    </div>
                    <el-input
                      @change="setSum_2(scope.row)"
                      type="number"
                      v-else-if="
                        scope.$index == 2 &&
                          approval_stuat != 4 &&
                          approval_stuat != 3
                      "
                      v-model="openApplyData[scope.row.val4]"
                      v-only-number="{ min: 0, precision: 2 }"
                    ></el-input>
                    <span v-else>
                      {{
                      isNaN(openApplyData[scope.row.val4])
                      ? 0
                      : openApplyData[scope.row.val4]
                      }}%
                    </span>
                  </div>
                </template>
              </el-table-column>

              <el-table-column label="大卡" prop="num">
                <template slot-scope="scope">
                  <div class="db_cell">
                    <span>
                      {{
                      isNaN(openApplyData[scope.row.val5])
                      ? 0
                      : parseInt(openApplyData[scope.row.val5])
                      }}
                    </span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="大卡率(%)" prop="num">
                <template slot-scope="scope">
                  <div class="db_cell">
                    <div v-if="scope.$index != 2">
                      {{
                      isNaN(openApplyData[scope.row.val6])
                      ? 0
                      : openApplyData[scope.row.val6]
                      }}%
                    </div>
                    <el-input
                      @change="setSum_2(scope.row)"
                      type="number"
                      v-else-if="
                        scope.$index == 2 &&
                          approval_stuat != 4 &&
                          approval_stuat != 3
                      "
                      v-model="openApplyData[scope.row.val6]"
                      v-only-number="{ min: 0, precision: 2 }"
                    ></el-input>
                    <div v-else>
                      {{
                      isNaN(openApplyData[scope.row.val6])
                      ? 0
                      : openApplyData[scope.row.val6]
                      }}%
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="认购" prop="num">
                <template slot-scope="scope">
                  <div class="db_cell">
                    <div v-if="scope.$index != 2">
                      {{
                      isNaN(openApplyData[scope.row.val7])
                      ? 0
                      : parseInt(openApplyData[scope.row.val7])
                      }}
                    </div>
                    <el-input
                      @change="setSum_2(scope.row)"
                      type="number"
                      v-else-if="
                        scope.$index == 2 &&
                          approval_stuat != 4 &&
                          approval_stuat != 3
                      "
                      v-model="openApplyData[scope.row.val7]"
                      v-only-number="{ min: 0 }"
                    >
                      <!--
                      ,precision:2
                      -->
                    </el-input>
                    <span v-else>
                      {{
                      isNaN(openApplyData[scope.row.val7])
                      ? 0
                      : openApplyData[scope.row.val7]
                      }}
                    </span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="成交率(%)" prop="num">
                <template slot-scope="scope">
                  <div class="db_cell">
                    {{
                    isNaN(openApplyData[scope.row.val8])
                    ? 0
                    : openApplyData[scope.row.val8]
                    }}%
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="node" id="chageNode">
            <p class="bold">变更节点客储计划</p>
            <el-table
              :data="customerNodeStorage"
              :header-cell-style="{ background: '#F5F7FA', color: '#999' }"
              border
              style="width: 100%"
            >
              <el-table-column align="center" label="节点" prop="node_name" width="160"></el-table-column>
              <el-table-column align="center" label="日期" prop="node_time" width="160"></el-table-column>
              <el-table-column align="center" label prop="line_name"></el-table-column>

              <el-table-column align="center" label="来访(组)" prop="visit_num">
                <template slot-scope="scope">
                  <el-input
                    @change="setSum(scope.row)"
                    type="number"
                    v-if="1 == 1 && approval_stuat != 4 && approval_stuat != 3"
                    v-model="scope.row.visit_num"
                    v-only-number="{ min: 0 }"
                  ></el-input>
                  <span v-else>{{ scope.row.visit_num }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="小卡(组)" prop="little_num">
                <template slot-scope="scope">
                  <span>{{ scope.row.little_num || 0 }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="小卡率(%)" prop="little_per">
                <template slot-scope="scope">
                  <el-input
                    @change="setSum(scope.row)"
                    type="number"
                    v-if="1 == 1 && approval_stuat != 4 && approval_stuat != 3"
                    v-model="scope.row.little_per"
                    v-only-number="{ min: 0, precision: 2 }"
                  ></el-input>
                  <span v-else>
                    {{
                    isNaN(scope.row.little_per) ? 0 : scope.row.little_per
                    }}%
                  </span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="大卡(组)" prop="big_num">
                <template slot-scope="scope">
                  <span>{{ scope.row.big_num || 0 }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="大卡率(%)" prop="big_per">
                <template slot-scope="scope">
                  <el-input
                    @change="setSum(scope.row)"
                    type="number"
                    v-if="1 == 1 && approval_stuat != 4 && approval_stuat != 3"
                    v-model="scope.row.big_per"
                    v-only-number="{ min: 0, precision: 2 }"
                  ></el-input>
                  <span v-else>
                    {{
                    isNaN(scope.row.big_per) ? 0 : scope.row.big_per
                    }}%
                  </span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="认购(套)" prop="sub_num">
                <template slot-scope="scope">
                  <el-input
                    @change="setSum(scope.row)"
                    type="number"
                    v-if="1 == 1 && approval_stuat != 4 && approval_stuat != 3"
                    v-model="scope.row.sub_num"
                    v-only-number="{ min: 0 }"
                  ></el-input>
                  <span v-else>{{ scope.row.sub_num }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="成交率(%)" prop="make_per">
                <template slot-scope="scope">
                  {{
                  isNaN(scope.row.make_per) ? 0 : scope.row.make_per
                  }}%
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="card" id="card_2">
            <p class="bold">办卡方式</p>
            <el-form :model="cardForm" class="cardForm" label-width="60px" ref="cardForm">
              <el-form-item label="小卡" prop="small">
                <el-input
                  maxlength="100"
                  show-word-limit
                  type="textarea"
                  v-if="approval_stuat != 4 && approval_stuat != 3"
                  v-model="openApplyData.little_model"
                ></el-input>
                <span v-else>{{ openApplyData.little_model }}</span>
              </el-form-item>
              <el-form-item label="大卡" prop="big">
                <el-input
                  maxlength="100"
                  show-word-limit
                  type="textarea"
                  v-if="approval_stuat != 4 && approval_stuat != 3"
                  v-model="openApplyData.big_model"
                ></el-input>
                <span v-else>{{ openApplyData.big_model }}</span>
              </el-form-item>
            </el-form>
          </div>
          <div class="come" id="chageCome">
            <p class="bold">变更来访周拆分</p>
            <el-table
              :data="comeDataCopy_2"
              :header-cell-style="{ background: '#F5F7FA', color: '#999' }"
              :span-method="mergeSpan"
              border
              style="width: 100%"
            >
              <el-table-column align="center" label="周期" prop="week" width="160"></el-table-column>
              <el-table-column align="center" label="日期" prop="day_date" width="300"></el-table-column>
              <el-table-column align="center" label="计划新增(组)" prop="plan_add">
                <template slot-scope="scope">
                  <el-input
                    type="number"
                    v-if="scope.row.week !== '完整波段' && approval_stuat != 4"
                    v-model="scope.row.plan_add"
                    @input.native="
                      scope.row.plan_add = parseInt(scope.row.plan_add)
                    "
                    v-only-number="{ min: 0 }"
                  ></el-input>
                  <span v-else-if="scope.row.week == '完整波段'">
                    {{
                    come_sum_2
                    }}
                  </span>
                  <span v-else>{{ scope.row.plan_add }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="计划累计(组)" prop="plan_total"></el-table-column>
              <el-table-column align="center" label="计划阶段任务占比(%)" prop="plan_task_per">
                <template slot-scope="scope">
                  <span>{{ scope.row.plan_task_per  + '%'}}</span>
                </template>
              </el-table-column>
            </el-table>
            <span style="color:red;font-size:14px;">注：因四舍五入，计划阶段任务占比会存在合计值与100%有偏差。</span>
          </div>
          <div class="lists" id="lists">
            <p class="bold">附件清单</p>
            <div class="accessory">
              <el-table
                :data="thataccessoryData"
                :header-cell-style="{ background: '#F5F7FA', color: '#999' }"
                style="width: 100%"
              >
                <el-table-column align="left" label="附件名称" prop="type" width="200"></el-table-column>
                <el-table-column align="left" label="附件" prop="name">
                  <template slot-scope="scope">
                    <a :href="local + scope.row.url">{{ scope.row.name }}</a>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                  <template slot-scope="scope">
                    <div class="fileBox" v-if="scope.$index < thataccessoryData.length - 1">
                      <el-upload
                        :action="action"
                        :data="{
                          filePath: 'twentyOneDays',
                          bizID: '',
                          orderIndex: scope.$index
                        }"
                        :file-list="fileList__[scope.$index]"
                        :on-error="fileError"
                        :on-exceed="exceed"
                        :on-remove="fileRemove"
                        :on-success="thatfileSuccess"
                        v-if="
                          approval_stuat != 4 &&
                            approval_stuat != 3 &&
                            !scope.row.name
                        "
                      >
                        <el-button type="text">
                          {{ '+' +
                          scope.row.handle
                          }}
                        </el-button>
                      </el-upload>
                      <el-button
                        @click="thatdelFielList(scope.$index)"
                        type="text"
                        v-if="
                          approval_stuat != 4 &&
                            approval_stuat != 3 &&
                            scope.row.name
                        "
                      >删除</el-button>
                    </div>
                    <div class="fileBox" v-else>
                      <el-upload
                        :action="action"
                        :data="{
                          filePath: 'twentyOneDays',
                          bizID: '',
                          orderIndex: scope.$index
                        }"
                        :on-error="fileError"
                        :on-remove="fileRemove"
                        :on-success="thatfileSuccess"
                      >
                        <el-button
                          type="text"
                          v-if="approval_stuat != 4 && approval_stuat != 3"
                        >{{ scope.row.handle }}</el-button>
                      </el-upload>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="bottom" v-if="isType != 'view'">
      <el-button
        @click="update('1')"
        type="primary"
        v-if="activeTab == 2 && approval_stuat != 4 && approval_stuat != 3"
        v-show="$store.state.user.userPower.includes('提交审批')"
      >提交审批</el-button>
      <el-button
        @click="update('0')"
        v-if="activeTab == 2 && approval_stuat != 4 && approval_stuat != 3"
      >保存</el-button>
      <el-button
        @click="update('1')"
        v-show="$store.state.user.userPower.includes('提交审批')"
        type="primary"
        v-if="activeTab == 1 && !readonly"
      >提交审批</el-button>
      <el-button @click="update('0')" v-if="activeTab == 1 && !readonly">保存</el-button>
      <el-button @click="update('4')" v-if="activeTab == 1 && !readonly" v-show="isShowKS">快速审批</el-button>
      <el-button
        @click="update('3')"
        v-if="activeTab == 2 && approval_stuat != 4 && approval_stuat != 3"
        v-show="isShowKS"
      >快速审批</el-button>
    </div>
  </div>
</template>

<script>
import {
  selectNodePlan,
  updateNodePlan,
  viewdelayOpenApplay,
  switchVersion,
  savelayOpenApplay,
  getWeeklyResolution,
  delFile,
  forMtstartThreeAndTwo,
  get,
  exportDelayData
} from "@/api/firstPlan";
import { toHistoryUrl, queryFlowId } from "@/api/offerFlow.js";
import { downLoad } from "@/api/request";
export default {
  components: {
    navbarLink: () => import("./components/navbarLink")
  },
  data() {
    return {
      isReport: false,
      flow_id: "",
      isType: "",
      updateFlag: true,
      fileHeight: 1,
      isShowKS: location.origin.includes("uat"),
      thataccessoryData: [
        {
          type: "",
          handle: "其他上传"
        }
      ],
      createTime: "",
      accessoryData: [
        {
          type: "",
          handle: "其他上传"
        }
      ],
      activeTab: "1",
      isCheck: false,
      readonly: "",
      newVersionFlag: false,
      cardForm: {
        big_way: "",
        little_way: ""
      },
      allSum: 0,
      allSum_2: 0,
      fileList__: [],
      fileList: [],
      isShowVersion: false,
      form: {},
      node_level: this.$route.query.node_level,
      comeData: [],
      nodeData: [],
      NodePlanWrite: [],
      listData: [],
      come_Data: [],
      versions: "",
      versionsList: [],
      versionData: [],
      thisVserion: "",
      customerNodeStorage: [],
      weekData: [
        {
          id: "",
          week: "",
          start_time: "",
          end_time: "",
          day_date: "",
          plan_add: "",
          plan_total: "",
          plan_task_per: "",
          actual_add: "",
          actual_total: "",
          plan_task_per: ""
        }
      ],
      firstReportData: [
        {
          type: "顶设2客储计划与达成",
          name1: "计划",
          val1: "reach_plan_time",
          val2: "reach_plan_visit_num",
          val3: "reach_plan_little_num",
          val4: "reach_plan_little_per",
          val5: "reach_plan_big_num",
          val6: "reach_plan_big_per",
          val7: "reach_plan_sub_num",
          val8: "reach_plan_take_per"
        },
        {
          type: "顶设2客储计划与达成",
          name1: "实际",
          val1: "reach_actual_time",
          val2: "reach_actual_visit_num",
          val3: "reach_actual_littel_num",
          val4: "reach_actual_littel_per",
          val5: "reach_actual_big_num",
          val6: "reach_actual_big_per",
          val7: "reach_actual_sub_num",
          val8: "reach_actual_take_per"
        },
        {
          type: "延期开盘后新增客储预估",
          name1: "计划",
          val1: "estimate_plan_time",
          val2: "estimate_plan_visit_num",
          val3: "estimate_plan_little_num",
          val4: "estimate_plan_little_per",
          val5: "estimate_plan_big_num",
          val6: "estimate_plan_big_per",
          val7: "estimate_plan_sub_num",
          val8: "estimate_plan_take_per"
        },
        {
          type: "延期开盘后合计客储",
          name1: "",
          val1: "sum_time",
          val2: "sum_visit_num",
          val3: "sum_little_num",
          val4: "sum_little_per",
          val5: "sum_big_num",
          val6: "sum_big_per",
          val7: "sum_sub_num",
          val8: "sum_take_per"
        }
      ],
      openApplyData: {
        id: "",
        rules_time: "",
        designtwo_time: "",
        new_first_time: "",
        plan_id: "",
        plan_node_id: "",
        delay_daynum: "",
        delay_reasons: "",
        level: "",
        approval_stuat: "",
        big_model: "",
        little_model: "",
        version: "",
        reach_plan_time: "",
        reach_plan_visit_num: "",
        reach_plan_little_num: "",
        reach_plan_big_num: "",
        reach_plan_big_per: "",
        reach_plan_little_per: "",
        reach_plan_sub_num: "",
        reach_plan_take_per: "",
        reach_actual_time: "",
        reach_actual_visit_num: "",
        reach_actual_littel_num: "",
        reach_actual_littel_per: "",
        reach_actual_big_num: "",
        reach_actual_big_per: "",
        reach_actual_sub_num: "",
        reach_actual_take_per: "",
        estimate_plan_time: "",
        estimate_plan_visit_num: "",
        estimate_plan_little_num: "",
        estimate_plan_little_per: "",
        estimate_plan_big_per: "",
        estimate_plan_big_num: "",
        estimate_plan_take_per: "",
        estimate_plan_sub_num: "",
        sum_time: "",
        sum_visit_num: "",
        sum_little_num: "",
        sum_little_per: "",
        sum_big_num: "",
        sum_big_per: "",
        sum_sub_num: "",
        sum_take_per: "",
        new_applay_21time: "",
        new_applay_7time: ""
      },
      approval_stuat: "0",
      dateList: [
        {
          type: "战规版开盘日期",
          date: "rules_time"
        },
        {
          type: "顶设2开盘日期",
          date: "designtwo_time"
        },
        {
          type: "新申请开盘前21天",
          date: "new_applay_21time"
        },
        {
          type: "新申请开盘前7天",
          date: "new_applay_7time"
        },
        {
          type: "新申请开盘日期",
          date: "new_first_time"
        },
        {
          type: "延期天数",
          date: "delay_daynum"
        }
      ],
      clientRateData: [
        {
          type: "顶设2客储计划与达成",
          name: "计划"
        },
        {
          type: "顶设2客储计划与达成",
          name: "实际"
        },
        {
          type: "延期开盘后新增客储预估",
          name: "计划"
        },
        {
          type: "延期开盘后合计客储",
          name: ""
        }
      ]
    };
  },
  created() {
    if (this.$route.query.type != null && this.$route.query.type == "view") {
      this.isType = this.$route.query.type;
    }
    if (this.$route.query.disabled) {
      this.readonly = true;
    }
    this.reload();
  },
  filters: {
    fixed: function(data) {
      return data.toFixed(2);
    },
    noFixed: function(data) {
      return data.toFixed(0);
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
      // if (location.origin.includes("test")) {
      //   host = "https://salesmgt-test-api.cifi.com.cn";
      // } else if (location.origin.includes("uat")) {
      host = "https://salesmgt-uat-api.cifi.com.cn";
      // } else {
      //   host = "https://salesmgt-api.cifi.com.cn";
      // }
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
    come_sum_2() {
      let sum = 0;
      let mylist = [...this.weekData].concat();
      mylist.splice(0, 1);
      mylist.forEach(item => {
        sum += isNaN(Number(item.plan_add)) ? 0 : Number(item.plan_add);
      });
      console.log(sum);
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
        let plan_task_per = 0;
        if (Number(this.allSum)) {
          plan_task_per = isNaN(
            (Number(item.plan_add) / Number(this.allSum)) * 100
          )
            ? 0
            : (Number(item.plan_add) / Number(this.allSum)) * 100;
        }
        item.plan_task_per = plan_task_per.toFixed(2);
      });
      return arr;
    },
    comeDataCopy_2() {
      console.log(this.weekData, "......>");
      let arr = [...this.weekData];
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
              Number(this.weekData[index - 1].plan_total);
          }
        }
      });
      // let sum =arr[arr.length-1].plan_total
      arr.forEach(item => {
        let plan_task_per = 0;
        if (Number(this.allSum_2)) {
          plan_task_per = isNaN(
            (Number(item.plan_add) / Number(this.allSum_2)) * 100
          )
            ? 0
            : (Number(item.plan_add) / Number(this.allSum_2)) * 100;
        }
        item.plan_task_per = plan_task_per.toFixed(2);
      });
      return arr;
    }
  },
  watch: {
    "openApplyData.sum_sub_num": function(val) {
      console.log("//////////////////////", val);
    },
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
    },
    weekData: {
      handler(a, b) {
        // console.log(a, "12121212");
        let sum = 0;
        a.forEach(item => {
          if (item.plan_add) {
            sum += isNaN(Number(item.plan_add)) ? 0 : Number(item.plan_add);
          }
        });
        this.allSum_2 = sum;
      },
      deep: true
    }
  },
  methods: {
    toPreview() {
      if (this.activeTab == 2) {
        toHistoryUrl({
          proInstId: this.flow_id
        }).then(res => {
          window.open(res.data);
        });
      } else if (this.activeTab == 1) {
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
        // forMtstartThreeAndTwo({
        //   flow_id: this.form.versions
        // }).then(res => {
        //   get(
        //     `/Workflow/MTStart2.aspx?BSID=FP&BTID=${res.result.result.BTID}&BOID=${res.result.result.codeBOID}&UserID=${res.result.result.bkUserID}&LoginKey=${res.result.result.loginKey}`
        //   ).then(res => {
        //     if (res.code == 200 || res.result.code == 200) {
        //       window.open(res.data);
        //     } else {
        //       this.$message.error(res.messages || res.result.messages);
        //     }
        //   });
        // });
      }
    },
    tabClick(tab, event) {
      if (this.activeTab == 1) {
        // this.approval_stuat = 1;
        console.log(111);
      }
      if (this.activeTab == 2) {
        console.log(222);
        this.update(0, true);

        this.viewdelayOpenApplay();
      }
    },
    switchVersion() {
      if (this.activeTab == 2) {
        this.switchVersionByVersionID();
      }
    },
    FomartDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      var H = date.getHours();
      var M = date.getMinutes();
      var S = date.getSeconds();

      function Covering(num) {
        return num >= 10 ? num : "0" + num;
      }

      return y + "-" + Covering(m) + "-" + Covering(d);
    },
    countDate: function(date) {
      var aDate, oDate1, oDate2, iDays;
      aDate = date.split("-");
      oDate1 = new Date(aDate[1] + "-" + aDate[2] + "-" + aDate[0]); //转换为02-05-2018格式
      aDate = this.openApplyData.designtwo_time.split("-");

      oDate2 = new Date(aDate[1] + "-" + aDate[2] + "-" + aDate[0]);
      iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
      this.openApplyData.delay_daynum = iDays;

      this.customerNodeStorage = [];
      var rules_time = this.openApplyData.rules_time;
      var asd = +new Date(date) - 7 * 86400000;
      var node_time1 = this.FomartDate(new Date(asd));
      var qwe = +new Date(date) - 21 * 86400000;
      var node_time2 = this.FomartDate(new Date(qwe));
      this.openApplyData.new_applay_7time = node_time1;
      this.openApplyData.new_applay_21time = node_time2;
      this.customerNodeStorage.push({
        node_name: "首开前21天",
        node_time: node_time2,
        line_name: "计划",
        level: "1",
        node_level: "6"
      });
      this.customerNodeStorage.push({
        node_name: "首开前7天",
        node_time: node_time1,
        line_name: "计划",
        level: "1",
        node_level: "7"
      });
      this.customerNodeStorage.push({
        node_name: "首开",
        node_time: date,
        line_name: "计划",
        level: "1",
        node_level: "8"
      });

      if (this.openApplyData.designtwo_time) {
        var time = this.openApplyData.designtwo_time.split("-");
        var time2 = date.split("-");
        var s = time[0] + "." + time[1] + "." + time[2];
        var s2 = time2[0] + "." + time2[1] + "." + time2[2];
        this.openApplyData.estimate_plan_time = s + "-" + s2;
      }

      if (this.openApplyData.open_time) {
        var time = this.openApplyData.open_time.split("-");
        var time2 = date.split("-");
        var s = time[0] + "." + time[1] + "." + time[2];
        var s2 = time2[0] + "." + time2[1] + "." + time2[2];
        this.openApplyData.sum_time = s + "-" + s2;
      }

      this.getWeeklyResolution(date);
    },
    deleteFile(index, obj) {
      delFile({
        id: obj.id
      }).then(res => {
        this.fileList.splice(index, 1);
      });
    },
    //延期看盘申请--获取周拆分数据

    getWeeklyResolution(new_first_time) {
      getWeeklyResolution({
        start_time: this.openApplyData.designtwo_time,
        end_time: new_first_time
      }).then(res => {
        if (res.code != 200) {
          this.functionDrawer = false;
          this.weekData = [];
          this.openApplyData.new_first_time = "";
          this.$message({
            type: "error",
            message: res.message
          });
        } else {
          this.weekData = res.result;
        }
      });
    },
    //延期开盘申请--保存/提交数据
    savelayOpenApplay(button) {
      if (button == "submit") {
        this.checkValue();
        if (!this.updateFlag) {
          this.updateFlag = true;
          return;
        }
      }
      savelayOpenApplay({
        plan_id: this.$route.query.plan_id,
        plan_node_id: this.$route.query.plan_node_id,
        node_level: "6",
        button: button,
        thisVserion: this.thisVserion,
        openApplyData: this.openApplyData,
        customerNodeStorage: this.customerNodeStorage,
        weekData: this.weekData,
        project_id: this.$route.query.project_id,
        fileList: this.thataccessoryData
      }).then(res => {
        if (res.code == 200) {
          var message;
          if (button == "submit") {
            message = "提交成功!";
          } else {
            message = "保存成功!";
          }
          this.functionDrawer = false;
          this.$message({
            type: "success",
            message: message
          });
          if (button == "submit") {
            //提交审批并调整预览页面
            get(
              `/Workflow/MTStart2.aspx?BSID=FP&BTID=${res.result.BTID}&BOID=${res.result.codeBOID}&UserID=${res.result.bkUserID}&LoginKey=${res.result.loginKey}`
            ).then(res => {
              if (res.code == 200 || res.result.code == 200) {
                window.location.href = res.data;
              } else {
                this.$message.error(res.messages || res.result.messages);
              }
            });
          } else {
            if (this.thisVserion == "") {
              this.viewdelayOpenApplay();
            } else {
              this.switchVersion();
            }
          }
        } else {
          this.functionDrawer = false;
          this.$message({
            type: "error",
            message: "保存失败!"
          });
        }
      });
    },
    checkValue() {
      if (!this.openApplyData.new_first_time) {
        this.$message.error("新申请开盘日期未填写!");
        this.updateFlag = false;
        return;
      }
      let openApplyFlag = true;
      let openNameList = [
        "estimate_plan_big_num",
        "estimate_plan_little_num",
        "estimate_plan_sub_num",
        "estimate_plan_visit_num"
      ];
      openNameList.forEach(name => {
        if (
          !this.openApplyData[name] &&
          this.openApplyData[name] !== 0 &&
          openApplyFlag
        ) {
          openApplyFlag = false;
          this.updateFlag = false;
          return;
        }
      });
      if (!openApplyFlag) {
        this.$message.error("客储达成进度必填项未填写!");
        return;
      }
      let customerNodeFlag = true;
      let customerNodeNameList = [
        "big_num",
        "little_num",
        "sub_num",
        "visit_num"
      ];
      this.customerNodeStorage.forEach(item => {
        customerNodeNameList.forEach(name => {
          if (!item[name] && item[name] !== 0 && customerNodeFlag) {
            customerNodeFlag = false;
            this.updateFlag = false;
            return;
          }
        });
      });
      if (!customerNodeFlag) {
        this.$message.error("变更节点客储计划必填项未填写!");
        return;
      }

      let weekDataFlag = true;
      this.weekData.forEach(item => {
        if (
          !item.plan_add &&
          item.plan_add !== 0 &&
          weekDataFlag &&
          item.week != "完整波段"
        ) {
          weekDataFlag = false;
          this.updateFlag = false;
          return;
        }
      });
      if (!weekDataFlag) {
        this.$message.error("变更来访周拆分必填项未填写!");
        return;
      }
      //附件上传
      if (
        this.thataccessoryData.some(
          i => i.type && i.type !== "其他上传" && !i.name
        )
      ) {
        this.$message({
          type: "error",
          message: "必须上传附件清单"
        });
        return;
      }
    },
    savelayOpenKsApplay(button) {
      this.checkValue();
      if (!this.updateFlag) {
        this.updateFlag = true;
        return;
      }
      savelayOpenApplay({
        plan_id: this.$route.query.plan_id,
        plan_node_id: this.$route.query.plan_node_id,
        node_level: "6",
        buttonKs: button,
        thisVserion: this.thisVserion,
        openApplyData: this.openApplyData,
        customerNodeStorage: this.customerNodeStorage,
        weekData: this.weekData,
        project_id: this.$route.query.project_id,
        fileList: this.thataccessoryData
      }).then(res => {
        if (res.code == 200) {
          this.functionDrawer = false;
          var message;
          if (button == "ksApplay") {
            message = "提交成功!";
          } else {
            message = "保存成功!";
          }
          this.$message({
            type: "success",
            message: message
          });
          if (button == "ksApplay") {
            //快速审批
            var open =
              this.local +
              "/#/sevenAndTwentyOnePostpone?BOID=" +
              res.result.codeBOID +
              "&isKSAP=1";
            window.open(open);
            this.$router.push("planWrite");
          }
          if (button == "submit") {
            this.$router.push("planWrite");
          }
        } else {
          this.functionDrawer = false;
          this.$message({
            type: "error",
            message: "提交失败!"
          });
        }
      });
    },

    changeVersion() {
      console.log(this.versions);
      this.reload();
    },
    //延期看盘申请--切换数据
    switchVersionByVersionID() {
      switchVersion({
        id: this.thisVserion,
        plan_id: this.$route.query.plan_id,
        plan_node_id: this.$route.query.plan_node_id,
        node_level: "6"
      }).then(res => {
        //this.versionData = res.result.versionData;
        /*
                                            this.thisVserion = res.result.versionData[0].id;
                        */
        this.approval_stuat = res.result.openApplyData.approval_stuat;
        if (this.$route.query.disabled) {
          this.approval_stuat = 4;
        }
        if (res.result.openApplyData.flow_id) {
          this.flow_id = res.result.openApplyData.flow_id;
        } else {
          this.flow_id = "";
        }
        this.openApplyData = res.result.openApplyData;
        this.customerNodeStorage = res.result.customerNodeStorage;
        this.weekData = res.result.weekData;
        this.fileList = res.result.fileList;
      });
    },
    viewdelayOpenApplay() {
      viewdelayOpenApplay({
        plan_id: this.$route.query.plan_id,
        plan_node_id: this.$route.query.plan_node_id,
        node_level: "6",
        project_id: this.$route.query.project_id
      }).then(res => {
        this.versionData = res.result.versionData;
        if (res.result.versionData) {
          this.thisVserion = res.result.versionData[0].id;
        } else {
          this.thisVserion = "";
        }
        if (res.result.fileList) {
          let arr5 = res.result.fileList;
          this.thataccessoryData = [
            {
              type: "",
              handle: "其他上传"
            }
          ];
          if (arr5.length > 0) {
            let temp = this.thataccessoryData.pop();
            arr5.forEach((item, index) => {
              this.thataccessoryData.push({
                type: "其他上传",
                handle: "上传",
                id: item.id,
                name: item.name,
                url: item.url,
                orderIndex: item.orderIndex
              });
            });
            this.thataccessoryData.push(temp);
          }
        }
        this.openApplyData = res.result.openApplyData;
        this.approval_stuat = res.result.openApplyData.approval_stuat;
        if (this.$route.query.disabled) {
          this.approval_stuat = 4;
        }
        if (res.result.openApplyData.flow_id) {
          this.flow_id = res.result.openApplyData.flow_id;
        } else {
          this.flow_id = "";
        }
        this.customerNodeStorage = res.result.customerNodeStorage;
        if (res.result.weekData) {
          this.weekData = res.result.weekData;
        } else {
          this.weekData = [];
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
          type: "其他上传",
          // handle: "上传",
          name: res.data.name,
          id: res.data.id,
          url: res.data.url
        });
        this.accessoryData.push(temp);
      }
    },

    thatfileSuccess(res, file, fileList) {
      if (!res.data) {
        this.$message.error(res.messages);
        return;
      }
      if (res.data.orderIndex < this.thataccessoryData.length - 1) {
        this.$set(
          this.thataccessoryData[res.data.orderIndex],
          "name",
          res.data.name
        );
        this.$set(
          this.thataccessoryData[res.data.orderIndex],
          "id",
          res.data.id
        );
        this.$set(
          this.thataccessoryData[res.data.orderIndex],
          "url",
          res.data.url
        );
      } else {
        let temp = this.thataccessoryData[this.thataccessoryData.length - 1];
        this.thataccessoryData.pop();
        this.thataccessoryData.push({
          type: "其他上传",
          // handle: "上传",
          name: res.data.name,
          id: res.data.id,
          url: res.data.url
        });
        this.thataccessoryData.push(temp);
      }
    },

    exceed(files, fileList) {
      this.$message.warning(`当前限制选择1个文件`);
    },
    fileError() {
      this.$message.error("上传失败");
    },
    delFielList(idx) {
      this.accessoryData.splice(idx, 1);
    },
    thatdelFielList(idx) {
      this.thataccessoryData.splice(idx, 1);
    },

    reload(num) {
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
      }
      selectNodePlan(obj).then(res => {
        if (res.code == 0) {
          this.isShowVersion = res.result.judgeVersion == 1 ? true : false;
          this.comeData = res.result.Week.concat();
          this.come_Data = [...res.result.WeekWrite].concat();
          this.nodeData = res.result.NodePlan.concat();
          this.NodePlanWrite = res.result.NodePlanWrite.concat();
          this.versionsList = res.result.flow.concat();
          // if (res.result.flow.length > 0) {
          //   this.form.versions = res.result.flow[0].flow_id;
          // }
          this.isCheck = res.result.change == 1 ? true : false;
          this.cardForm = {
            big_way: this.nodeData[0].big_way,
            little_way: this.nodeData[0].little_way
          };
          if (this.nodeData.length > 1) {
            this.createTime = this.nodeData[0].create_time + " 06:30:00";
          }
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
              this.accessoryData.push({
                type: "其他上传",
                handle: "上传",
                id: item.id,
                name: item.name,
                url: item.url,
                orderIndex: item.orderIndex
              });
            });
            this.accessoryData.push(temp);
          }
        }
      });
    },
    scrollLink(id) {
      // document.getElementById(id).scrollIntoView({ block: "end", behavior: "smooth" });
      document.querySelector("#containter").scrollTop =
        document.getElementById(id).offsetTop + 15;
    },
    createVersion() {
      if (this.activeTab == 2) {
        this.thisVserion = "";
        viewdelayOpenApplay({
          plan_id: this.$route.query.plan_id,
          plan_node_id: this.$route.query.plan_node_id,
          create: "new",
          node_level: "6",
          project_id: this.$route.query.project_id
        }).then(res => {
          /*
                                                this.versionData = res.result.versionData;
                        */
          this.thisVserion = "";
          this.openApplyData = res.result.openApplyData;
          if (res.result.weekData) {
            this.weekData = res.result.weekData;
          } else {
            this.weekData = [];
          }
          this.thataccessoryData = [
            {
              type: "",
              handle: "其他上传"
            }
          ];
          if (res.result.fileList) {
            // this.thataccessoryData = res.result.fileList;
            let arr5 = res.result.fileList;

            if (arr5.length > 0) {
              let temp = this.thataccessoryData.pop();
              arr5.forEach((item, index) => {
                this.thataccessoryData.push({
                  type: "其他上传",
                  handle: "上传",
                  id: item.id,
                  name: item.name,
                  url: item.url,
                  orderIndex: item.orderIndex
                });
              });
              this.thataccessoryData.push(temp);
            }
          }
          if (!res.result.customerNodeStorage) {
            this.customerNodeStorage = [];
          } else {
            this.customerNodeStorage = res.result.customerNodeStorage;
          }
          this.approval_stuat = 1;

          //触发计算事件
          if (res.result.openApplyData.new_first_time) {
            this.countDate(res.result.openApplyData.new_first_time);
          }
          if (!res.result.customerNodeStorage) {
            this.customerNodeStorage = [];
          } else {
            this.customerNodeStorage = res.result.customerNodeStorage;
          }
        });
      } else {
        this.newVersionFlag = true;
        this.reload("1");
      }
    },
    exportDelayData() {
      if (this.activeTab == 2) {
        let nowProject = JSON.parse(localStorage.getItem("nowProject"))
          .nowProject;
        let obj = {
          projectName: nowProject,
          node_level: this.$route.query.node_level,
          id: this.thisVserion
        };
        let _path = downLoad(
          "/openBeforeTwentyone/exportDelayOpenData.action",
          obj
        );
        window.location = _path;
      } else if (this.activeTab == 1) {
        window.location = downLoad(
          `/designmonths/getMonthsExcel.action?flowId=${this.versions}`
        );
      }
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
    mergeRow({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0) {
        if (rowIndex == 0) {
          return [2, 1];
        } else if (rowIndex == 1) {
          return [0, 0];
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
    update(update, istab = false) {
      if (this.activeTab == 2 && !istab) {
        if (update == 3) {
          //快速审批
          this.savelayOpenKsApplay("ksApplay");
        } else if (update == 1) {
          this.savelayOpenApplay("submit");
        } else {
          this.savelayOpenApplay("save");
        }
      } else {
        this.comeData.forEach((item, index) => {
          this.comeDataCopy[index].bias_cause = item.bias_cause;
        });
        let obj = {
          plan_id: this.$route.query.plan_id,
          node_level: this.$route.query.node_level,
          plan_node_id: this.$route.query.plan_node_id,
          NodePlan: this.NodePlanWrite,
          Week: this.comeDataCopy,
          isUpdate: update >= 1 ? "1" : "0",
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
        console.log(update);

        if (update == 1 || update == 4) {
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
          if (update == "0" && !istab) {
            this.$message.success("保存草稿成功");
            this.reload();
          } else if (update == "1" || update == "4") {
            this.$message.success("提交审批成功");
            // this.reload();
            forMtstartThreeAndTwo({
              flow_id: this.versions
            }).then(res => {
              if (update == 4) {
                //快速审批
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
          }
        });
      }
    },
    setSum(row) {
      if (row["visit_num"]) {
        this.$set(
          row,
          "little_num",
          isNaN((row["little_per"] * row["visit_num"]) / 100)
            ? 0
            : ((row["little_per"] * row["visit_num"]) / 100).toFixed(0)
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
            : ((row["big_per"] * row["visit_num"]) / 100).toFixed(0)
        );
      }
    },
    setSum_2(row) {
      console.log(row);

      //计算小卡数=小卡率*来访数据/100
      this.openApplyData["estimate_plan_little_num"] = isNaN(
        (
          parseFloat(
            this.openApplyData["estimate_plan_little_per"] *
              this.openApplyData["estimate_plan_visit_num"]
          ) / 100
        )
      )
        ? 0
        : (
            parseFloat(
              this.openApplyData["estimate_plan_little_per"] *
                this.openApplyData["estimate_plan_visit_num"]
            ) / 100
          )

      //计算大卡数=大卡率*来访数据/100
      this.openApplyData["estimate_plan_big_num"] = isNaN(
        (
          parseFloat(
            this.openApplyData["estimate_plan_big_per"] *
              this.openApplyData["estimate_plan_visit_num"]
          ) / 100
        )
      )
        ? 0
        : parseFloat(
            (this.openApplyData["estimate_plan_big_per"] *
              this.openApplyData["estimate_plan_visit_num"]) /
              100
          )

      //计算成交率=认购数/来访数
      this.openApplyData[row["val8"]] = isNaN(
        (
          parseFloat(
            this.openApplyData[row["val7"]] / this.openApplyData[row["val2"]]
          ) * 100
        ).toFixed(2)
      )
        ? 0
        : (
            parseFloat(
              this.openApplyData[row["val7"]] / this.openApplyData[row["val2"]]
            ) * 100
          ).toFixed(2);

      //计算合计=小卡数/来访数据
      this.openApplyData.sum_visit_num = isNaN(
        parseInt(this.openApplyData.reach_plan_visit_num) +
          parseInt(this.openApplyData[row["val3"]])
      )
        ? this.openApplyData.reach_plan_visit_num
        : parseInt(this.openApplyData.reach_plan_visit_num) +
          parseInt(this.openApplyData[row["val2"]]);
      // this.openApplyData[this.firstReportData[3].val2]=this.openApplyData[this.firstReportData[0].val2]+this.openApplyData[this.firstReportData[2].val2]
      this.$set(
        this.openApplyData,
        this.firstReportData[3].val2,
        Number(this.openApplyData[this.firstReportData[1].val2]) +
          Number(this.openApplyData[this.firstReportData[2].val2])
      );
      this.$set(
        this.openApplyData,
        this.firstReportData[3].val3,
        Number(this.openApplyData[this.firstReportData[1].val3]) +
          Number(this.openApplyData[this.firstReportData[2].val3])
      );
      this.$set(
        this.openApplyData,
        this.firstReportData[3].val4,
        (
          (parseFloat(this.openApplyData[this.firstReportData[1].val4]) +
            parseFloat(this.openApplyData[this.firstReportData[2].val4])) /
          2
        ).toFixed(0)
      );

      this.$set(
        this.openApplyData,
        this.firstReportData[3].val5,
        Number(this.openApplyData[this.firstReportData[1].val5]) +
          Number(this.openApplyData[this.firstReportData[2].val5])
      );

      this.$set(
        this.openApplyData,
        this.firstReportData[3].val6,
        (
          (parseFloat(this.openApplyData[this.firstReportData[1].val6]) +
            parseFloat(this.openApplyData[this.firstReportData[2].val6])) /
          2
        ).toFixed(0)
      );
      this.$set(
        this.openApplyData,
        this.firstReportData[3].val7,
        Number(this.openApplyData[this.firstReportData[1].val7]) +
          Number(this.openApplyData[this.firstReportData[2].val7])
      );

      this.$set(
        this.openApplyData,
        this.firstReportData[3].val8,
        (
          (parseFloat(this.openApplyData[this.firstReportData[1].val8]) +
            parseFloat(this.openApplyData[this.firstReportData[2].val8])) /
          2
        ).toFixed(0)
      );
    },
    fileRemove(file, fileList) {}
  }
};
</script>

<style lang="less" scoped>
.twentyOneDays {
  height: calc(100vh - 40px);
  overflow: hidden;

  .bold {
    font-weight: 700 !important;
    color: #333333;
    font-family: PingFangSC-Medium, PingFang SC;
  }
  padding-bottom: 60px;
  .navbarLink {
    background: #fff;
    margin-top: 5px;
  }
  ::v-deep .el-tabs__active-bar {
    background: transparent;
  }
  ::v-deep .el-upload-list {
    display: none;
  }
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
  .headerFixed {
    width: 100%;
    position: fixed;
    height: 100px;
    background: #fff;
    top: 40px;
    z-index: 10;
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
      .right-btn {
        position: fixed;
        right: 0;
        top: 40px;
        z-index: 10;
      }
      ::v-deep .el-input__inner {
        width: 260px;
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
    height: 85px;
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
    .link {
      margin-left: -12px;
      ::v-deep .el-button {
        color: #2761ff !important;
        margin-top: -4px;
        margin-left: 10px;
      }
    }
    ::v-deep .el-tabs__nav-scroll {
      margin-left: 20px;
    }
  }
  .containter {
    ::v-deep .el-tabs__nav-scroll {
      display: none;
    }
    overflow-y: auto;
    height: calc(100vh - 160px);
    padding-bottom: 60px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    border: 1px solid rgba(216, 216, 216, 0.34);
    // .link {
    //   margin-left: -12px;
    //   ::v-deep .el-button {
    //     color: #2761ff !important;
    //   }
    // }
    ::v-deep .is-active {
      color: #2761ff;
    }
    ::v-deep .el-tabs {
      padding: 0 15px;
    }

    .lists {
      margin-bottom: 15px;
      padding: 15px 0;

      p {
        height: 30px;
        line-height: 30px;
        color: #333;
        font-size: 14px;
      }

      .bold {
        font-weight: 500;
        color: #333333;
      }
    }
    .come {
      margin-bottom: 15px;
      padding: 15px 0;

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
      margin-bottom: 15px;
      padding: 15px 0;

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
      padding: 15px 0;
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
      ::v-deep .el-table_5_column_39 {
        border-left: 1px solid #f0f0f0;
      }
      ::v-deep .el-table_5_column_41 {
        border-right: 1px solid #f0f0f0;
      }
    }

    .card {
      padding: 15px 0;
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

    .rate {
      padding: 15px 0;
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

    .open {
      p {
        height: 30px;
        line-height: 30px;
        color: #333;
        font-size: 14px;
      }

      .bold {
        font-weight: 700;
      }

      .table {
        border: 1px solid #ebeef5;
      }

      .table_top {
        height: 240px;
        display: flex;

        > div {
          flex: 1;
        }
        > div:last-child {
          flex: 2;
        }

        .left {
          width: 180px;
          flex: 0 1 auto;
          line-height: 160px;
          text-align: center;
          border-right: 1px solid #ebeef5;
          border-bottom: 1px solid #ebeef5;
          color: #909399;
          background-color: #f5f7fa;
        }

        > div:nth-child(2) {
          width: 180px;
          flex: 0 1 auto;
          ._cell {
            background-color: #f5f7fa;
          }
        }

        ._cell {
          height: 40px;
          line-height: 40px;
          text-align: left;
          border-right: 1px solid #ebeef5;
          border-bottom: 1px solid #ebeef5;
          color: #909399;
          padding: 0 20px;
        }
      }

      ::v-deep .el-date-editor.el-input {
        width: 100% !important;
      }

      .table_bottom {
        height: 160px;
        display: flex;

        > div {
          flex: 1;
        }

        .left {
          width: 180px;
          line-height: 160px;
          text-align: center;
          flex: 0 1 auto;
          border-right: 1px solid #ebeef5;
          color: #909399;
          background-color: #f5f7fa;
        }

        > div:last-child {
          padding: 20px;
        }

        ::v-deep .el-textarea {
          height: 100%;
        }

        ::v-deep .el-textarea__inner {
          height: 100% !important;
        }
      }
    }
    ::v-deep .el-table th {
      background: rgba(246, 248, 253, 1) !important;
    }
  }
  ::v-deep .el-button--text {
    color: #2761ff !important;
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
    .el-button {
      height: 30px;
    }
  }
  ::v-deep .el-input__inner {
    color: #333333 !important;
    font-size: 14px !important;
  }
}
</style>
