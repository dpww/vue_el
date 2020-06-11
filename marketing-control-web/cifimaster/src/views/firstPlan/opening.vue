<template>
  <div class="opening">
    <navbarLink></navbarLink>
    <div class="headerFixed">
      <div v-if="isType != 'view'" class="top">
        <div class="right-btn">
          <el-button v-if="activeTab == '2'" @click="exportNextDayDelayData" type="primary">导出次日数据</el-button>
          <el-button v-if="activeTab == '1'" @click="exportDelayData" type="primary">导出当日数据</el-button>
          <el-button @click="$router.push({ path: '/planWrite' })">返回列表</el-button>
          <el-button v-if="apstatus == 3 || apstatus == 4" @click="toPreview">查看审批</el-button>
          <el-button v-if="apCreate == 4" type="primary" @click="createVersions">创建版本</el-button>
          <el-button v-if="activeTab == '1'" @click="reloadData" type="danger">点此更新当前数据</el-button>
        </div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="选择版本:">
            <el-select
              v-model="thisVersion"
              @change="switchVersion(thisVersion)"
              placeholder="请选择版本"
            >
              <el-option
                v-for="item in thisDayVersion"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="tabsFlxed" :class="{ isViewFixed: $route.query.type == 'view' }">
        <el-tabs v-model="activeTab" @tab-click="tabClick">
          <el-tab-pane label="当日播报表" name="1">
            <div class="link">
              <el-button type="text" @click="scrollLink('firstReport')">首开当日播报表</el-button>
              <el-button type="text" @click="scrollLink('selling')">去化情况</el-button>
            </div>
          </el-tab-pane>

          <el-tab-pane label="次日播报表" name="2">
            <div class="link">
              <el-button type="text" @click="scrollLink('secondReport')">首开次日播报表</el-button>
              <el-button type="text" @click="scrollLink('reason')">偏差核心原因说明</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <div class="null" style="height:100px" v-if="isType == 'view'"></div>
    <div style="height:150px" v-else></div>
    <div class="containter" :class="{ isView: isType == 'view' }">
      <el-tabs v-model="activeTab" @tab-click="tabClick">
        <el-tab-pane name="1">
          <!-- <div class="link">
            <el-button type="text" @click="scrollLink('firstReport')">首开当日播报表</el-button>
            <el-button type="text" @click="scrollLink('selling')">去化情况</el-button>
          </div>-->
          <div class="firstReport" id="firstReport">
            <p class="bold">首开当日播报表</p>
            <p>项目总监:{{ resultData.project_duty }}</p>
            <el-table
              :data="firstReportData"
              border
              :header-cell-style="{ background: '#F5F7FA', color: '#999' }"
              style="width:  100%"
            >
              <el-table-column label="取证情况" align="center">
                <template slot-scope="scope">
                  <div class="db_cell" v-if="apstatus == '4' || apstatus == '3'">
                    <div>{{ scope.row.name1 }}</div>
                    <el-tooltip
                      v-if="
                        scope.row.val1 == 'take_card_type' ||
                          scope.row.val1 == 'take_num'
                      "
                      :content="resultData[scope.row.val1]"
                      :disabled="!resultData[scope.row.val1]"
                      placement="bottom"
                      effect="light"
                    >
                      <div>{{ resultData[scope.row.val1] }}</div>
                    </el-tooltip>
                    <div v-else>{{ resultData[scope.row.val1] }}</div>
                  </div>
                  <div class="db_cell" v-else>
                    <div>{{ scope.row.name1 }}</div>
                    <div v-if="scope.row.val1 == 'take_card_time'" class="rowss">
                      <el-date-picker
                        @change="
                          changeValue(
                            resultData[scope.row.val1],
                            'take_card_time'
                          )
                        "
                        v-model="resultData[scope.row.val1]"
                        format="yyyy-MM-dd"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                      ></el-date-picker>
                    </div>
                    <div
                      class="abBox"
                      v-else-if="scope.row.val1 == 'take_card_type'"
                      @click.stop="selectHandler('take_card_type')"
                    >
                      <el-input class="abInput" v-model="resultData[scope.row.val1]" readonly>
                        <i
                          slot="suffix"
                          class="el-input__icon"
                          :class="
                            take_card_type_bol
                              ? 'el-icon-arrow-up'
                              : 'el-icon-arrow-down'
                          "
                        ></i>
                      </el-input>
                      <el-select
                        ref="take_card_type"
                        v-model="take_card_type"
                        filterable
                        multiple
                        collapse-tags
                        clearable
                        style="width: 100%;"
                        @change="customChange($event, scope.row.val1)"
                        @visible-change="
                          selectVisibleChange($event, 'take_card_type')
                        "
                      >
                        <el-option
                          v-for="item in resultData.dseAvg"
                          :key="item.product_type"
                          :label="item.product_type"
                          :value="item.product_type"
                        ></el-option>
                      </el-select>
                    </div>
                    <div
                      class="abBox"
                      v-else-if="scope.row.val1 == 'take_num'"
                      @click.stop="
                        checkedHandler(scope.row.val1, 'take_buildingList')
                      "
                    >
                      <el-input class="abInput" v-model="resultData[scope.row.val1]" readonly>
                        <i
                          slot="suffix"
                          class="el-input__icon"
                          :class="
                            take_num_bol
                              ? 'el-icon-arrow-up'
                              : 'el-icon-arrow-down'
                          "
                        ></i>
                      </el-input>
                    </div>
                    <div v-else-if="scope.row.val1 == 'take_value'">
                      <!-- @input="if(resultData[scope.row.val1].length>15)resultData[scope.row.val1]=resultData[scope.row.val1].slice(0,15)" -->

                      <el-input
                        v-model="resultData[scope.row.val1]"
                        @change="
                          countValue(resultData[scope.row.val1], scope.row.val1)
                        "
                        type="number"
                        v-only-number="{ min: 0, precision: 2 }"
                      >
                        <!--
                        @input.native="resultData[scope.row.val1]=parseInt(resultData[scope.row.val1])"

                        -->
                      </el-input>
                    </div>
                    <div v-else>
                      <!-- @input="if(resultData[scope.row.val1].length>15)resultData[scope.row.val1]=resultData[scope.row.val1].slice(0,15)" -->
                      <el-input
                        v-model="resultData[scope.row.val1]"
                        @change="
                          countValue(resultData[scope.row.val1], scope.row.val1)
                        "
                        type="number"
                        v-only-number="{ min: 0, precision: 2 }"
                      >
                        <!--
                        @input.native="resultData[scope.row.val1]=parseInt(resultData[scope.row.val1])"

                        -->
                      </el-input>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="销售情况">
                <template slot-scope="scope">
                  <div class="db_cell" v-if="apstatus == 4 || apstatus == 3">
                    <div>{{ scope.row.name2 }}</div>
                    <el-tooltip
                      v-if="
                        scope.row.val2 == 'push_real_type' ||
                          scope.row.val2 == 'push_num'
                      "
                      :content="resultData[scope.row.val2]"
                      :disabled="!resultData[scope.row.val2]"
                      placement="bottom"
                      effect="light"
                    >
                      <div>{{ resultData[scope.row.val2] }}</div>
                    </el-tooltip>
                    <div v-else>{{ resultData[scope.row.val2] }}</div>
                  </div>
                  <div class="db_cell" v-else>
                    <div>{{ scope.row.name2 }}</div>
                    <div v-if="scope.row.val2 == 'open_time'">
                      <el-date-picker
                        v-model="resultData[scope.row.val2]"
                        format="yyyy-MM-dd"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                      ></el-date-picker>
                    </div>
                    <div
                      class="abBox"
                      v-else-if="scope.row.val2 == 'push_real_type'"
                      @click.stop="selectHandler('push_real_type')"
                    >
                      <el-input class="abInput" v-model="resultData[scope.row.val2]" readonly>
                        <i
                          slot="suffix"
                          class="el-input__icon"
                          :class="
                            push_real_type_bol
                              ? 'el-icon-arrow-up'
                              : 'el-icon-arrow-down'
                          "
                        ></i>
                      </el-input>
                      <el-select
                        ref="push_real_type"
                        v-model="push_real_type"
                        filterable
                        multiple
                        collapse-tags
                        clearable
                        style="width: 100%;"
                        @change="customChange($event, scope.row.val2)"
                        @visible-change="
                          selectVisibleChange($event, 'push_real_type')
                        "
                      >
                        <el-option
                          v-for="item in resultData.dseAvg"
                          :key="item.product_type"
                          :label="item.product_type"
                          :value="item.product_type"
                        ></el-option>
                      </el-select>
                    </div>
                    <div
                      class="abBox"
                      v-else-if="scope.row.val2 == 'push_num'"
                      @click.stop="
                        checkedHandler(scope.row.val2, 'push_buildingList')
                      "
                    >
                      <el-input class="abInput" v-model="resultData[scope.row.val2]" readonly>
                        <i
                          slot="suffix"
                          class="el-input__icon"
                          :class="
                            push_num_bol
                              ? 'el-icon-arrow-up'
                              : 'el-icon-arrow-down'
                          "
                        ></i>
                      </el-input>
                    </div>
                    <div v-else-if="scope.row.val2 == 'push_value'">
                      <!-- @input="if(resultData[scope.row.val2].length>15)resultData[scope.row.val2]=resultData[scope.row.val2].slice(0,15)" -->

                      <el-input
                        type="number"
                        v-only-number="{ min: 0, precision: 2 }"
                        v-model="resultData[scope.row.val2]"
                      >
                        <!--
                         @input.native="resultData[scope.row.val2]=parseInt(resultData[scope.row.val2])"

                        -->
                      </el-input>
                    </div>
                    <div v-else>
                      <!-- @input="if(resultData[scope.row.val2].length>15)resultData[scope.row.val2]=resultData[scope.row.val2].slice(0,15)" -->

                      <el-input
                        type="number"
                        v-only-number="{ min: 0, precision: 2 }"
                        v-model="resultData[scope.row.val2]"
                      >
                        <!--
                        @input.native="resultData[scope.row.val2]=parseInt(resultData[scope.row.val2])"

                        -->
                      </el-input>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="selling" id="selling">
            <p class="bold">去化情况</p>
            <div class="sellingTable">
              <div style="background: rgb(245, 247, 250); color: rgb(153, 153, 153);">
                <div class="t_col" style="min-width:500px"></div>
                <div class="t_col" style="text-indent:10px">目标(顶设)</div>
                <div class="t_col" style="text-indent:10px">实际</div>
                <div class="t_col" style="text-indent:10px">偏差</div>
                <div class="t_col" style="text-indent:10px">偏差率%</div>
              </div>
              <div>
                <div class="t_col" style="min-width:500px;text-indent:10px">去化套数</div>
                <div class="t_col" style="text-indent:10px">{{ resultData.designtwo_selling_num }}</div>
                <div class="t_col" style="text-indent:10px">{{ resultData.actual_selling_num }}</div>
                <div class="t_col" style="text-indent:10px">{{ resultData.bias_selling_num }}</div>
                <div class="t_col" style="text-indent:10px">{{ resultData.biasper_selling_num }}</div>
              </div>
              <div>
                <div class="t_col" style="min-width:500px;text-indent:10px">去化货值(万)</div>
                <div class="t_col" style="text-indent:10px">{{ resultData.designtwo_selling_value }}</div>
                <div class="t_col" style="text-indent:10px">{{ resultData.actual_selling_value }}</div>
                <div class="t_col" style="text-indent:10px">{{ resultData.bias_selling_value }}</div>
                <div class="t_col" style="text-indent:10px">{{ resultData.biasper_selling_value }}</div>
              </div>
              <div
                v-if="resultData.avg && resultData.avg.length > 0"
                :style="{ height: resultData.avg.length * 40 + 'px' }"
              >
                <div
                  :style="{
                    'line-height': resultData.avg.length * 40 + 'px',
                    height: resultData.avg.length * 40 + 'px'
                  }"
                  class="t_col_l"
                >
                  <div
                    style="text-align:left;text-indent:10px"
                    v-if="resultData.avg && resultData.avg.length > 0"
                  >去化均价(元/㎡)</div>
                  <div>
                    <el-tooltip
                      class="t_col_cell"
                      v-for="(item, index) in resultData.avg"
                      :key="index"
                      :content="item.product_type"
                      :disabled="!item.product_type"
                      placement="bottom"
                      effect="light"
                    >
                      <div>{{ item.product_type }}</div>
                    </el-tooltip>
                  </div>
                </div>
                <div class="t_col">
                  <div
                    style="text-indent:10px"
                    v-for="(item, index) in resultData.avg"
                    :key="index"
                  >{{ item.targ_avg | fixed }}</div>
                </div>
                <div class="t_col">
                  <div
                    style="text-indent:10px"
                    v-for="(item, index) in resultData.avg"
                    :key="index"
                  >{{ item.actual_avg | fixed }}</div>
                </div>
                <div class="t_col">
                  <div
                    style="text-indent:10px"
                    v-for="(item, index) in resultData.avg"
                    :key="index"
                  >{{ item.bias_price | fixed }}</div>
                </div>
                <div class="t_col">
                  <div
                    style="text-indent:10px"
                    v-for="(item, index) in resultData.avg"
                    :key="index"
                  >{{ item.bias_per | fixed }}</div>
                </div>
              </div>
              <div>
                <div class="t_col" style="min-width:500px;text-indent:10px">取证货值去化率%</div>
                <div
                  class="t_col"
                  style="text-indent:10px"
                >{{ resultData.designtwo_selling_takeper }}%</div>
                <div class="t_col" style="text-indent:10px">{{ resultData.actual_selling_takeper }}%</div>
                <div class="t_col" style="text-indent:10px">{{ resultData.bias_selling_takeper }}%</div>
                <div
                  class="t_col"
                  style="text-indent:10px"
                >{{ resultData.biasper_selling_takeper }}%</div>
              </div>
              <div>
                <div class="t_col" style="min-width:500px;text-indent:10px">累计来访(组)</div>
                <div class="t_col" style="text-indent:10px">{{ resultData.designtwo_add_visit }}</div>
                <div class="t_col" style="text-indent:10px">{{ resultData.actual_add_visit }}</div>
                <div class="t_col" style="text-indent:10px">{{ resultData.bias_add_visit }}</div>
                <div class="t_col" style="text-indent:10px">{{ resultData.biasper_add_visit }}</div>
              </div>
              <div>
                <div class="t_col" style="min-width:500px;text-indent:10px">累计大卡(组)</div>
                <div class="t_col" style="text-indent:10px">{{ resultData.designtwo_add_big }}</div>
                <div class="t_col" style="text-indent:10px">{{ resultData.actual_add_big }}</div>
                <div class="t_col" style="text-indent:10px">{{ resultData.bias_add_big }}</div>
                <div class="t_col" style="text-indent:10px">{{ resultData.biasper_add_big }}</div>
              </div>
              <div>
                <div class="t_col" style="min-width:500px;text-indent:10px">大卡转化率%</div>
                <div class="t_col" style="text-indent:10px">{{ resultData.designtwo_add_big_per }}%</div>
                <div class="t_col" style="text-indent:10px">{{ resultData.actual_add_big_per }}%</div>
                <div class="t_col" style="text-indent:10px">{{ resultData.bias_add_big_per }}%</div>
                <div class="t_col" style="text-indent:10px">{{ resultData.biasper_add_big_per }}%</div>
              </div>
              <div>
                <div class="t_col" style="min-width:500px;text-indent:10px">当天到场客户量(组)</div>
                <div class="t_col">
                  <div style="text-indent:10px">{{resultData.designtwo_this_client}}</div>
                </div>
                <div class="t_col">
                  <el-input
                    type="number"
                    style="padding:0 5px"
                    v-if="apstatus != 4 && apstatus != 3"
                    v-model="resultData.actual_this_client"
                    @input.native="setActual_this_client(resultData,resultData.actual_this_client)"
                  ></el-input>
                  <div style="text-indent:10px" v-else>{{resultData.actual_this_client}}</div>
                </div>
                <div class="t_col">
                  <div style="text-indent:10px">{{resultData.bias_this_client}}</div>
                </div>
                <div class="t_col">
                  <div style="text-indent:10px">{{resultData.biasper_this_client | fixed}}</div>
                </div>
              </div>
              <div>
                <div class="t_col" style="min-width:500px;text-indent:10px">当天到场客户转化率（%）</div>
                <div
                  class="t_col"
                  style="text-indent:10px"
                >{{ resultData.designtwo_this_clientper }}%</div>
                <div class="t_col" style="text-indent:10px">{{ resultData.actual_this_clientper }}%</div>
                <div class="t_col" style="text-indent:10px">{{ resultData.bias_this_clientper }}%</div>
                <div class="t_col" style="text-indent:10px">{{ resultData.biasper_this_clientper }}%</div>
              </div>
              <div>
                <div class="t_col" style="min-width:500px;text-indent:10px">成交率%</div>
                <div class="t_col" style="text-indent:10px">{{ resultData.designtwo_finish }}%</div>
                <div class="t_col" style="text-indent:10px">{{ resultData.actual_finish }}%</div>
                <div class="t_col" style="text-indent:10px">{{ resultData.bias_finish }}%</div>
                <div class="t_col" style="text-indent:10px">{{ resultData.biasper_finish }}%</div>
              </div>
            </div>
            <div style="text-align: left;line-height:20px;height: 20px">
              备注 ： 当天到场客户量(组)、 当天到场客户转化率（%）
              取自首开前7天预估。
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="2">
          <!-- <div class="link">
            <el-button type="text" @click="scrollLink('secondReport')">首开次日播报表</el-button>
            <el-button type="text" @click="scrollLink('reason')">偏差核心原因说明</el-button>
          </div>-->
          <div class="secondReport" id="secondReport">
            <p class="bold">首开次日播报表</p>
            <div class="secondReportTable">
              <div style="background: rgb(245, 247, 250); color: rgb(153, 153, 153);">
                <div class="t_col" style="min-width:400px"></div>
                <div class="t_col">投资版</div>
                <div class="t_col">战规版</div>
                <div class="t_col">首开前七天预估版</div>
                <div class="t_col marginNull">兑现版</div>
                <div class="t_col">偏差</div>
                <div class="t_col">偏差率%</div>
              </div>
              <div>
                <div class="t_col" style="min-width:400px">首开节点</div>
                <div class="t_col">{{ resultDataCR.invest_open_node }}</div>
                <div class="t_col">{{ resultDataCR.rules_open_node }}</div>
                <div class="t_col">{{ resultDataCR.estimate_open_node }}</div>
                <div class="t_col" v-if="apstatus != 4 && apstatus != 3">
                  <!-- <el-date-picker
                    v-model="resultDataCR.cash_open_node"
                    format="yyyy-MM-dd"
                    type="date"
                    :readonly="apstatus == 4 || apstatus == 3"
                    @change="
                      getSum(
                        'estimate_open_node',
                        'cash_open_node',
                        'bias_open_node',
                        'biasper_open_node'
                      )
                    "
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  ></el-date-picker> -->
                  <span>{{resultDataCR.cash_open_node}}</span>
                </div>
                <div
                  class="t_col"
                  v-if="apstatus == 4 || apstatus == 3"
                >{{ resultDataCR.cash_open_node }}</div>
                <div class="t_col">{{ resultDataCR.bias_open_node }}</div>
                <div class="t_col">--</div>
              </div>
              <div>
                <div class="t_col" style="min-width:400px">首开物业类型</div>
                <el-tooltip
                  class="t_col"
                  :content="resultDataCR.invest_xreal_type"
                  :disabled="!resultDataCR.invest_xreal_type"
                  placement="bottom"
                  effect="light"
                >
                  <div>{{ resultDataCR.invest_xreal_type }}</div>
                </el-tooltip>
                <el-tooltip
                  class="t_col"
                  :content="resultDataCR.rules_xreal_type"
                  :disabled="!resultDataCR.rules_xreal_type"
                  placement="bottom"
                  effect="light"
                >
                  <div>{{ resultDataCR.rules_xreal_type }}</div>
                </el-tooltip>
                <el-tooltip
                  class="t_col"
                  :content="resultDataCR.estimate_xreal_type"
                  :disabled="!resultDataCR.estimate_xreal_type"
                  placement="bottom"
                  effect="light"
                >
                  <div>{{ resultDataCR.estimate_xreal_type }}</div>
                </el-tooltip>
                <!-- <div class="t_col" v-if="apstatus!=4 && apstatus!=3">
                  <el-input
                    v-model="resultDataCR.cash_xreal_type"
                  ></el-input>
                </div>-->
                <!-- <div class="t_col" v-if="apstatus==4 || apstatus==3">{{resultDataCR.cash_xreal_type}}</div> -->
                <el-tooltip
                  class="t_col"
                  :content="resultDataCR.cash_xreal_type"
                  :disabled="!resultDataCR.cash_xreal_type"
                  placement="bottom"
                  effect="light"
                >
                  <div>{{ resultDataCR.cash_xreal_type }}</div>
                </el-tooltip>
                <div class="t_col">--</div>

                <div class="t_col">--</div>
              </div>
              <div>
                <div class="t_col" style="min-width:400px">首开取证货值(万元)</div>
                <div class="t_col">{{ resultDataCR.invest_take_card_value }}</div>
                <div class="t_col">{{ resultDataCR.rules_take_card_value }}</div>
                <div class="t_col">{{ resultDataCR.estimate_take_card_value }}</div>
                <div class="t_col" v-if="apstatus != 4 && apstatus != 3">
                  <!-- <el-input
                    type="number"
                    :readonly="apstatus == 4 || apstatus == 3"
                    @change="
                      getSum(
                        'estimate_take_card_value',
                        'cash_take_card_value',
                        'bias_take_card_value',
                        'biasper_take_card_value'
                      )
                    "
                    v-model="resultDataCR.cash_take_card_value"
                  ></el-input> -->
                  <span>{{resultDataCR.cash_take_card_value}}</span>
                </div>
                <div
                  class="t_col"
                  v-if="apstatus == 4 || apstatus == 3"
                >{{ resultDataCR.cash_take_card_value }}</div>
                <div class="t_col">{{ resultDataCR.bias_take_card_value }}</div>
                <div class="t_col">{{ resultDataCR.biasper_take_card_value }}</div>
              </div>

              <div>
                <div class="t_col" style="min-width:400px">首开推售货值(万元)</div>
                <div class="t_col">{{ resultDataCR.invest_push_value }}</div>
                <div class="t_col">{{ resultDataCR.rules_push_value }}</div>
                <div class="t_col">{{ resultDataCR.estimate_push_value }}</div>
                <div class="t_col" v-if="apstatus != 4 && apstatus != 3">
                  <!-- <el-input
                    type="number"
                    :readonly="apstatus == 4 || apstatus == 3"
                    @change="
                      getSum(
                        'estimate_push_value',
                        'cash_push_value',
                        'bias_push_value',
                        'biasper_push_value'
                      )
                    "
                    v-model="resultDataCR.cash_push_value"
                  ></el-input> -->
                  <span>{{resultDataCR.cash_push_value}}</span>
                </div>
                <div
                  class="t_col"
                  v-if="apstatus == 4 || apstatus == 3"
                >{{ resultDataCR.cash_push_value }}</div>
                <div class="t_col">{{ resultDataCR.bias_push_value }}</div>
                <div class="t_col">{{ resultDataCR.biasper_push_value }}</div>
              </div>
              <div>
                <div class="t_col" style="min-width:400px">首开去化货值(万元)</div>
                <div class="t_col">{{ resultDataCR.invest_selling_value }}</div>
                <div class="t_col">{{ resultDataCR.rules_selling_value }}</div>
                <div class="t_col">{{ resultDataCR.estimate_selling_value }}</div>
                <div class="t_col" v-if="apstatus != 4 && apstatus != 3">
                  <!-- <el-input
                    type="number"
                    :readonly="apstatus == 4 || apstatus == 3"
                    @change="
                      getSum(
                        'estimate_selling_value',
                        'cash_selling_value',
                        'bias_selling_value',
                        'biasper_selling_value'
                      )
                    "
                    v-model="resultDataCR.cash_selling_value"
                  ></el-input> -->
                  <span>{{resultDataCR.cash_selling_value}}</span>

                </div>
                <div
                  class="t_col"
                  v-if="apstatus == 4 || apstatus == 3"
                >{{ resultDataCR.cash_selling_value }}</div>
                <div class="t_col">{{ resultDataCR.bias_selling_value }}</div>
                <div class="t_col">{{ resultDataCR.biasper_selling_value }}</div>
              </div>
              <div
                v-if="resultDataCR.avg != null && resultDataCR.avg.length > 0"
                :style="{ height: resultDataCR.avg.length * 40 + 'px' }"
              >
                <div
                  :style="{
                    'line-height': resultDataCR.avg.length * 40 + 'px',
                    height: resultDataCR.avg.length * 40 + 'px'
                  }"
                  class="t_col_l"
                >
                  <div style="text-align:left;text-indent:5px">首开均价(元/㎡)</div>
                  <div>
                    <div
                      class="t_col_cell"
                      v-for="(item, index) in resultDataCR.avg"
                      :key="index"
                    >{{ item.product_type }}</div>
                  </div>
                </div>

                <div class="t_col">
                  <div
                    v-for="(item, index) in resultDataCR.avg"
                    :key="index"
                  >{{ item.invest_avg | fixed }}</div>
                </div>
                <div class="t_col">
                  <div
                    v-for="(item, index) in resultDataCR.avg"
                    :key="index"
                  >{{ item.rules_avg | fixed }}</div>
                </div>
                <div class="t_col">
                  <div
                    v-for="(item, index) in resultDataCR.avg"
                    :key="index"
                  >{{ item.estimate_price | fixed }}</div>
                </div>
                <div class="t_col">
                  <div v-for="(item, index) in resultDataCR.avg" :key="index">
                    <!-- <el-input
                      v-if="apstatus != 4 && apstatus != 3"
                      type="number"
                      v-only-number="{ min: 0, precision: 2 }"
                      @change="
                        getSum(
                          'estimate_price',
                          'cash_price',
                          'bias_price',
                          'bias_per'
                        )
                      "
                      v-model="item.cash_price"
                    ></el-input> -->
                    <span>{{ item.cash_price | fixed }}</span>
                  </div>
                </div>
                <div class="t_col">
                  <div
                    v-for="(item, index) in resultDataCR.avg"
                    :key="index"
                  >{{ item.bias_price | fixed }}</div>
                </div>
                <div class="t_col">
                  <div
                    v-for="(item, index) in resultDataCR.avg"
                    :key="index"
                  >{{ item.bias_per | fixed }}</div>
                </div>
              </div>

              <div>
                <div class="t_col" style="min-width:400px">首开取证货值去化率%</div>
                <div class="t_col">{{ resultDataCR.invest_take_card_per }}%</div>
                <div class="t_col">{{ resultDataCR.rules_take_card_per }}%</div>
                <div class="t_col">{{ resultDataCR.estimate_take_card_per }}%</div>
                <!-- <div class="t_col" v-if="apstatus != 4 && apstatus != 3">
                  <el-input
                    type="number"
                    :readonly="apstatus == 4 || apstatus == 3"
                    @change="
                      getSum(
                        'estimate_take_card_per',
                        'cash_take_card_per',
                        'bias_take_card_per',
                        'biasper_take_card_per'
                      )
                    "
                    v-model="resultDataCR.cash_take_card_per"
                  ></el-input>
                </div>-->
                <div class="t_col">{{resultDataCR.cash_take_card_per}}%</div>
                <div
                  class="t_col"
                >{{ resultDataCR.bias_take_card_per ? resultDataCR.bias_take_card_per + '%' : resultDataCR.bias_take_card_per }}</div>
                <div
                  class="t_col"
                >{{ resultDataCR.biasper_take_card_per ? resultDataCR.biasper_take_card_per + '%' : resultDataCR.biasper_take_card_per }}</div>
              </div>

              <div>
                <div class="t_col" style="min-width:400px">创造利润率%</div>
                <div class="t_col">{{ resultDataCR.invest_create_per }}%</div>
                <div class="t_col">{{ resultDataCR.rules_create_per }}%</div>
                <div class="t_col">{{ resultDataCR.estimate_create_per }}%</div>
                <div class="t_col" v-if="apstatus != 4 && apstatus != 3">
                  <el-input
                    type="number"
                    v-only-number="{ precision: 2 }"
                    @change="
                      getSum(
                        'estimate_create_per',
                        'cash_create_per',
                        'bias_create_per',
                        'biasper_create_per'
                      )
                    "
                    v-model="resultDataCR.cash_create_per"
                  ></el-input>
                  <!-- <span>{{resultDataCR.cash_create_per}}</span> -->
                </div>
                <div
                  class="t_col"
                  v-if="apstatus == 4 || apstatus == 3"
                >{{ resultDataCR.cash_create_per }}%</div>
                <div
                  class="t_col"
                >{{ resultDataCR.bias_create_per? resultDataCR.bias_create_per + '%' : resultDataCR.bias_create_per }}</div>
                <div
                  class="t_col"
                >{{ resultDataCR.biasper_create_per ? resultDataCR.biasper_create_per + '%' : resultDataCR.biasper_create_per}}</div>
              </div>

              <div>
                <div class="t_col" style="min-width:400px">整盘利润率%</div>
                <div class="t_col">{{ resultDataCR.invest_all_per }}%</div>
                <div class="t_col">{{ resultDataCR.rules_all_per }}%</div>
                <div class="t_col">{{ resultDataCR.estimate_all_per }}%</div>
                <div class="t_col" v-if="apstatus != 4 && apstatus != 3">
                  <el-input
                    type="number"
                    v-only-number="{ precision: 2 }"
                    @change="
                      getSum(
                        'estimate_all_per',
                        'cash_all_per',
                        'bias_all_per',
                        'biasper_all_per'
                      )
                    "
                    v-model="resultDataCR.cash_all_per"
                  ></el-input>
                  <!-- <span>{{resultDataCR.cash_all_per}}</span> -->
                </div>
                <div
                  class="t_col"
                  v-if="apstatus == 4 || apstatus == 3"
                >{{ resultDataCR.cash_all_per }}%</div>
                <div
                  class="t_col"
                >{{ resultDataCR.bias_all_per ? resultDataCR.bias_all_per + '%' : resultDataCR.bias_all_per }}</div>
                <div
                  class="t_col"
                >{{ resultDataCR.biasper_all_per? resultDataCR.biasper_all_per+ '%' : resultDataCR.biasper_all_per}}</div>
              </div>

              <div>
                <div class="t_col" style="min-width:400px">非融IRR</div>
                <div class="t_col">{{ resultDataCR.invest_irr }}</div>
                <div class="t_col">{{ resultDataCR.rules_irr }}</div>
                <div class="t_col">{{ resultDataCR.estimate_irr }}</div>
                <div class="t_col" v-if="apstatus != 4 && apstatus != 3">
                  <el-input
                    type="number"
                    v-only-number="{ precision: 2 }"
                    @change="
                      getSum(
                        'estimate_irr',
                        'cash_irr',
                        'bias_irr',
                        'biasper_irr'
                      )
                    "
                    v-model="resultDataCR.cash_irr"
                  ></el-input>
                  <!-- <span>{{resultDataCR.cash_irr}}</span> -->
                </div>
                <div class="t_col" v-if="apstatus == 4 || apstatus == 3">{{ resultDataCR.cash_irr }}</div>
                <div class="t_col">{{ resultDataCR.bias_irr }}</div>
                <div class="t_col">{{ resultDataCR.biasper_irr }}</div>
              </div>

              <div>
                <div class="t_col" style="min-width:400px">静态投资回收期(月)</div>
                <div class="t_col">{{ resultDataCR.invest_payback }}</div>
                <div class="t_col">{{ resultDataCR.rules_payback }}</div>
                <div class="t_col">{{ resultDataCR.estimate_payback }}</div>
                <div class="t_col" v-if="apstatus != 4 && apstatus != 3">
                  <el-input
                    type="number"
                    v-only-number="{ min: 0, precision: 2 }"
                    @change="
                      getSum(
                        'estimate_payback',
                        'cash_payback',
                        'bias_payback',
                        'biasper_payback'
                      )
                    "
                    v-model="resultDataCR.cash_payback"
                  ></el-input>
                  <!-- <span>{{resultDataCR.cash_payback}}</span> -->
                </div>
                <div
                  class="t_col"
                  v-if="apstatus == 4 || apstatus == 3"
                >{{ resultDataCR.cash_payback }}</div>
                <div class="t_col">{{ resultDataCR.bias_payback }}</div>

                <div class="t_col">{{ resultDataCR.biasper_payback }}</div>
              </div>
            </div>
          </div>
          <div class="reason" id="reason">
            <p class="bold">核心偏差原因说明</p>
            <el-form :model="reasonForm" ref="reasonForm" label-width="60px">
              <el-form-item label="市场" prop="market">
                <el-input
                  type="textarea"
                  show-word-limit
                  maxlength="100"
                  v-model="resultDataCR.content_bazaar"
                  :readonly="apstatus == 4 || apstatus == 3"
                ></el-input>
              </el-form-item>
              <el-form-item label="团队" prop="team">
                <el-input
                  type="textarea"
                  show-word-limit
                  maxlength="100"
                  v-model="resultDataCR.content_team"
                  :readonly="apstatus == 4 || apstatus == 3"
                ></el-input>
              </el-form-item>
              <el-form-item label="产品" prop="prod">
                <el-input
                  type="textarea"
                  show-word-limit
                  maxlength="100"
                  v-model="resultDataCR.content_product"
                  :readonly="apstatus == 4 || apstatus == 3"
                ></el-input>
              </el-form-item>
              <el-form-item label="政策" prop="desc">
                <el-input
                  type="textarea"
                  show-word-limit
                  maxlength="100"
                  v-model="resultDataCR.content_policy"
                  :readonly="apstatus == 4 || apstatus == 3"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="null"></div>
    <div class="bottom" v-if="isType != 'view'">
      <el-button
        type="primary"
        v-if="
          !(isSave == 1 && activeTab == 3) && (apstatus != 3 && apstatus != 4)
        "
        v-show="$store.state.user.userPower.includes('提交审批')"
        @click="saveData('submit')"
      >提交审批</el-button>
      <el-button
        @click="saveData('save')"
        v-if="
          !(isSave == 1 && activeTab == 3) && (apstatus != 3 && apstatus != 4)
        "
      >保存</el-button>
      <el-button v-if="isShowKS" type @click="saveData('ks')">快速提交</el-button>
    </div>

    <el-dialog
      class="building-dialog"
      title="选择楼栋套数"
      :visible.sync="take_num_visible"
      @close="cancleHandler('take_num', 'take_buildingList')"
    >
      <el-scrollbar class="dialog-scrollbar">
        <div class="dialog-cont">
          <el-checkbox-group v-model="take_num">
            <el-checkbox
              v-for="item in take_buildingList"
              :key="item.buildingName"
              :label="item.buildingName"
              :value="item.buildingName"
            ></el-checkbox>
          </el-checkbox-group>
          <div>
            <div v-for="(item, i) in take_buildingList" :key="item.buildingName + i" class="item">
              <el-input size="mini" placeholder v-model.number="item.sum"></el-input>&nbsp;&nbsp;套
            </div>
          </div>
        </div>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancleHandler('take_num', 'take_buildingList')">取 消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="confirmHandler('take_num', 'take_buildingList')"
        >确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      class="building-dialog"
      title="选择楼栋套数"
      :visible.sync="push_num_visible"
      @close="cancleHandler('push_num', 'push_buildingList')"
    >
      <el-scrollbar class="dialog-scrollbar">
        <div class="dialog-cont">
          <el-checkbox-group v-model="push_num">
            <el-checkbox
              v-for="item in push_buildingList"
              :key="item.buildingName"
              :label="item.buildingName"
              :value="item.buildingName"
            ></el-checkbox>
          </el-checkbox-group>
          <div>
            <div v-for="(item, i) in push_buildingList" :key="item.buildingName + i" class="item">
              <el-input size="mini" placeholder v-model.number="item.sum"></el-input>&nbsp;&nbsp;套
            </div>
          </div>
        </div>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancleHandler('push_num', 'push_buildingList')">取 消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="confirmHandler('push_num', 'push_buildingList')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  viewOpenThisDayInfo,
  insertOpenThisDay,
  insertOpenMorrowBroadcast,
  viewOpenMorrowDayInfo,
  initGuestStorage,
  getOpenVersionByPlanId,
  getOpenVersionById,
  queryGuestStorageList,
  insertGuestStorage,
  queryBuildingName,
  get,
  approveOpenNodeInfo,
  exportExcel,
  insertGuestStorageByProject,
  addOrderByProject
} from "@/api/firstPlan";
import { toHistoryUrl, queryFlowId } from "@/api/offerFlow.js";
import { downLoad } from "@/api/request";
export default {
  components: {
    navbarLink: () => import("./components/navbarLink")
  },
  filters: {
    fixed(data) {
      if (!data) {
        return "0.00";
      }
      return data.toFixed(2);
    }
  },
  data() {
    return {
      form: {
        versions: "开盘v1-20200620"
      },
      isShowKS: location.origin.includes("uat"),
      apCreate: 1,
      isType: "",
      apstatus: 10,
      reasonForm: {
        market: "111",
        team: "222",
        prod: "333",
        desc: "444"
      },
      thisDayVersion: [
        {
          id: "",
          name: ""
        }
      ],
      thisVersion: "",
      activeTab: "1",
      isSave: 0,
      //当日
      take_num_visible: false,
      take_num_action: false,
      check_take_num: [],
      check_take_buildingList: [],
      push_num_visible: false,
      push_num_action: false,
      check_push_num: [],
      check_push_buildingList: [],
      resultData: {
        project_duty: "",
        take_card_time: "",
        open_time: "",
        take_card_type: "",
        push_real_type: "",
        take_num: "",
        push_num: "",
        take_value: "",
        push_value: "",
        take_avg_price: "",
        push_avg_price: "",
        designtwo_selling_num: "",
        designtwo_selling_value: "",
        designtwo_selling_avg_price: "",
        designtwo_selling_takeper: "",
        designtwo_add_visit: "",
        designtwo_add_big: "",
        designtwo_add_big_per: "",
        designtwo_this_client: "",
        designtwo_this_clientper: "",
        designtwo_finish: "",
        actual_selling_num: "",
        actual_selling_value: "",
        actual_selling_avg_price: "",
        actual_selling_takeper: "",
        actual_add_visit: "",
        actual_add_big: "",
        actual_add_big_per: "",
        actual_this_client: "",
        actual_this_clientper: "",
        actual_finish: "",
        bias_selling_num: "",
        bias_selling_value: "",
        bias_selling_avg_price: "",
        bias_selling_takeper: "",
        bias_add_visit: "",
        bias_add_big: "",
        bias_add_big_per: "",
        bias_this_client: "",
        bias_this_clientper: "",
        bias_finish: "",
        biasper_selling_num: "",
        biasper_selling_value: "",
        biasper_selling_avg_price: "",
        biasper_selling_takeper: "",
        biasper_add_visit: "",
        biasper_add_big: "",
        biasper_add_big_per: "",
        biasper_this_client: "",
        biasper_this_clientper: "",
        biasper_finish: ""
      },
      firstReportData: [
        {
          name1: "取证时间",
          val1: "take_card_time",
          name2: "首开时间",
          val2: "open_time"
        },
        {
          name1: "取证产品类型",
          val1: "take_card_type",
          name2: "推售产品类型",
          val2: "push_real_type"
        },
        {
          name1: "取证楼栋/套数",
          val1: "take_num",
          name2: "推售楼栋/套数",
          val2: "push_num"
        },
        {
          name1: "取证货值(万元)",
          val1: "take_value",
          name2: "推售货值(万元)",
          val2: "push_value"
        },
        {
          name1: "取证均价(元/㎡)",
          val1: "take_avg_price",
          name2: "推售均价(元/㎡)",
          val2: "push_avg_price"
        }
      ],
      buildingList: [],
      take_buildingList: [],
      push_buildingList: [],
      take_num: [],
      take_num_bol: false,
      take_card_type: [],
      take_card_type_bol: false,
      push_num: [],
      push_num_bol: false,
      push_real_type: [],
      push_real_type_bol: false,
      sellingData: [
        {
          name: "去化套数(套)",
          designtwo: "designtwo_selling_num",
          actual: "actual_selling_num",
          bias: "bias_selling_num",
          biasper: "biasper_selling_num"
        },
        {
          name: "去化货值(万)",
          designtwo: "designtwo_selling_value",
          actual: "actual_selling_value",
          bias: "bias_selling_value",
          biasper: "biasper_selling_value"
        },
        {
          name: "去化均价(元/㎡)",
          designtwo: "designtwo_selling_avg_price",
          actual: "actual_selling_avg_price",
          bias: "bias_selling_avg_price",
          biasper: "biasper_selling_avg_price"
        },
        {
          name: "取证货值去化率%",
          designtwo: "designtwo_selling_takeper",
          actual: "actual_selling_takeper",
          bias: "bias_selling_takeper",
          biasper: "biasper_selling_takeper"
        },
        {
          name: "累计来访(组)",
          designtwo: "designtwo_add_visit",
          actual: "actual_add_visit",
          bias: "bias_add_visit",
          biasper: "biasper_add_visit"
        },
        {
          name: "累计大卡(组)",
          designtwo: "designtwo_add_big",
          actual: "actual_add_big",
          bias: "bias_add_big",
          biasper: "biasper_add_big"
        },
        {
          name: "大卡转化率%",
          designtwo: "designtwo_add_big_per",
          actual: "actual_add_big_per",
          bias: "bias_add_big_per",
          biasper: "biasper_add_big_per"
        },
        {
          name: "当天到场客户量(组)",
          designtwo: "designtwo_this_client",
          actual: "actual_this_client",
          bias: "bias_this_client",
          biasper: "biasper_this_client"
        },
        {
          name: "当天到场客户转化率（%）",
          designtwo: "designtwo_this_clientper",
          actual: "actual_this_clientper",
          bias: "bias_this_clientper",
          biasper: "biasper_this_clientper"
        },
        {
          name: "成交率%",
          designtwo: "designtwo_finish",
          actual: "actual_finish",
          bias: "bias_finish",
          biasper: "biasper_finish"
        }
      ],
      //次日
      resultDataCR: {
        invest_xreal_type: "",
        invest_take_card_value: "",
        invest_open_node: "",
        invest_push_value: "",
        invest_selling_value: "",
        invest_take_card_per: "",
        invest_open_avg_price: "",
        invest_create_per: "",
        invest_all_per: "",
        invest_irr: "",
        invest_payback: "",
        rules_xreal_type: "",
        rules_take_card_value: "",
        rules_open_node: "",
        rules_push_value: "",
        rules_selling_value: "",
        rules_take_card_per: "",
        rules_open_avg_price: "",
        rules_create_per: "",
        rules_all_per: "",
        rules_irr: "",
        rules_payback: "",
        estimate_xreal_type: "",
        estimate_take_card_value: "",
        estimate_open_node: "",
        estimate_push_value: "",
        estimate_selling_value: "",
        estimate_take_card_per: "",
        estimate_open_avg_price: "",
        estimate_create_per: "",
        estimate_all_per: "",
        estimate_irr: "",
        estimate_payback: "",
        cash_xreal_type: "",
        cash_take_card_value: "",
        cash_open_node: "",
        cash_push_value: "",
        cash_selling_value: "",
        cash_take_card_per: "",
        cash_open_avg_price: "",
        cash_create_per: "",
        cash_all_per: "",
        cash_irr: "",
        cash_payback: "",
        bias_xreal_type: "",
        bias_take_card_value: "",
        bias_open_node: "",
        bias_push_value: "",
        bias_selling_value: "",
        bias_take_card_per: "",
        bias_open_avg_price: "",
        bias_create_per2: "",
        bias_create_per: "",
        bias_all_per: "",
        bias_irr: "",
        bias_payback: "",
        biasper_xreal_type: "",
        biasper_take_card_value: "",
        biasper_open_node: "",
        biasper_push_value: "",
        biasper_selling_value: "",
        biasper_take_card_per: "",
        biasper_open_avg_price: "",
        biasper_create_per: "",
        biasper_all_per: "",
        biasper_irr: "",
        biasper_payback: "",
        content_bazaar: "",
        content_team: "",
        content_product: "",
        content_policy: ""
      },
      secondReportData: [
        {
          name: "首开节点",
          invest: "invest_open_node",
          rules: "rules_open_node",
          estimate: "estimate_open_node",
          bias: "bias_open_node",
          biasper: "biasper_open_node",
          cash: "cash_open_node"
        },
        {
          name: "首开物业类型",
          invest: "invest_xreal_type",
          rules: "rules_xreal_type",
          estimate: "estimate_xreal_type",
          bias: "bias_xreal_type",
          biasper: "biasper_xreal_type",
          cash: "cash_xreal_type"
        },
        {
          name: "首开取证货值(万元)",
          invest: "invest_take_card_value",
          rules: "rules_take_card_value",
          estimate: "estimate_take_card_value",
          bias: "bias_take_card_value",
          cash: "cash_take_card_value"
        },
        {
          name: "首开推售货值(万元)",
          invest: "invest_push_value",
          rules: "rules_push_value",
          estimate: "estimate_push_value",
          bias: "bias_push_value",
          biasper: "biasper_push_value",
          cash: "cash_push_value"
        },
        {
          name: "首开去化货值(万元)",
          invest: "invest_selling_value",
          rules: "rules_selling_value",
          estimate: "estimate_selling_value",
          bias: "bias_selling_value",
          biasper: "biasper_selling_value",
          cash: "cash_selling_value"
        },
        {
          name: "首开均价(元/㎡)",
          invest: "invest_open_avg_price",
          rules: "rules_open_avg_price",
          estimate: "estimate_open_avg_price",
          bias: "bias_open_avg_price",
          biasper: "biasper_open_avg_price",
          cash: "cash_open_avg_price"
        },
        {
          name: "首开取证货值去化率%",
          invest: "invest_take_card_per",
          rules: "rules_take_card_per",
          estimate: "estimate_take_card_per",
          bias: "bias_take_card_per",
          biasper: "biasper_take_card_per",
          cash: "cash_take_card_per"
        },
        {
          name: "创造利润率%",
          invest: "invest_create_per",
          rules: "rules_create_per",
          estimate: "estimate_create_per",
          bias: "bias_create_per",
          biasper: "biasper_create_per",
          cash: "cash_create_per"
        },
        {
          name: "整盘利润率%",
          invest: "invest_all_per",
          rules: "rules_all_per",
          estimate: "estimate_all_per",
          bias: "bias_all_per",
          biasper: "biasper_all_per",
          cash: "cash_all_per"
        },
        {
          name: "非融IRR",
          invest: "invest_irr",
          rules: "rules_irr",
          estimate: "estimate_irr",
          bias: "bias_irr",
          biasper: "biasper_irr",
          cash: "cash_irr"
        },
        {
          name: "静态投资回收期(月)",
          invest: "invest_payback",
          rules: "rules_payback",
          estimate: "estimate_payback",
          bias: "bias_payback",
          biasper: "biasper_payback",
          cash: "cash_payback"
        }
      ],
      flow_id: "",
      comeData: [
        {
          week: "",
          //日期
          day_date: "",
          //计划新增
          plan_add: "",
          //计划累计
          plan_total: "",
          plan_task_per: "",
          actual_add: "",
          actual_task_per: "",
          bias_value: "",
          bias_per: "",
          week_bais_value: "",
          bias_cause: ""
        }
      ],
      nodeData: [
        {
          nide_name: "",
          plan_node_id: "",
          node_level: "",
          level: "",
          //报备
          report_num: "",
          //日期
          node_time: "",
          //计划/实际/偏差率
          line_name: "",
          id: "",
          //来访
          visit_num: "",
          plan_id: "",
          //小卡
          little_num: "",
          //小卡率
          little_per: "",
          //大卡组
          big_num: "",
          //大卡率
          big_per: "",
          //认购套
          sub_num: "",
          //成交率
          make_per: ""
        }
      ],
      thisMorrowDayVersion: ""
    };
  },
  methods: {
    clicks(event) {
      this.activeTab = event;
    },

    exportDelayData() {
      let obj = {
        plan_node_id: this.thisVersion,
        plan_id: this.$route.query.plan_id,
        project_id: this.$route.query.project_id
      };
      let _path = downLoad("/opening/exportOpenThisDayInfo", obj);
      window.location = _path;
    },
    exportNextDayDelayData() {
      console.log(JSON.stringify(this.$route.query));
      let obj = {
        plan_node_id: this.$route.query.plan_node_id,
        plan_id: this.$route.query.plan_id,
        project_id: this.$route.query.project_id,
        project_name: this.$route.query.project_name,
        isType: this.isType
      };
      let _path = downLoad("/opening/exportOpenNextDayInfo", obj);
      window.location = _path;
    },
    /*   thisDayOpenExport() {
      exportExcel({
        plan_node_id: this.thisVersion,
        plan_id: this.$route.query.plan_id,
        project_id: this.$route.query.project_id
      }).then((res) => {
        alert(res)
        const link = document.createElement('a');
        let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'});
        link.style.display = 'none';
        link.href = URL.createObjectURL(blob);
        let num = '';
        for (let i = 0; i < 10; i++) {
          num += Math.ceil(Math.random() * 10)
        }
        link.setAttribute('download', '部门周报' + num + '.xls');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)
      })
    },*/
    toPreview() {
      queryFlowId({}, this.thisVersion).then(res => {
        if (res.code == 200) {
          if (res.data.flow_status == 7) {
            this.isShowDiscard = false;
          }
          this.flow_id = res.data.flow_id;
          toHistoryUrl({
            proInstId: this.flow_id
          }).then(res => {
            window.open(res.data);
          });
        }
      });
      /*      let route =
        this.activeTab == "1" ? "/openingDayInfo" : "/openingTomorrowInfo";
      this.$router.push({
        path: route,
        query: {
          plan_node_id: this.thisVersion
        }
      });*/
    },
    tabClick(tab, event) {
      this.isDay = !this.isDay;
      if (this.activeTab == 1) {
        this.getOpenVersionByPlanId();
      }
      if (this.activeTab == 2) {
        //当日播报数据加载成功后加载次日播报数据
        this.viewOpenMorrowDayInfo();
      } else if (this.activeTab == 3) {
        //次日播报数据加载完成后加载客储数据
        this.initGuestStorage();
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
    getSum(val1, val2, bias, biasper) {
      if (val1 == "estimate_open_node") {
        let value1 = +new Date(this.resultDataCR[val1]);
        let value2 = +new Date(this.resultDataCR[val2]);
        if (!value1 || !value2) {
          return;
        }
        this.$set(
          this.resultDataCR,
          bias,
          Math.floor((value1 - value2) / 86400000)
        );
        this.$set(this.resultDataCR, biasper, 0);
      } else if (val1 == "estimate_price" && this.resultDataCR.avg) {
        this.resultDataCR.avg.forEach(item => {
          if (item[val1] == undefined || item[val2] == undefined) {
            return;
          }
          item[bias] = (item[val1] - item[val2]).toFixed(2);
          item[biasper] = parseFloat(
            ((item[val1] - item[val2]) / item[val1]) * 100
          ).toFixed(2);
        });
      } else if (val1 == "estimate_take_card_per") {
        let value1 = this.resultDataCR[val1];
        let value2 = this.resultDataCR[val2];
        if (
          value1 == undefined ||
          value2 == undefined ||
          value1 == "" ||
          value2 == ""
        ) {
          return;
        }
        this.$set(this.resultDataCR, bias, (value1 - value2).toFixed(0));
        this.$set(
          this.resultDataCR,
          biasper,
          parseFloat(((value1 - value2) / value1) * 100).toFixed(0)
        );
      } else {
        let value1 = this.resultDataCR[val1];
        let value2 = this.resultDataCR[val2];
        if (
          value1 == undefined ||
          value2 == undefined ||
          value1 == "" ||
          value2 == ""
        ) {
          return;
        }
        this.$set(this.resultDataCR, bias, (value1 - value2).toFixed(2));
        this.$set(
          this.resultDataCR,
          biasper,
          parseFloat(((value1 - value2) / value1) * 100).toFixed(2)
        );
      }
    },
    reload() {
      this.getOpenVersionByPlanId();
    },
    queryBuildingName() {
      let params = { project_id: this.$route.query.project_id };
      queryBuildingName(params).then(res => {
        if (res.result) {
          this.viewOpenThisDayInfo();
          res.result.map(item => {
            item.sum = "";
          });
          this.buildingList = JSON.parse(JSON.stringify(res.result));
        }
      });
    },
    stopHandler(e) {
      e = window.event || e;
      if (document.all) {
        //只有ie识别
        e.cancelBubble = true;
      } else {
        e.stopPropagation();
      }
    },
    selectHandler(type) {
      let that = this;
      if (that[type + "_bol"]) {
        that.$refs[type].blur();
      } else {
        that.$refs[type].focus();
      }
    },
    selectVisibleChange(bol, type) {
      let that = this;
      setTimeout(function() {
        that[type + "_bol"] = bol;
      }, 50);
    },
    checkedHandler(type, list) {
      this["check_" + type] = this[type];
      this["check_" + list] = JSON.parse(JSON.stringify(this[list]));
      this[type + "_visible"] = true;
      this[type + "_action"] = false;
    },
    cancleHandler(type, list) {
      if (!this[type + "_action"]) {
        this[type] = this["check_" + type];
        this[list] = JSON.parse(JSON.stringify(this["check_" + list]));
      }
      this[type + "_visible"] = false;
    },
    confirmHandler(type, list) {
      if (this[type].length) {
        let bol = true;
        let changeVal = [];
        let str = [];

        this[list].map(item => {
          if (this[type].indexOf(item.buildingName) !== -1 || item.sum) {
            if (!item.sum) {
              bol = false;
            }
            changeVal.push(item);
          }
        });
        if (!bol) {
          this.$message({
            type: "info",
            message: "请补全您所勾选的楼栋套数"
          });
          return;
        } else {
          // console.log(changeVal);
          changeVal.map(item => {
            if (this[type].indexOf(item.buildingName) == -1) {
              this[type].push(item.buildingName);
            }
            str.push(`${item.buildingName},${item.sum}套`);
          });
          // console.log(str.join("、"));
          this.resultData[type] = str.join("、");
        }
      }
      this[type + "_action"] = true;
      // console.log(this[type])
      // console.log(this[list])
      this[type + "_visible"] = false;
    },
    customChange(val, k) {
      this.resultData[k] = val.join("、");
    },
    customJoinChange(val, k, b) {
      // console.log(val, k);
      let changeVal = [];
      let str = [];
      let that = this;
      that[b].filter(i => {
        val.map(item => {
          if (i.buildingName == item) {
            changeVal.push(i);
          }
        });
      });
      // 选中值的nodes
      changeVal.map(item => {
        if (item.sum) {
          str.push(`${item.buildingName},${item.sum}套`);
        } else {
          str.push(item.buildingName);
        }
      });
      this.resultData[k] = str.join("、");
    },
    switchVersion(thisVersion) {
      this.thisVersion = thisVersion;
      for (var i = 0; i < this.thisDayVersion.length; i++) {
        if (this.thisVersion == this.thisDayVersion[i].id) {
          if (
            this.thisDayVersion[i] != null &&
            this.thisDayVersion[i].plan_approval != undefined
          ) {
            this.apstatus = this.thisDayVersion[i].plan_approval;
          } else {
            this.apstatus = 10;
          }
        }
      }
      this.apCreate = this.thisDayVersion[0].plan_approval;
      if (this.$route.query.disabled) {
        this.apstatus = 4;
      }
      if (this.activeTab == 1) {
        this.resultData = [];
        this.viewOpenThisDayInfo();
      } else if (this.activeTab == 2) {
        this.resultDataCR = {};
        this.getOpenVersionById();
      } else if (this.activeTab == 3) {
        this.comeData = [];
        this.queryGuestStorageList();
      }
    },
    //当日播报版本列表
    getOpenVersionByPlanId() {
      getOpenVersionByPlanId({
        plan_id: this.$route.query.plan_id
      }).then(res => {
        if (res.result) {
          this.thisDayVersion = res.result;
          this.thisVersion = res.result[0].id;
          if (res.result[0].plan_approval != null) {
            this.apstatus = res.result[0].plan_approval;
          } else {
            this.apstatus = 10;
          }
          if (this.$route.query.disabled) {
            this.apstatus = 4;
          }
          //监控进入只查看
          if (
            this.$route.query.type != null &&
            this.$route.query.type == "view"
          ) {
            this.isType = this.$route.query.type;
            this.thisVersion = this.$route.query.plan_node_id;
            this.viewOpenThisDayInfo();
          } else {
            this.queryBuildingName();
          }
          //创建版本
          this.apCreate = this.thisDayVersion[0].plan_approval;
        } else {
          this.thisDayVersion = [];
          this.thisVersion = "";
        }
      });
    },
    //渲染次日播报数据
    viewOpenMorrowDayInfo() {
      viewOpenMorrowDayInfo({
        plan_node_id: this.$route.query.plan_node_id,
        plan_id: this.$route.query.plan_id,
        project_id: this.$route.query.project_id,
        isType: this.isType
      }).then(res => {
        this.resultDataCR = res.result.info || {};
        if (this.resultDataCR.id == null) {
          //创建版本拿开盘数据
          this.$set(
            this.resultDataCR,
            "cash_open_node",
            this.resultData.open_time
          );
          this.$set(
            this.resultDataCR,
            "cash_xreal_type",
            this.resultData.push_real_type
          );
          this.$set(
            this.resultDataCR,
            "cash_take_card_value",
            this.resultData.take_value
          );
          this.$set(
            this.resultDataCR,
            "cash_push_value",
            this.resultData.push_value
          );
          this.$set(
            this.resultDataCR,
            "cash_selling_value",
            this.resultData.actual_selling_value
          );
          // this.$set(
          //   this.resultDataCR,
          //   "cash_take_card_per",
          //   this.resultData.cash_take_card_per
          // );
          if (this.resultDataCR.avg) {
            this.resultDataCR.avg.forEach((item, index) => {
              this.resultData.avg.forEach(item1 => {
                if (item.product_type_code == item1.product_type_code) {
                  this.resultDataCR.avg[index].cash_open_avg_price = 0;
                  this.$set(
                    this.resultDataCR.avg[index],
                    "cash_price",
                    item1.actual_avg
                  );
                }
              });
            });
          }
          this.getSum(
            "estimate_open_node",
            "cash_open_node",
            "bias_open_node",
            "biasper_open_node"
          );
          this.getSum(
            "estimate_take_card_value",
            "cash_take_card_value",
            "bias_take_card_value",
            "biasper_take_card_value"
          );
          this.getSum(
            "estimate_push_value",
            "cash_push_value",
            "bias_push_value",
            "biasper_push_value"
          );
          this.getSum(
            "estimate_selling_value",
            "cash_selling_value",
            "bias_selling_value",
            "biasper_selling_value"
          );
          this.getSum("estimate_price", "cash_price", "bias_price", "bias_per");
          this.getSum(
            "estimate_take_card_per",
            "cash_take_card_per",
            "bias_take_card_per",
            "biasper_take_card_per"
          );
          this.getSum(
            "estimate_create_per",
            "cash_create_per",
            "bias_create_per",
            "biasper_create_per"
          );
        }
        if (res.result.version != null) {
          this.thisDayVersion = res.result.version;
          this.thisVersion = res.result.version[0].id;
          if (
            res.result.version[0].plan_approval != null &&
            res.result.version[0].plan_approval != ""
          ) {
            this.apstatus = res.result.version[0].plan_approval;
          } else {
            this.apstatus = 10;
          }
          if (this.$route.query.disabled) {
            this.apstatus = 4;
          }
          //第一个如果是编制就不想事创建新版
          this.apCreate = this.thisDayVersion[0].plan_approval;
        } else {
          this.thisDayVersion = [];
          this.thisVersion = "";
          this.apstatus = 10;
          if (this.$route.query.disabled) {
            this.apstatus = 4;
          }
        }
      });
    },
    //渲染当日播报数据
    viewOpenThisDayInfo(type) {
      let params = {
        plan_node_id: this.thisVersion,
        plan_id: this.$route.query.plan_id,
        project_id: this.$route.query.project_id
      };
      if (type == "new") {
        params.create = "new";
        this.take_num = [];
        this.push_num = [];
        this.take_card_type = [];
        this.push_real_type = [];
      }
      viewOpenThisDayInfo(params).then(res => {
        if (res.result != null) {
          this.resultData = Object.assign({}, res.result);
          let take_buildingList = JSON.parse(JSON.stringify(this.buildingList));
          let push_buildingList = JSON.parse(JSON.stringify(this.buildingList));
          let take_num_arr = [];
          let push_num_arr = [];

          if (res.result.take_num) {
            let take_num = res.result.take_num.split("、");
            take_buildingList.map(item => {
              take_num.map(i => {
                if (i.indexOf(item.buildingName) !== -1) {
                  item.sum = i.substring(i.indexOf(",") + 1, i.indexOf("套"));
                  // console.log(item.sum, 'sum')
                  // console.log(i);
                  // console.log(i.substring(i.indexOf(",") + 1, i.indexOf("套")))
                  let ind = i.indexOf(",") == -1 ? i.length : i.indexOf(",");
                  let v = i.substring(0, ind);
                  if (take_num_arr.indexOf(v) == -1) {
                    take_num_arr.push(v);
                  }
                }
              });
            });
          }
          if (res.result.push_num) {
            let push_num = res.result.push_num.split("、");
            push_buildingList.map(item => {
              push_num.map(i => {
                if (i.indexOf(item.buildingName) !== -1) {
                  item.sum = i.substring(i.indexOf(",") + 1, i.indexOf("套"));
                  let ind = i.indexOf(",") == -1 ? i.length : i.indexOf(",");
                  let v = i.substring(0, ind);
                  if (push_num_arr.indexOf(v) == -1) {
                    push_num_arr.push(v);
                  }
                }
              });
            });
          }
          if (res.result.take_card_type) {
            this.take_card_type = res.result.take_card_type.split("、");
          }
          if (res.result.push_real_type) {
            this.push_real_type = res.result.push_real_type.split("、");
          }
          this.take_buildingList = JSON.parse(
            JSON.stringify(take_buildingList)
          );
          this.push_buildingList = JSON.parse(
            JSON.stringify(push_buildingList)
          );
          this.take_num = JSON.parse(JSON.stringify(take_num_arr));
          this.push_num = JSON.parse(JSON.stringify(push_num_arr));
          // console.log(this.take_num, "take_num");
          // console.log(this.push_num, "push_num");
          //初始化
          // if (
          //   (this.apstatus == 10 || this.apstatus == 2) &&
          //   this.resultData.take_value != null &&
          //   this.resultData.take_value != 0
          // ) {
            this.countValue(this.resultData.take_value, "take_value");
          // }
        } else {
          this.resultData = {};
        }
        if (type == "new") this.apstatus = 10;
        if (this.$route.query.disabled) {
          this.apstatus = 4;
        }
      });
    },
    //当日播报表创建版本
    createVersions() {
      this.$confirm("确认创建新版本么", "创建版本", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          if (this.activeTab == 1) {
            this.thisVersion = "";
            this.viewOpenThisDayInfo("new");
          } //次日播报创建版本
          else if (this.activeTab == 2) {
            viewOpenMorrowDayInfo({
              create: "new",
              plan_node_id: this.$route.query.plan_node_id,
              plan_id: this.$route.query.plan_id,
              project_id: this.$route.query.project_id
            }).then(res => {
              this.resultDataCR = res.result.info;
              // if (this.resultDataCR.id == null) {
                //创建版本拿开盘数据
                this.$set(
                  this.resultDataCR,
                  "cash_open_node",
                  this.resultData.open_time
                );

                this.$set(
                  this.resultDataCR,
                  "cash_xreal_type",
                  this.resultData.push_real_type
                );
                this.$set(
                  this.resultDataCR,
                  "cash_take_card_value",
                  this.resultData.take_value
                );
                this.$set(
                  this.resultDataCR,
                  "cash_push_value",
                  this.resultData.push_value
                );
                this.$set(
                  this.resultDataCR,
                  "cash_selling_value",
                  this.resultData.actual_selling_value
                );
                this.$set(
                  this.resultDataCR,
                  "cash_take_card_per",
                  this.resultData.cash_take_card_per
                );
                if (this.resultDataCR.avg) {
                  this.resultDataCR.avg.forEach((item, index) => {
                    this.resultData.avg.forEach(item1 => {
                      if (item.product_type_code == item1.product_type_code) {
                        this.resultDataCR.avg[index].cash_open_avg_price = 0;
                        this.$set(
                          this.resultDataCR.avg[index],
                          "cash_price",
                          item1.actual_avg
                        );
                      }
                    });
                  });
                }
                this.getSum(
                  "estimate_open_node",
                  "cash_open_node",
                  "bias_open_node",
                  "biasper_open_node"
                );
                this.getSum(
                  "estimate_take_card_value",
                  "cash_take_card_value",
                  "bias_take_card_value",
                  "biasper_take_card_value"
                );
                this.getSum(
                  "estimate_push_value",
                  "cash_push_value",
                  "bias_push_value",
                  "biasper_push_value"
                );
                this.getSum(
                  "estimate_selling_value",
                  "cash_selling_value",
                  "bias_selling_value",
                  "biasper_selling_value"
                );
                this.getSum(
                  "estimate_price",
                  "cash_price",
                  "bias_price",
                  "bias_per"
                );
                this.getSum(
                  "estimate_take_card_per",
                  "cash_take_card_per",
                  "bias_take_card_per",
                  "biasper_take_card_per"
                );
                this.getSum(
                  "estimate_create_per",
                  "cash_create_per",
                  "bias_create_per",
                  "biasper_create_per"
                );
              // }
              if (res.result.version != null) {
                this.thisDayVersion = res.result.version;
                this.thisVersion = res.result.version[0].id;
                if (
                  res.result.version[0].plan_approval != null &&
                  res.result.version[0].plan_approval != ""
                ) {
                  this.apstatus = res.result.version[0].plan_approval;
                } else {
                  this.apstatus = 10;
                }
                if (this.$route.query.disabled) {
                  this.apstatus = 4;
                }
              } else {
                this.thisDayVersion = [];
                this.thisVersion = "";
                this.apstatus = 10;
                if (this.$route.query.disabled) {
                  this.apstatus = 4;
                }
              }

            });
          } else {
            initGuestStorage({
              create: "new",
              plan_id: this.$route.query.plan_id,
              project_id: this.$route.query.project_id,
              plan_node_id: this.$route.query.plan_node_id,
              node_level: this.$route.query.node_level
            }).then(res => {
              this.comeData = res.result.weekNode;
              this.nodeData = res.result.monthNode;
              /*if(res.result.flowInfo){
                  this.flow_id=res.result.flowInfo.id;
              }*/

              /* for (var i = 0; i < this.nodeData.length; i++) {
                       this.nodeData[i].node_time = this.timestampToTime(
                         this.nodeData[i].node_time
                       );
                     }*/
              this.isSave = res.result.isSave;
              if (res.result.version != null) {
                this.thisDayVersion = res.result.version;
                this.thisVersion = res.result.version[0].id;
              } else {
                this.thisDayVersion = [];
                this.thisVersion = "";
              }
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    //渲染客储达成进度数据
    initGuestStorage() {
      initGuestStorage({
        plan_id: this.$route.query.plan_id,
        project_id: this.$route.query.project_id,
        plan_node_id: this.$route.query.plan_node_id,
        node_level: this.$route.query.node_level
      }).then(res => {
        this.comeData = res.result.weekNode;
        this.nodeData = res.result.monthNode;
        console.log(res.result.flowInfo.id);
        /*  if(res.result.flowInfo){
              this.flow_id=res.flowInfo.id;
          }*/
        /* for (var i = 0; i < this.nodeData.length; i++) {
          this.nodeData[i].node_time = this.timestampToTime(
            this.nodeData[i].node_time
          );
        }*/
        this.isSave = res.result.isSave;
        if (res.result.version != null) {
          this.thisDayVersion = res.result.version;
          this.thisVersion = res.result.version[0].id;
        } else {
          this.thisDayVersion = [];
          this.thisVersion = "";
        }
      });
    },
    insertGuestStorage(button) {
      insertGuestStorage({
        plan_id: this.$route.query.plan_id,
        project_id: this.$route.query.project_id,
        plan_node_id: this.thisVersion,
        button: button,
        weekNode: this.comeData,
        monthNode: this.nodeData,
        flow_id: this.flow_id
      }).then(res => {
        if (res.code == 200) {
          this.functionDrawer = false;
          this.$message({
            type: "success",
            message: button == "save" ? "保存成功！" : "提交成功！"
          });
        }
      });
    },
    saveData(button) {
      var datatype = this.activeTab;
      if (datatype == 1) {
        //保存当日播报数据
        this.saveMorrowDayInfo(button);
      } else if (datatype == 2) {
        //保存次日播报数据
        this.saveMorrowBroadcast(button);
      } else if (datatype == 3) {
        this.insertGuestStorage(button);
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
    scrollLink(id) {
      document
        .getElementById(id)
        .scrollIntoView({ block: "end", behavior: "smooth" });
    },
    saveMorrowDayInfo(button) {
      insertOpenThisDay({
        plan_node_id: this.thisVersion,
        plan_id: this.$route.query.plan_id,
        project_id: this.$route.query.project_id,
        button: button,
        paramData: this.resultData
      }).then(res => {
        if (res.code == 200) {
          this.functionDrawer = false;
          if (button == "submit") {
            //提交审批并调整预览页面
            get(
              `/Workflow/MTStart2.aspx?BSID=${res.result.BSID}&BTID=${res.result.BTID}&BOID=${res.result.BOID}&UserID=${res.result.UserID}&LoginKey=${res.result.LoginKey}`
            ).then(res => {
              if (res.code == 200 || res.result.code == 200) {
                window.location.href = res.data;
              } else {
                this.$message.error(res.messages || res.result.messages);
              }
            });
            this.$router.push("planWrite");
          } else if (button == "ks") {
            var hht =
              this.local +
              "/#/firstPlanPreview?BOID=" +
              res.result.BOID +
              "&t=1585017217401&isKSAP=1";
            window.open(hht);
            this.$router.push("planWrite");
          } else {
            this.$message({
              type: "success",
              message: button == "save" ? "保存成功！" : "提交成功！"
            });
          }
          this.resultData = [];
          this.getOpenVersionByPlanId();
        }
      });
    },
    getOpenVersionById() {
      getOpenVersionById({
        id: this.thisVersion
      }).then(res => {
        this.resultDataCR = res.result.info || {};
      });
    },
    queryGuestStorageList() {
      queryGuestStorageList({
        id: this.thisVersion
      }).then(res => {
        this.comeData = res.result.weekNode;
      });
    },
    saveMorrowBroadcast(button) {
      insertOpenMorrowBroadcast({
        plan_node_id: this.thisVersion,
        plan_id: this.$route.query.plan_id,
        button: button,
        project_id: this.$route.query.project_id,
        paramData: this.resultDataCR
      }).then(res => {
        if (res.code == 200) {
          this.functionDrawer = false;
          if (button == "submit") {
            //提交审批并调整预览页面
            get(
              `/Workflow/MTStart2.aspx?BSID=${res.result.BSID}&BTID=${res.result.BTID}&BOID=${res.result.BOID}&UserID=${res.result.UserID}&LoginKey=${res.result.LoginKey}`
            ).then(res => {
              if (res.code == 200 || res.result.code == 200) {
                window.location.href = res.data;
              } else {
                this.$message.error(res.messages || res.result.messages);
              }
            });
            this.$router.push("planWrite");
          } else if (button == "ks") {
            var hht =
              this.local +
              "/#/firstPlanPreview?BOID=" +
              res.result.BOID +
              "&t=1585017217401&isKSAP=1";
            window.open(hht);
            this.$router.push("planWrite");
          } else {
            this.$message({
              type: "success",
              message: button == "save" ? "保存成功！" : "提交成功！"
            });
          }
          this.resultDataCR = {};
          this.viewOpenMorrowDayInfo();
        }
      });
    },
    changeValue(value, type) {
      this.$set(this.resultData, type, value);
    },
    countValue(value, type) {
      if (type == "take_value") {
        if (this.resultData["designtwo_selling_value"] != null && value != "") {
          this.resultData["designtwo_selling_takeper"] =
            (this.resultData["designtwo_selling_value"] / value) * 100;
          this.resultData["designtwo_selling_takeper"] = parseFloat(
            this.resultData["designtwo_selling_takeper"]
          ).toFixed(2);
        } else {
          this.resultData["designtwo_selling_takeper"] = 0;
        }
        if (this.resultData["actual_selling_value"] != null && value != "") {
          this.resultData["actual_selling_takeper"] =
            (this.resultData["actual_selling_value"] / value) * 100;
          this.resultData["actual_selling_takeper"] = parseFloat(
            this.resultData["actual_selling_takeper"]
          ).toFixed(0);
        } else {
          this.resultData["actual_selling_takeper"] = 0;
        }
        if (value != "") {
          this.resultData["bias_selling_takeper"] =
            this.resultData["designtwo_selling_takeper"] -
            this.resultData["actual_selling_takeper"];
          this.resultData["bias_selling_takeper"] = parseFloat(
            this.resultData["bias_selling_takeper"]
          ).toFixed(0);
        } else {
          this.resultData["bias_selling_takeper"] = 0;
        }
        if (value != "" && this.resultData["designtwo_selling_takeper"] != 0) {
          this.resultData["biasper_selling_takeper"] =
            (this.resultData["bias_selling_takeper"] /
              this.resultData["designtwo_selling_takeper"]) *
            100;
          this.resultData["biasper_selling_takeper"] = parseFloat(
            this.resultData["biasper_selling_takeper"]
          ).toFixed(0);
        } else {
          this.resultData["biasper_selling_takeper"] = 0;
        }
      }
    },
    reckonValue(value1, value2, bias, biasper) {
      //偏差 bias
      //偏差率 biasper
      this.resultDataCR[bias] = (value1 - value2).toFixed(2);
      this.resultDataCR[biasper] = parseFloat(
        ((value1 - value2) / value1) * 100
      ).toFixed(2);
    },
    timestampToTime(cjsj) {
      if (!cjsj) {
        //时间戳为10位需*1000,时间戳为13位的话不需乘1000
        return "";
      }
      var date = new Date(cjsj);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D;
    },
    reloadData() {
      console.log(this.FomartDate(new Date()));
      let time = this.FomartDate(new Date());
      insertGuestStorageByProject({
        startTime: time,
        projectId: this.$route.query.project_id
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$message(res.data);
          addOrderByProject({
            startTime: time + " 0:00:00",
            projectId: this.$route.query.project_id
          }).then(res => {
            console.log(res);
            if (res.code == 200) {
              this.$message(res.data);
              this.reload();
            }
          });
        }
      });
    },
    setActual_this_client(row, actual_this_client) {
      this.$set(row, "actual_this_client", parseInt(actual_this_client));
      this.$set(
        row,
        "bias_this_client",
        isNaN(row.designtwo_this_client - parseInt(actual_this_client))
          ? 0
          : row.designtwo_this_client - parseInt(actual_this_client)
      );
      this.$set(
        row,
        "biasper_this_client",
        isNaN(
          ((row.designtwo_this_client - parseInt(actual_this_client)) /
            row.designtwo_this_client) *
            100
        )
          ? 0
          : ((row.designtwo_this_client - parseInt(actual_this_client)) /
              row.designtwo_this_client) *
              100
      );
    }
  },
  computed: {
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
    }
  },
  created() {
    if (this.$route.query.disabled) {
      this.apstatus = 4;
    }
    this.reload();
  }
};
</script>

<style lang="less" scoped>
::v-deep .el-date-editor.el-input {
  width: 100% !important;
}
::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
::v-deep input[type="number"] {
  -moz-appearance: textfield;
} /* 隐藏滚动条 */
html::-webkit-scrollbar {
  display: none;
}
.opening {
  // height: 2000px;
  .bold {
    color: #333333;
    font-weight: 700 !important;
    font-family: PingFangSC-Medium, PingFang SC;
  }
  .navbarLink {
    background: #fff;
    margin-top: 5px;
  }
  .headerFixed {
    width: 100%;
    position: fixed;
    height: 100px;
    background: #fff;
    top: 40px;
    z-index: 100;
    .top {
      width: 100%;
      background: #fff;
      color: #333;
      font-size: 14px;
      z-index: 10;
      ::v-deep .el-button {
        height: 30px;
        float: right;
        margin-left: 10px;
        margin-top: 10px;
      }
      ::v-deep .el-form {
        width: 40%;
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
    }
    .isViewFixed {
      position: absolute;
      left: auto;
      z-index: 12;
      width: 100%;
      top: 50px;
    }
    ::v-deep .el-button--text {
      color: #2761ff;
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
    ::v-deep .el-tabs__item {
      font-size: 14px;
    }
    ::v-deep .is-active {
      font-weight: 700;
    }
  }
  .containter {
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
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
    ::v-deep .el-tabs__nav-scroll {
      display: none;
    }
    .firstReport {
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

      .db_cell {
        display: flex;
        width: 100%;
        color: #666;
        //  text-align: left;
        > div {
          flex: 1;
          text-align: left;
        }

        > div:first-child {
          width: 140px;
          flex: 0 1 auto;
          height: 35px;
          border-right: 1px solid #e6e6e6;
          line-height: 35px;
        }

        > div:nth-child(2) {
          position: relative;
          // background: #000;
          // border-right:1px solid #999;
          padding: 0 15px;
          line-height: 35px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .abInput {
            width: calc(100% - 30px);
            position: absolute;
            top: 1px;
            left: 15px;
            z-index: 9;
            input {
              text-overflow: ellipsis;
            }
            /deep/.el-input__icon {
              color: #c0c4cc;
            }
          }
        }
      }
      ::v-deep .el-input__icon {
        color: #bfbfbf;
      }
    }
    .selling {
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

      .sellingTable {
        // background: pink;
        border: 0.5px solid #e6e6e6;
        > div {
          height: 40px;
          display: flex;
          > .t_col {
            flex: 1;
            line-height: 40px;
            text-align: left;
            // text-indent: 10px;
            border-right: 0.5px solid #e6e6e6;
            border-bottom: 0.5px solid #e6e6e6;
            > div {
              border-bottom: 0.5px solid #e6e6e6;
            }
            > div:last-child {
              border-bottom: none;
            }
          }
          .t_col_l {
            width: 500px;
            border-right: 0.5px solid #e6e6e6;
            border-bottom: 0.5px solid #e6e6e6;
            text-align: center !important;
            line-height: 40px;
            height: 40px;
            display: flex;
            > div {
              width: 50%;
              border-right: 0.5px solid #e6e6e6;
            }
            .t_col_cell {
              height: 40px;
              border-bottom: 0.5px solid #e6e6e6;
              line-height: 40px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }

    .secondReport {
      margin-bottom: 15px;
      padding: 0 15px;

      p {
        height: 30px;
        line-height: 30px;
        color: #333;
        font-size: 14px;
      }

      .bold {
        font-weight: 700;
      }
      .secondReportTable {
        border: 0.5px solid #e6e6e6;
        > div {
          height: 40px;
          display: flex;
          box-sizing: border-box;
          > .t_col {
            text-align: left !important;
            text-indent: 5px;
            flex: 1;
            line-height: 40px;
            text-align: center;
            border-right: 0.5px solid #e6e6e6;
            border-bottom: 0.5px solid #e6e6e6;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .el-input {
              text-indent: -5px;
            }
            > div {
              border-bottom: 0.5px solid #e6e6e6;
            }
            > div:last-child {
              border-bottom: none;
            }
          }

          .t_col_l {
            width: 400px;
            border-right: 0.5px solid #e6e6e6;
            border-bottom: 0.5px solid #e6e6e6;
            text-align: center !important;
            line-height: 40px;
            height: 40px;
            display: flex;
            > div {
              width: 50%;
              border-right: 0.5px solid #e6e6e6;
            }
            .t_col_cell {
              text-align: left;
              text-indent: 5px;
              height: 40px;
              border-bottom: 0.5px solid #e6e6e6;
              line-height: 40px;
            }
          }
        }
      }
    }

    .reason {
      margin-bottom: 15px;
      padding: 0 15px;

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

    .come {
      margin-bottom: 15px;
      padding: 0 15px;

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
      padding: 0 15px;

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
    ::v-deep .el-input__icon {
      color: #bfbfbf;
    }
  }

  .null {
    height: 60px;
    // width: 100%;
    // margin: 0 15px;
  }
  .bottom {
    width: 100%;
    text-align: center;
    margin: 0 auto;
    height: 60px;
    line-height: 60px;
    background: #fff;
    margin: 0 15px;
    position: fixed;
    z-index: 10;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    .el-button {
      height: 30px;
    }
  }
  ::v-deep .el-input__inner {
    color: #333333 !important;
    font-size: 14px !important;
  }
  ::v-deep .el-tabs__active-bar {
    display: none;
  }
}
</style>
<style lang="less" scoped>
.customSelect.el-select-dropdown.is-multiple
  .el-select-dropdown__item.selected::after {
  right: 0;
}
.building-dialog {
  .el-dialog {
    width: 40%;
  }
  /deep/.el-dialog__header,
  /deep/.el-dialog__footer {
    padding: 10px 20px;
  }
  /deep/.el-dialog__title {
    font-size: 16px;
    font-weight: 700;
  }
  /deep/.el-dialog__body {
    padding: 0 5px 0 20px;
  }
  .dialog-scrollbar {
    height: 300px;
    /deep/.el-scrollbar__wrap {
      overflow-x: hidden;
      padding-right: 15px;
    }
  }
  .dialog-cont {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
      width: 50%;
      .el-checkbox {
        display: block;
        height: 40px;
        line-height: 40px;
        margin-right: 0;
      }
      .item {
        height: 40px;
        line-height: 40px;
        text-align: right;
      }
      .el-input {
        width: 150px;
      }
    }
  }
  .dialog-footer {
    .el-button {
      height: 32px;
    }
  }
  .rowss {
    margin-left: 5px !important;
    margin-right: -5px !important;
  }

  .navs {
    color: #2761ff;
  }
}
</style>
