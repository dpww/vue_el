<template>
  <div class="sevenDaysOpening" ref="sevenDaysOpening">
    <el-collapse v-model="openList" @change="openChange">
      <el-collapse-item title="基础信息" name="1">
        <template slot="title">
          <h3 class="titleText">基础信息</h3>
        </template>
        <ul class="baseInfo">
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">项目名称 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{getApplayDatas.projectName}}</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请人部门 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{getApplayDatas.postName}}</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请时间 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{getApplayDatas.zddate}}</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请人 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{getApplayDatas.employeeName}}</el-col>
            </el-row>
          </li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="审批信息" name="2">
        <template slot="title">
          <h3 class="titleText">审批信息</h3>
        </template>
        <div class="sevenDays">
          <div class="containter">
            <div class="firstOpen" id="firstOpen">
              <p class="bold">首开指标</p>
              <!-- firstOpenVlaue -->
              <div class="table">
                <el-row>
                  <el-col :span="4">
                    <div></div>
                  </el-col>
                  <el-col :span="2">
                    <div>投资版</div>
                  </el-col>
                  <el-col :span="2">
                    <div>战规版</div>
                  </el-col>
                  <el-col :span="2">
                    <div>顶设2版</div>
                  </el-col>
                  <el-col :span="2">
                    <div>开盘预估</div>
                  </el-col>
                  <el-col :span="4">
                    <div>偏差（VS顶设2)</div>
                  </el-col>
                  <el-col :span="4">
                    <div>偏差率（VS顶设2)</div>
                  </el-col>
                  <el-col :span="4">
                    <div>偏差原因</div>
                  </el-col>
                </el-row>
                <!-- 首开节点 -->
                <el-row>
                  <el-col :span="4">
                    <div>首开节点</div>
                  </el-col>
                  <el-col :span="2">
                    <div>{{openApplayMainData.invest_open_node}}</div>
                  </el-col>
                  <el-col :span="2">
                    <div>{{openApplayMainData.rules_open_node}}</div>
                  </el-col>
                  <el-col :span="2">
                    <div>{{openApplayMainData.designtwo_open_node}}</div>
                  </el-col>
                  <el-col :span="2">
                    <div>
                      <!-- <el-date-picker
                        v-if="applay_status!=4&&applay_status!=3"
                        v-model="openApplayMainData.estimate_open_node"
                        format="yyyy-MM-dd"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        :clearable="false"
                      ></el-date-picker> -->
                      <span >{{openApplayMainData.estimate_open_node}}</span>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div>{{openApplayMainData.deviation_open_node}}</div>
                  </el-col>
                  <el-col :span="4">
                    <div>{{openApplayMainData.deviationper_open_node}}</div>
                  </el-col>
                  <el-col :span="4">
                    <div>
                      <span
                        v-if="applay_status!=4&&applay_status!=3"
                        v-text="openApplayMainData.cause_open_node"
                      ></span>
                      <span v-else>{{openApplayMainData.cause_open_node}}</span>
                    </div>
                  </el-col>
                </el-row>
                <!-- 产品类型 -->
                <el-row>
                  <el-col :span="4">
                    <div>产品类型</div>
                  </el-col>
                  <el-col :span="2">
                    <el-tooltip
                      :content="openApplayMainData.invest_product_type"
                      :disabled="!openApplayMainData.invest_product_type"
                      placement="bottom"
                      effect="light"
                    >
                      <div>{{openApplayMainData.invest_product_type}}</div>
                    </el-tooltip>
                    <!-- <div
                    :title="openApplayMainData.invest_product_type"
                    >{{openApplayMainData.invest_product_type}}</div>-->
                  </el-col>
                  <el-col :span="2">
                    <el-tooltip
                      :content="openApplayMainData.rules_product_type"
                      :disabled="!openApplayMainData.rules_product_type"
                      placement="bottom"
                      effect="light"
                    >
                      <div>{{openApplayMainData.rules_product_type}}</div>
                    </el-tooltip>
                  </el-col>
                  <el-col :span="2">
                    <el-tooltip
                      :content="openApplayMainData.designtwo_product_type"
                      :disabled="!openApplayMainData.designtwo_product_type"
                      placement="bottom"
                      effect="light"
                    >
                      <div>{{openApplayMainData.designtwo_product_type}}</div>
                    </el-tooltip>
                  </el-col>
                  <el-col :span="2">
                    <el-tooltip
                      :content="openApplayMainData.estimate_product_type"
                      :disabled="!openApplayMainData.estimate_product_type"
                      placement="bottom"
                      effect="light"
                    >
                      <div>{{openApplayMainData.estimate_product_type}}</div>
                    </el-tooltip>
                  </el-col>
                  <el-col :span="4">
                    <div>{{openApplayMainData.deviation_product_type}}</div>
                  </el-col>
                  <el-col :span="4">
                    <div>{{openApplayMainData.deviation_product_type}}</div>
                  </el-col>
                  <el-col :span="4">
                    <div>
                      <span
                        v-if="applay_status!=4&&applay_status!=3"
                        v-text="openApplayMainData.cause_product_type"
                      ></span>
                      <span v-else>{{openApplayMainData.cause_product_type}}</span>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4">
                    <div>首开取证货值（万元）</div>
                  </el-col>
                  <el-col :span="2">
                    <div>{{openApplayMainData.invest_take_card_value}}</div>
                  </el-col>
                  <el-col :span="2">
                    <div>{{openApplayMainData.rules_take_card_value}}</div>
                  </el-col>
                  <el-col :span="2">
                    <div>{{openApplayMainData.designtwo_take_card_value}}</div>
                  </el-col>
                  <el-col :span="2">
                    <div>
                      <span
                        v-if="applay_status!=4&&applay_status!=3"
                        v-text="openApplayMainData.estimate_take_card_value"
                      ></span>
                      <span v-else>{{openApplayMainData.estimate_take_card_value}}</span>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div>
                      {{isNaN(openApplayMainData.deviation_take_card_value)?0:openApplayMainData.deviation_take_card_value
                      | fixed}}
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div>
                      {{isNaN(openApplayMainData.deviationper_take_card_value)?0:openApplayMainData.deviationper_take_card_value
                      | twofix}}%
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div>
                      <span
                        v-if="applay_status!=4&&applay_status!=3"
                        v-text="openApplayMainData.cause_take_card_value"
                      ></span>
                      <span v-else>{{openApplayMainData.cause_take_card_value}}</span>
                    </div>
                  </el-col>
                </el-row>
                <!-- 首开推售货值（万元） -->
                <el-row>
                  <el-col :span="4">
                    <div>首开推售货值（万元）</div>
                  </el-col>
                  <el-col :span="2">
                    <div>{{openApplayMainData.invest_push_value}}</div>
                  </el-col>
                  <el-col :span="2">
                    <div>{{openApplayMainData.rules_push_value}}</div>
                  </el-col>
                  <el-col :span="2">
                    <div>{{openApplayMainData.designtwo_push_value}}</div>
                  </el-col>
                  <el-col :span="2">
                    <div>
                      <span
                        v-if="applay_status!=4&&applay_status!=3"
                        v-text="openApplayMainData.estimate_push_value"
                      ></span>
                      <span v-else>{{openApplayMainData.estimate_push_value}}</span>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div>
                      {{isNaN(openApplayMainData.deviation_push_value)?0:openApplayMainData.deviation_push_value |
                      fixed}}
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div>
                      {{isNaN(openApplayMainData.deviationper_push_value)?0:openApplayMainData.deviationper_push_value
                      | twofix}}%
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div>
                      <span
                        v-if="applay_status!=4&&applay_status!=3"
                        v-text="openApplayMainData.cause_push_value"
                      ></span>
                      <span v-else>{{openApplayMainData.cause_push_value}}</span>
                    </div>
                  </el-col>
                </el-row>
                <!-- 首开去化货值（万元） -->
                <el-row>
                  <el-col :span="4">
                    <div>首开去化货值（万元）</div>
                  </el-col>
                  <el-col :span="2">
                    <div>{{openApplayMainData.invest_selling_value}}</div>
                  </el-col>
                  <el-col :span="2">
                    <div>{{openApplayMainData.rules_selling_value}}</div>
                  </el-col>
                  <el-col :span="2">
                    <div>{{openApplayMainData.designtwo_selling_value}}</div>
                  </el-col>
                  <el-col :span="2">
                    <div>
                      <span
                        v-if="applay_status!=4&&applay_status!=3"
                        v-text="openApplayMainData.estimate_selling_value"
                      ></span>
                      <span v-else>{{openApplayMainData.estimate_selling_value}}</span>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div>
                      {{isNaN(openApplayMainData.deviation_selling_value)?0:openApplayMainData.deviation_selling_value
                      | fixed}}
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div>
                      {{isNaN(openApplayMainData.deviationper_selling_value)?0:openApplayMainData.deviationper_selling_value
                      | twofix}}%
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div>
                      <span
                        v-if="applay_status!=4&&applay_status!=3"
                        v-text="openApplayMainData.cause_selling_value"
                      ></span>
                      <span v-else>{{openApplayMainData.cause_selling_value}}</span>
                    </div>
                  </el-col>
                </el-row>
                <!-- 首开均价 -->
                <el-row
                  v-if="priceList.length>0"
                  :style="{'line-height':priceList.length*40+'px','height':priceList.length*40+'px'}"
                >
                  <el-col
                    :span="4"
                    :style="{'line-height':priceList.length*40+'px','height':priceList.length*40+'px'}"
                    class="averagePricehead"
                  >
                    <div>
                      <el-row>
                        <el-col
                          :span="9"
                          :style="{'line-height':priceList.length*40+'px','height':priceList.length*40+'px'}"
                        >首开均价</el-col>
                        <el-col :span="15" :style="{'height':priceList.length*40+'px'}">
                          <div
                            :key="index"
                            :title="item.product_type"
                            v-for="(item,index) in priceList"
                          >{{item.product_type}}</div>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                  <el-col
                    :span="2"
                    class="averagePrice"
                    :style="{'height':priceList.length*40+'px'}"
                  >
                    <div
                      :key="index"
                      v-for="(item,index) in priceList"
                    >{{isNaN(item.invest_avg)?0:item.invest_avg | fixed}}</div>
                  </el-col>
                  <el-col
                    :span="2"
                    class="averagePrice"
                    :style="{'height':priceList.length*40+'px'}"
                  >
                    <div
                      :key="index"
                      v-for="(item,index) in priceList"
                    >{{isNaN(item.rules_avg)?0:item.rules_avg | fixed}}</div>
                  </el-col>
                  <el-col
                    :span="2"
                    class="averagePrice"
                    :style="{'height':priceList.length*40+'px'}"
                  >
                    <div
                      :key="index"
                      v-for="(item,index) in priceList"
                    >{{isNaN(item.designtwo_avg)?0:item.designtwo_avg | fixed}}</div>
                  </el-col>
                  <el-col
                    :span="2"
                    class="averagePrice"
                    :style="{'height':priceList.length*40+'px'}"
                  >
                    <div :key="index" v-for="(item,index) in priceList">
                      <span v-if="applay_status!=4&&applay_status!=3"> {{item.open_estimate | fixed}}</span>
                      <span v-else>{{item.open_estimate | fixed}}</span>
                    </div>
                  </el-col>
                  <el-col
                    :span="4"
                    class="averagePrice"
                    :style="{'height':priceList.length*40+'px'}"
                  >
                    <div
                      :key="index"
                      v-for="(item,index) in priceList"
                    >{{isNaN(item.bias_price)?0:item.bias_price | fixed}}</div>
                  </el-col>
                  <el-col
                    :span="4"
                    class="averagePrice"
                    :style="{'height':priceList.length*40+'px'}"
                  >
                    <div
                      :key="index"
                      v-for="(item,index) in priceList"
                    >{{isNaN(item.bias_per)?0:item.bias_per | fixed}}%</div>
                  </el-col>
                  <el-col
                    :span="4"
                    class="averagePrice"
                    :style="{'height':priceList.length*40+'px'}"
                  >
                    <div>
                      <div class="averagePrice_item" :key="index" v-for="(item,index) in priceList">
                        <span v-if="applay_status!=4&&applay_status!=3" v-text="item.bias_cause"></span>
                        <span v-else>{{item.bias_cause}}</span>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <!-- 不同业态价差 -->
                <el-row>
                  <el-col
                    :span="4"
                    :style="{'line-height':firstOpenVlaue.list2.length*40+'px'}"
                    class="diffPricehead"
                  >
                    <div>{{firstOpenVlaue.list2[0].type}}</div>
                  </el-col>
                  <el-col :span="2" class="diffPrice">
                    <el-tooltip
                      :content="openApplayMainData.invest_operation_name"
                      :disabled="!openApplayMainData.invest_operation_name"
                      placement="bottom"
                      effect="light"
                    >
                      <div>{{openApplayMainData.invest_operation_name}}</div>
                    </el-tooltip>
                    <!-- <div
                    :title="openApplayMainData.invest_operation_name"
                    >{{openApplayMainData.invest_operation_name}}</div>-->
                    <div>{{openApplayMainData.invest_operation_bfb}}</div>
                  </el-col>
                  <el-col :span="2" class="diffPrice">
                    <el-tooltip
                      :content="openApplayMainData.rules_operation_name"
                      :disabled="!openApplayMainData.rules_operation_name"
                      placement="bottom"
                      effect="light"
                    >
                      <div>{{openApplayMainData.rules_operation_name}}</div>
                    </el-tooltip>
                    <div>{{openApplayMainData.rules_operation_bfb}}</div>
                  </el-col>
                  <el-col :span="2" class="diffPrice">
                    <el-tooltip
                      :content="openApplayMainData.designtwo_operation_name"
                      :disabled="!openApplayMainData.designtwo_operation_name"
                      placement="bottom"
                      effect="light"
                    >
                      <div>{{openApplayMainData.designtwo_operation_name}}</div>
                    </el-tooltip>
                    <div>{{openApplayMainData.designtwo_operation_bfb}}</div>
                  </el-col>
                  <el-col :span="2" class="diffPrice">
                    <el-tooltip
                      :content="openApplayMainData.estimate_operation_name"
                      :disabled="!openApplayMainData.estimate_operation_name"
                      placement="bottom"
                      effect="light"
                    >
                      <div>{{openApplayMainData.estimate_operation_name}}</div>
                    </el-tooltip>
                    <div>
                      <span
                        readonly
                        v-if="applay_status!=4&&applay_status!=3"
                        v-text="openApplayMainData.estimate_operation_bfb"
                      ></span>
                      <span v-else>{{openApplayMainData.estimate_operation_bfb}}</span>
                    </div>
                  </el-col>
                  <el-col :span="4" class="diffPrice">
                    <div style="height:40px"></div>
                    <div style="height:40px"></div>
                  </el-col>
                  <el-col :span="4" class="diffPrice">
                    <div style="height:40px"></div>
                    <div style="height:40px"></div>
                  </el-col>
                  <el-col :span="4" class="diffPrice">
                    <div style="height:40px"></div>
                    <div style="height:40px"></div>
                  </el-col>
                </el-row>
                <!-- 取证去化率 -->
                <el-row>
                  <el-col :span="4">
                    <div>取证去化率</div>
                  </el-col>
                  <el-col :span="2">
                    <div>{{openApplayMainData.invest_take_card_per}}</div>
                  </el-col>
                  <el-col :span="2">
                    <div>{{openApplayMainData.rules_take_card_per}}</div>
                  </el-col>
                  <el-col :span="2">
                    <div>{{openApplayMainData.designtwo_take_card_per}}</div>
                  </el-col>
                  <el-col :span="2">
                    <div>
                      <span
                        v-if="applay_status!=4&&applay_status!=3"
                        v-text="openApplayMainData.estimate_take_card_per"
                      ></span>
                      <span v-else>{{openApplayMainData.estimate_take_card_per}}</span>
                      <!--estimate_take_card_per-->
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div></div>
                  </el-col>
                  <el-col :span="4">
                    <div></div>
                  </el-col>
                  <el-col :span="4">
                    <div>
                      <div>
                        <span
                          v-if="applay_status!=4&&applay_status!=3"
                          v-text="openApplayMainData.cause_operation_price"
                        ></span>
                        <span v-else>{{openApplayMainData.cause_operation_price}}</span>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <!-- 当期利润率 -->
                <el-row>
                  <el-col :span="4">
                    <div>当期利润率</div>
                  </el-col>
                  <el-col :span="2">
                    <div>{{openApplayMainData.invest_this_per}}</div>
                  </el-col>
                  <el-col :span="2">
                    <div>{{openApplayMainData.rules_this_per}}</div>
                  </el-col>
                  <el-col :span="2">
                    <div>{{openApplayMainData.designtwo_this_per}}</div>
                  </el-col>
                  <el-col :span="2">
                    <div>
                      <span
                        v-if="applay_status!=4&&applay_status!=3"
                        v-text="openApplayMainData.estimate_this_per"
                      ></span>
                      <span v-else>{{openApplayMainData.estimate_this_per}}</span>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div>
                      {{isNaN(openApplayMainData.deviation_this_per)?0:openApplayMainData.deviation_this_per |
                      fixed}}
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div>
                      {{isNaN(openApplayMainData.deviationper_this_per)?0:openApplayMainData.deviationper_this_per |
                      twofix}}%
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div>
                      <span
                        v-if="applay_status!=4&&applay_status!=3"
                        v-text="openApplayMainData.cause_this_per"
                      ></span>
                      <span v-else>{{openApplayMainData.cause_this_per}}</span>
                    </div>
                  </el-col>
                </el-row>
                <!-- 整盘利润率 -->
                <el-row>
                  <el-col :span="4">
                    <div>整盘利润率</div>
                  </el-col>
                  <el-col :span="2">
                    <div>{{openApplayMainData.invest_all_per}}</div>
                  </el-col>
                  <el-col :span="2">
                    <div>{{openApplayMainData.rules_all_per}}</div>
                  </el-col>
                  <el-col :span="2">
                    <div>{{openApplayMainData.designtwo_all_per}}</div>
                  </el-col>
                  <el-col :span="2">
                    <div>
                      <span
                        v-if="applay_status!=4&&applay_status!=3"
                        v-text="openApplayMainData.estimate_all_per"
                      ></span>
                      <span v-else>{{openApplayMainData.estimate_all_per}}</span>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div>{{isNaN(openApplayMainData.deviation_all_per)?0:openApplayMainData.deviation_all_per | fixed}}</div>
                  </el-col>
                  <el-col :span="4">
                    <div>
                      {{isNaN(openApplayMainData.deviationper_all_per)?0:openApplayMainData.deviationper_all_per |
                      twofix}}%
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div>
                      <span
                        v-if="applay_status!=4&&applay_status!=3"
                        v-text="openApplayMainData.cause_all_per"
                      ></span>
                      <span v-else>{{openApplayMainData.cause_all_per}}</span>
                    </div>
                  </el-col>
                </el-row>
                <!-- 非融IRR  -->
                <el-row>
                  <el-col :span="4">
                    <div>非融IRR</div>
                  </el-col>
                  <el-col :span="2">
                    <div>{{openApplayMainData.invest_irr}}</div>
                  </el-col>
                  <el-col :span="2">
                    <div>{{openApplayMainData.rules_irr}}</div>
                  </el-col>
                  <el-col :span="2">
                    <div>{{openApplayMainData.designtwo_irr}}</div>
                  </el-col>
                  <el-col :span="2">
                    <div>
                      <span
                        v-if="applay_status!=4&&applay_status!=3"
                        v-text="openApplayMainData.estimate_irr"
                      ></span>
                      <span v-else>{{openApplayMainData.estimate_irr}}</span>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div>{{isNaN(openApplayMainData.deviation_irr)?0:openApplayMainData.deviation_irr | fixed}}</div>
                  </el-col>
                  <el-col :span="4">
                    <div>{{isNaN(openApplayMainData.deviationper_irr)?0:openApplayMainData.deviationper_irr | twofix}}%</div>
                  </el-col>
                  <el-col :span="4">
                    <div>
                      <span
                        v-if="applay_status!=4&&applay_status!=3"
                        v-text="openApplayMainData.cause_irr"
                      ></span>
                      <span v-else>{{openApplayMainData.cause_irr}}</span>
                    </div>
                  </el-col>
                </el-row>
                <!-- 静态投资回收期（月） -->
                <el-row>
                  <el-col :span="4">
                    <div>静态投资回收期（月）</div>
                  </el-col>
                  <el-col :span="2">
                    <div>{{openApplayMainData.invest_payback}}</div>
                  </el-col>
                  <el-col :span="2">
                    <div>{{openApplayMainData.rules_payback}}</div>
                  </el-col>
                  <el-col :span="2">
                    <div>{{openApplayMainData.designtwo_payback}}</div>
                  </el-col>
                  <el-col :span="2">
                    <div>
                      <span
                        v-if="applay_status!=4&&applay_status!=3"
                        v-text="openApplayMainData.estimate_payback"
                      ></span>
                      <span v-else>{{openApplayMainData.estimate_payback}}</span>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div>{{isNaN(openApplayMainData.deviation_payback)?0:openApplayMainData.deviation_payback}}</div>
                  </el-col>
                  <el-col :span="4">
                    <div>
                      {{isNaN(openApplayMainData.deviationper_payback)?0:openApplayMainData.deviationper_payback}}%
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div>
                      <span
                        v-if="applay_status!=4&&applay_status!=3"
                        v-text="openApplayMainData.cause_payback"
                      ></span>
                      <span v-else>{{openApplayMainData.cause_payback}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="goodsInfo" id="goodsInfo">
              <p class="bold">竞品情况</p>
              <div class="table">
                <el-table
                  :data="competingpPoducts"
                  :header-cell-style="{background:'#F5F7FA',color:'#999'}"
                  border
                  style="width: 100%"
                >
                  <el-table-column label="竞品项目" align="center" prop="product_project" width="180"></el-table-column>
                  <el-table-column label="首开时间" align="center" prop="first_opentime" width="180"></el-table-column>
                  <el-table-column label="首开去化金额" align="center" prop="take_money"></el-table-column>
                  <el-table-column label="当前月均流量" align="center" prop="month_avg_flow"></el-table-column>
                  <el-table-column label="在售均价业态" align="center" prop="avg_price_product"></el-table-column>

                </el-table>
              </div>
            </div>
            <div class="list" id="list">
              <p class="bold">客户情况</p>
              <div class="operation">
                <el-table
                  :span-method="spanCurrage"
                  :data="clientInfoList"
                  :header-cell-style="{background:'#F5F7FA',color:'#999'}"
                  border
                  style="width: 100%"
                >
                  <el-table-column label="客储类别" prop="type" width="180"></el-table-column>
                  <el-table-column label="客储目标（组）" prop="num">
                    <template slot-scope="scope">
                      <span>{{openApplayMainData[scope.row.val1]}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="实际达成（组）" prop="num">
                    <template slot-scope="scope">
                      <span>{{openApplayMainData[scope.row.val2]}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="达成率(%)" prop="num">
                    <template slot-scope="scope">
                      <span>{{openApplayMainData[scope.row.val1]==0?"0":openApplayMainData[scope.row.val3]  | twofix }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="偏差原因分析" prop="num">
                    <template slot-scope="scope">
                      <div class="text_area" v-if="applay_status!=4&&applay_status!=3">
                        <el-input
                          v-if="scope.$index==0"
                          type="textarea"
                          v-model="openApplayMainData.customer_cause"
                          placeholder="请输入偏差原因..."
                          :readonly="true"
                        ></el-input>
                      </div>
                      <span v-else>{{openApplayMainData.customer_cause}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="openDay" id="openDay">
              <p class="bold">开盘当天预估</p>
              <div class="table">
                <el-row>
                  <el-col :span="4">
                    <div class="grid-content">{{openDayObj.type1}}</div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content">
                      <span
                        v-if="applay_status!=4&&applay_status!=3"
                        v-text="openApplayMainData.this_customer_visit"
                      ></span>
                      <span v-else>{{openApplayMainData.this_customer_visit}}</span>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="grid-content">{{openDayObj.type2}}</div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content">
                      <span
                        v-if="applay_status!=4&&applay_status!=3"
                        v-text="openApplayMainData.this_customer_conversionper"
                      ></span>
                      <span v-else>{{openApplayMainData.this_customer_conversionper | twofix }}</span>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4">
                    <div class="grid-content">{{openDayObj.type3}}</div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content">
                      <span
                        v-if="applay_status!=4&&applay_status!=3"
                        v-text="openApplayMainData.sub_customer_actual"
                      ></span>
                      <span v-else>{{openApplayMainData.sub_customer_actual}}</span>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="grid-content">{{openDayObj.type4}}</div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content">
                      <span>{{openApplayMainData.sub_customer_per | twofix }}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="prognosis" id="prognosis">
              <p class="bold">事业部营销负责人开盘预判</p>
              <div class="table">
                <el-input
                :readonly="true"
                maxlength="500"
                v-model="openApplayMainData.trader_open_prediction"
                show-word-limit
                type="textarea"
              ></el-input>
              </div>
            </div>
            <div class="node" id="node">
              <p class="bold">节点客储计划</p>
              <el-table
                :data="customerStorageNode"
                :header-cell-style="{background:'#F5F7FA',color:'#999'}"
                :span-method="mergeCol"
                border
                style="width: 100%"
              >
                <el-table-column align="center" label="节点" prop="node_name" width="160"></el-table-column>
                <el-table-column align="center" label="日期" prop="node_time" width="160"></el-table-column>
                <el-table-column align="center" label prop="line_name"></el-table-column>
                <el-table-column align="center" label="报备(组)" prop="report_num"></el-table-column>
                <el-table-column align="center" label="来访(组)" prop="visit_num"></el-table-column>
                <el-table-column align="center" label="小卡(组)" prop="little_num"></el-table-column>
                <el-table-column align="center" label="小卡率(%)" prop="little_per"></el-table-column>
                <el-table-column align="center" label="大卡(组)" prop="big_num"></el-table-column>
                <el-table-column align="center" label="大卡率(%)" prop="big_per"></el-table-column>
                <el-table-column align="center" label="认购(套)" prop="sub_num"></el-table-column>
                <el-table-column align="center" label="成交率(%)" prop="make_per"></el-table-column>
              </el-table>
            </div>
            <div class="come" id="come">
              <p class="bold">来访周拆分</p>
              <el-table
                :data="come_Data"
                :header-cell-style="{background:'#F5F7FA',color:'#999'}"
                :span-method="mergeSpan"
                border
                style="width: 100%"
              >
                <el-table-column align="center" label="周期" prop="week" width="160"></el-table-column>
                <el-table-column align="center" label="日期" prop="day_date" width="190"></el-table-column>
                <el-table-column align="center" label="计划新增(组)" prop="plan_add">
                  <template slot-scope="scope">
                    <span v-if="scope.row.week=='完整波段'">{{allSum}}</span>
                    <span v-else>{{scope.row.plan_add}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="计划累计(组)" prop="plan_total"></el-table-column>
                <el-table-column align="center" label="计划阶段任务占比(%)" prop="plan_task_per">
                  <template slot-scope="scope">
                    <span>{{scope.row.plan_task_per}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="实际新增(组)" prop="actual_add">
                  <template slot-scope="scope">
                    <span v-if="scope.row.week=='完整波段'">{{allRate}}</span>
                    <span v-else>{{scope.row.actual_add}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="实际累计(组)" prop="actual_total">
                  <template slot-scope="scope">
                    <span v-if="scope.row.week=='完整波段'" v-text="scope.row.actual_total"></span>
                    <span v-else>{{scope.row.actual_total}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="实际阶段任务占比(%)" prop="actual_task_per"></el-table-column>
                <el-table-column align="center" label="绝对偏差值" prop="bias_value">
                  <template slot-scope="scope">
                    <span>{{scope.row.bias_value}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="偏差率" prop="bias_per">
                  <template slot-scope="scope">
                    <span>{{scope.row.bias_per}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="偏差原因" prop="bias_cause" width="200">
                  <template slot-scope="scope">
                    <span
                      v-if="scope.row.is_edit==1&&applay_status!=3&&applay_status!=4&&scope.row.week!=='完整波段'"
                      v-text="scope.row.bias_cause"
                    ></span>
                    <span v-else>{{scope.row.bias_cause}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="node" id="node_" v-show="isCheck">
              <p class="bold">变更节点客储计划</p>
              <el-table
                :data="nodePlan"
                :header-cell-style="{background:'#F5F7FA',color:'#999'}"
                border
                style="width: 100%"
              >
                <el-table-column align="center" label="节点" prop="nide_name" width="160"></el-table-column>
                <el-table-column align="center" label="日期" prop="node_time" width="160"></el-table-column>
                <el-table-column align="center" label prop="line_name"></el-table-column>
                <el-table-column align="center" label="报备(组)" prop="report_num">
                  <template slot-scope="scope">
                    <span v-if="node_level<scope.row.node_level" v-text="scope.row.report_num"></span>
                    <span v-else>{{scope.row.report_num}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="来访(组)" prop="visit_num">
                  <template slot-scope="scope">
                    <span v-if="node_level<scope.row.node_level" v-text="scope.row.visit_num"></span>
                    <span v-else>{{scope.row.visit_num}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="小卡(组)" prop="little_num">
                  <template slot-scope="scope">
                    <span v-if="node_level<scope.row.node_level" v-text="scope.row.little_num"></span>
                    <span v-else>{{scope.row.little_num}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="小卡率(%)" prop="little_per">
                  <template
                    slot-scope="scope"
                  >{{isNaN(scope.row.little_per)?0:scope.row.little_per}}</template>
                </el-table-column>
                <el-table-column align="center" label="大卡(组)" prop="big_num">
                  <template slot-scope="scope">
                    <span v-if="node_level<scope.row.node_level" v-text="scope.row.big_num"></span>
                    <span v-else>{{scope.row.big_num}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="大卡率(%)" prop="big_per">
                  <template slot-scope="scope">{{isNaN(scope.row.big_per)?0:scope.row.big_per}}</template>
                </el-table-column>
                <el-table-column align="center" label="认购(套)" prop="sub_num">
                  <template slot-scope="scope">
                    <span v-if="node_level<scope.row.node_level" v-text="scope.row.sub_num"></span>
                    <span v-else>{{scope.row.sub_num}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="成交率(%)" prop="make_per">
                  <template slot-scope="scope">{{isNaN(scope.row.make_per)?0:scope.row.make_per}}</template>
                </el-table-column>
              </el-table>
            </div>
            <div class="card" id="card" v-show="isCheck">
              <p class="bold">办卡方式</p>
              <el-form :model="cardForm" class="cardForm" label-width="60px" ref="cardForm">
                <el-form-item label="小卡" prop="small">
                  <el-input
                    maxlength="100"
                    show-word-limit
                    type="textarea"
                    v-model="cardForm.little_way"
                    :readonly="true"
                  ></el-input>
                </el-form-item>
                <el-form-item label="大卡" prop="big">
                  <el-input
                    maxlength="100"
                    show-word-limit
                    type="textarea"
                    v-model="cardForm.big_way"
                    :readonly="true"
                  ></el-input>
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
            <div style="text-align: center;">
              <el-button @click="update()" v-if="this.$route.query.isKSAP" type="primary">快速审批</el-button>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <Buttons/>
  </div>
</template>

<script>
let width = document.body.offsetWidth;
import $ from "jquery";
import {
  updateNodePlan,
  viewdelayOpenApplay,
  switchVersion,
  savelayOpenApplay,
  updatePlanTime,
  viewOpenBeforeSevenDayOpenApplay,
  getWeeklyResolution,
  saveOpenBeforeSevenDayOpenApplay,
  switchVersionSevenDayOpenApplay,
  applyAdoptTell
} from "@/api/firstPlan";
export default {
  components:{
    Buttons:()=>import('../../views/offerFlow/component/index')
  },
  mounted() {
    let timeid = setTimeout(() => {
      if (window.cifioa) {
        console.log(this.$refs.sevenDaysOpening.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.sevenDaysOpening.offsetHeight
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
        console.log(this.$refs.sevenDaysOpening.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.sevenDaysOpening.offsetHeight
        });
      } else {
        console.warn("缺少cifioa插件");
      }
      clearTimeout(timeid);
    }, 700);
  },
  data() {
    let isMobile = width <= 1024;
    return {
      isMobile: width <= 1024,
      thataccessoryData: [],
      isShowKS:
        localStorage.getItem("employeeName")
      =='管理员',
      accessoryData: [
        {
          type: "",
          handle: "其他上传"
        }
      ],
      getApplayDatas: {},
      openList: ["1", "2"],
      isType: "",
      formLabelWidth: "120px",
      dialogFormVisible: false,
      activeTab: "1",
      isCheck: false,
      newVersionFlag: false,
      cardForm: {
        big_way: "",
        little_way: ""
      },
      priceList: [{}],
      applay_status: "0",
      firstOpenAvgData: [],
      thatdelFielList: [],
      openApplayMainData: {
        id: "",
        plan_id: "",
        plan_node_id: "",
        product_type_code: "",
        invest_open_node: "",
        invest_product_type: "",
        invest_take_card_value: "",
        invest_push_value: "",
        invest_selling_value: "",
        invest_avg_price: "",
        invest_operation_price: "",
        invest_take_card_per: "",
        invest_this_per: "",
        invest_all_per: "",
        invest_irr: "",
        invest_payback: "",
        rules_open_node: "",
        rules_product_type: "",
        rules_take_card_value: "",
        rules_push_value: "",
        rules_selling_value: "",
        rules_avg_price: "",
        rules_operation_price: "",
        rules_take_card_per: "",
        rules_this_per: "",
        rules_all_per: "",
        rules_irr: "",
        rules_payback: "",
        designtwo_open_node: "",
        designtwo_product_type: "",
        designtwo_take_card_value: "",
        designtwo_push_value: "",
        designtwo_selling_value: "",
        designtwo_avg_price: "",
        designtwo_operation_price: "",
        designtwo_take_card_per: "",
        designtwo_this_per: "",
        designtwo_all_per: "",
        designtwo_irr: "",
        designtwo_payback: "",
        estimate_open_node: "",
        estimate_product_type: "",
        estimate_take_card_value: "",
        estimate_push_value: "",
        estimate_selling_value: "",
        estimate_avg_price: "",
        estimate_operation_price: "",
        estimate_take_card_per: "",
        estimate_this_per: "",
        estimate_all_per: "",
        estimate_irr: "",
        estimate_payback: "",
        deviation_open_node: "",
        deviation_product_type: "",
        deviationper_take_card_value: "",
        deviation_push_value: "",
        deviation_selling_value: "",
        deviation_avg_price: "",
        deviation_operation_price: "",
        deviation_take_card_per: "",
        deviation_this_per: "",
        deviation_all_per: "",
        deviation_irr: "",
        deviation_payback: "",
        deviationper_open_node: "",
        deviationper_product_type: "",
        deviationper_take_card_value: "",
        deviationper_push_value: "",
        deviationper_selling_value: "",
        deviationper_avg_price: "",
        deviationper_operation_price: "",
        deviationper_take_card_per: "",
        deviationper_this_per: "",
        deviationper_all_per: "",
        deviationper_irr: "",
        deviationper_payback: "",
        cause_open_node: "",
        cause_product_type: "",
        cause_take_card_value: "",
        cause_push_value: "",
        cause_selling_value: "",
        cause_avg_price: "",
        cause_operation_price: "",
        cause_take_card_per: "",
        cause_this_per: "",
        cause_all_per: "",
        cause_irr: "",
        cause_payback: "",
        competing_relation: "",
        competing_product: "",
        plate_dynamic: "",
        competing_condition: "",
        repot_customer_target: "",
        repot_customer_actual: "",
        repot_customer_per: "",
        come_way: "",
        come_customer_target: "",
        come_customer_actual: "",
        come_customer_per: "",
        lesser_way: "",
        lesser_customer_target: "",
        lesser_customer_actual: "",
        lesser_customer_per: "",
        big_way: "",
        big_customer_target: "",
        big_customer_actual: "",
        big_customer_per: "",
        sub_customer_target: "",
        sub_customer_actual: "",
        sub_customer_per: "",
        this_customer_visit: "",
        this_customer_conversionper: "",
        customer_cause: "",
        trader_open_prediction: "",
        version: "",
        create_time: ""
      },
      fromData: {
        product_project: "",
        first_opentime: "",
        take_money: "",
        month_avg_flow: "",
        avg_price_product: ""
      },
      competingpPoducts: [
        {
          product_project: "",
          first_opentime: "",
          take_money: "",
          month_avg_flow: "",
          avg_price_product: ""
        }
      ],
      allSum: 0,
      allSum_2: 0,
      fileList__: [],
      fileList: [],
      isShowVersion: false,
      form: {},
      node_level: this.$route.query.node_level,
      comeData: [],
      customerStorageNode: [],
      NodePlanWrite: [],
      listData: [{ type: "开盘前三个月清项清单" }],
      come_Data: [],
      versionsList: [],
      versionData: [],
      thisVserion: this.$route.query.thisVersion,
      customerNodeStorage: [],
      approval_stuat: "",
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
        sum_take_per: ""
      },
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
      ],

      clientInfoList: [
        {
          type: "来访",
          val1: "come_customer_target",
          val2: "come_customer_actual",
          val3: "come_customer_per"
        },
        {
          type: "小卡",
          val1: "lesser_customer_target",
          val2: "lesser_customer_actual",
          val3: "lesser_customer_per"
        },
        {
          type: "大卡",
          val1: "big_customer_target",
          val2: "big_customer_actual",
          val3: "big_customer_per"
        }
      ],
      openDayObj: {
        type1: "当天到访量（组）",
        type2: "当天转化率（%）",
        type3: "认购套数",
        type4: "成交率（%）",
        num: "123"
      },
      firstOpenVlaue: {
        num: "123",
        type1: "首开节点",
        type2: "产品类型",
        type3: "首开取证货值（万元）",
        type4: "首开推售货值（万元）",
        type5: "首开去化货值（万元",
        type6: "不同业态差价",
        type7: "当期利润率",
        type8: "整盘利润率",
        type9: "非融IRR",
        type10: "静态投资回收期（月）",
        list1: [
          { type: "首开均价", name: "高层(19-34层）", num: "123" },
          { type: "首开均价", name: "小高层(9-11层）", num: "123" },
          { type: "首开均价", name: "车位", num: "123" }
        ],
        list2: [
          { type: "不同业态差价", num: "123" },
          { type: "不同业态差价", num: "123" }
        ]
      }
    };
  },
  created() {
    if (this.$route.query.type != null && this.$route.query.type == "view") {
      this.isType = this.$route.query.type;
    }
    this.reload();
  },
  filters: {
    fixed: function(data) {
      if(!data){
        return "0.00"
      }
      return data.toFixed(2);
    },
    twofix: function(data) {
      if(!data){
        return "0.00"
      }
      return data.toFixed(2);
    }
  },
  computed: {
    allRate() {
      return this.come_Data[this.come_Data.length - 1].actual_total;
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
      return sum;
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
    },
    weekData: {
      handler(a, b) {
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
    openChange(val) {
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
    switchVersionSevenDayOpenApplay() {
      switchVersionSevenDayOpenApplay({
        id: this.thisVserion || this.$route.query.BOID,
        plan_id: this.$route.query.plan_id,
        plan_node_id: this.$route.query.plan_node_id,
        node_level: "7",
        operation:"view"
      }).then(res => {
        this.applay_status = res.result.openApplayMainData.approval_stuat;
        let openApplayMainData = res.result.openApplayMainData;
        this.openApplayMainData = openApplayMainData;
        this.priceList = res.result.firstOpenAvgData;
        if (res.result.competingpPoducts) {
          this.competingpPoducts = res.result.competingpPoducts;
        } else {
          this.competingpPoducts = [];
        }
        if (res.result.openApplayMainData.new_first_time) {
          this.countDate(res.result.openApplayMainData.new_first_time);
        }
        this.getApplayDatas = res.result.getApplayDatas;
        this.customerStorageNode = res.result.customerStorageNode;
        this.come_Data = res.result.weekStroageData;
        this.firstOpenAvgData = res.result.firstOpenAvgData;
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
      });
    },
    tabClick(tab, event) {
      if (this.activeTab == 1) {
        this.versionData = [];
      }
      if (this.activeTab == 2) {
        this.approval_stuat = 1;
        this.viewdelayOpenApplay();
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
    countDate(date) {
      var aDate, oDate1, oDate2, iDays;
      aDate = date.split("-");
      oDate1 = new Date(aDate[1] + "-" + aDate[2] + "-" + aDate[0]); //转换为02-05-2018格式
      aDate = this.openApplyData.designtwo_time.split("-");
      oDate2 = new Date(aDate[1] + "-" + aDate[2] + "-" + aDate[0]);
      iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
      this.openApplyData.delay_daynum = iDays;

      this.customerNodeStorage = [];
      var rules_time = this.openApplyData.rules_time;
      var asd = +new Date(date) - 6 * 86400000;
      var node_time1 = this.FomartDate(new Date(asd));
      var qwe = +new Date(date) - 20 * 86400000;
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

    //延期看盘申请--获取周拆分数据

    getWeeklyResolution(new_first_time) {
      getWeeklyResolution({
        start_time: this.openApplyData.rules_time,
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

    toFloat(value) {
      value = Math.round(parseFloat(value) * 100) / 100;

      if (value.toString().indexOf(".") < 0) {
        value = value.toString() + ".00";
      }

      return value;
    },
    viewdelayOpenApplay() {
      viewdelayOpenApplay({
        plan_id: this.$route.query.plan_id,
        plan_node_id: this.$route.query.plan_node_id,
        node_level: "7",
        project_id: this.$route.query.project_id
      }).then(res => {
        this.versionData = res.result.versionData;
        if (res.result.versionData) {
          this.thisVserion = res.result.versionData[0].id;
        } else {
          this.thisVserion = "";
        }
        (this.approval_stuat = res.result.openApplyData.approval_stuat),
          (this.openApplyData = res.result.openApplyData),
          (this.customerNodeStorage = res.result.customerNodeStorage);
        if (res.result.weekData) {
          this.weekData = res.result.weekData;
        } else {
          this.weekData = [];
        }
      });
    },
    reload(num) {
      this.approval_stuat = 1;
      this.switchVersionSevenDayOpenApplay();
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
    update() {
      applyAdoptTell({
        businesskey: this.$route.query.BOID,
        eventType: "4",
        //延期开盘申请
        orgName: "fp_open_seven_approve"
      }).then(res => {
        window.close();
      });
    },
    YZ_link(file) {
      console.log(this.isMobile);
      if (this.isMobile) {
        var isTest = ["salesmgt-uat", "salesmgt-test"].some(function(item) {
          return window.location.href.indexOf(item) !== -1;
        });
        let wm = {
          htmlTitle: "拿地后",
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
  }
};
</script>

<style lang="less" scoped>
.sevenDaysOpening {
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
  ::v-deep  .el-form-item__label {
      width: 120px !important;
    }
   ::v-deep .el-form-item__content {
      margin-left: 120px !important;
    }

  ::v-deep  .inputForm .el-col-8 {
      width: 100% !important;
    }
  }
}

.sevenDays {
  .navbarLink {
    background: #fff;
    margin-top: 5px;
  }
 ::v-deep input::-webkit-outer-spin-button,
 ::v-deep input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

 ::v-deep .el-date-editor.el-input,
::v-deep  .el-date-editor.el-input__inner {
    width: 100%;
  }

::v-deep  .el-input__inner {
    text-align: center;
  }

::v-deep  .el-input--prefix .el-input__inner {
    padding-left: 0;
  }

::v-deep  .el-input--prefix .el-input__inner {
    padding-right: 0;
  }

 ::v-deep .el-icon-date:before {
    display: none;
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

  ::v-deep  .el-button {
      height: 30px;
      float: right;
      margin-left: 10px;
      margin-top: 10px;
    }

  ::v-deep  .el-button:first-child {
      margin-right: 15px;
    }
  }

  .containter {
    margin: 10px;
    background-color: #fff;
    .text_area {
      height: 100%;
      width: 100%;
    }
  ::v-deep  .el-tabs {
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

      ::v-deep  .el-checkbox {
          position: absolute;
          top: 50%;
          right: 30px;
          transform: translateY(-50%);
          color: #333;
        }

      ::v-deep  .el-checkbox__label {
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

    .lists {
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

    .rate {
      margin: 0 15px;

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
      margin: 0 15px;
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

    ::v-deep  .el-date-editor.el-input {
        width: 100% !important;
      ::v-deep  .el-input__inner {
          padding-left: 30px;
          text-align: left;
        }
      ::v-deep  .el-icon-date:before {
          display: initial;
        }
      }

      .table_bottom {
        height: 160px;
        display: flex;

        > div {
          flex: 1;
        }

        .left {
          width: 180px;
          flex: 0 1 auto;
          line-height: 160px;
          text-align: center;
          border-right: 1px solid #ebeef5;
          color: #909399;
          background-color: #f5f7fa;
        }

        > div:last-child {
          padding: 20px;
        }

      ::v-deep  .el-textarea {
          height: 100%;
        }

      ::v-deep  .el-textarea__inner {
          height: 100% !important;
        }
      }
    }

    .firstOpen {
      margin: 0 15px;

      p {
        height: 30px;
        line-height: 30px;
        color: #333;
        font-size: 14px;
      }
    ::v-deep  .el-input {
        padding: 0 10px 0;
      }
      .bold {
        font-weight: 700;
      }

      .table {
        border-left: 0.5px solid #e6e6e6;
        border-top: 0.5px solid #e6e6e6;
        font-size: 14px;
        font-weight: normal;

     ::v-deep   > .el-row:first-child {
          background: #f5f7fa;
          color: #999;
        }
       ::v-deep .el-col {
          > div {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }

     ::v-deep .el-col {
        text-align: center;
        height: 40px;
        line-height: 40px;
        border-right: 0.5px solid #e6e6e6;
        border-bottom: 0.5px solid #e6e6e6;
      }

      .averagePrice {
        text-align: center;
        > div:first-child {
          border-bottom: 0.5px solid #e6e6e6;
        }
        > div:last-child {
          border-bottom: 0.5px solid #e6e6e6;
        }
      }
      .averagePrice.el-col {
        border-bottom: none;
      }
      .averagePricehead {
        border-bottom: none;
      ::v-deep  .el-col {
          > div {
            border-bottom: 0.5px solid #e6e6e6;
            border-right: none;
          }
          > div:last-child {
            border-bottom: none;
          }
        }
      }
      .averagePrice_item {
        // border-bottom: 0.5px solid #e6e6e6;
        height: 40px;
        line-height: 40px;
      }
      .diffPricehead {
        text-align: center;
        height: 80px;
      }
      .diffPrice {
        text-align: center;
        height: 80px;
        > div:first-child {
          height: 40px;
          border-bottom: 0.5px solid #e6e6e6;
        }
      }
    }

    .goodsInfo {
      margin: 0 15px;

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

    .clientInfo {
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

    .openDay {
      margin: 0 15px;

      p {
        height: 30px;
        line-height: 30px;
        color: #333;
        font-size: 14px;
      }

      .bold {
        font-weight: 700;
      }
    ::v-deep  .el-input {
        padding: 0 10px 0;
        // max-width:200px;
      }
    ::v-deep  .el-row {
        border-top: 1px solid #e6e6e6;

      ::v-deep  .el-col:first-child {
          border-left: 1px solid #e6e6e6;
          background: #f5f7fa;
        }

       ::v-deep .el-col:nth-child(3) {
          background: #f5f7fa;
        }
      }

     ::v-deep .el-col {
        text-align: center;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #e6e6e6;
        border-right: 1px solid #e6e6e6;
      }
    }

    .prognosis {
      margin: 0 15px;

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
        height: 200px;
        padding: 20px;

      ::v-deep  .el-textarea {
          width: 100%;
          height: 100%;
        }

       ::v-deep .el-textarea__inner {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .bottom {
    text-align: center;
    height: 60px;
    line-height: 60px;
    background: #fff;
    margin: 0 15px;

  ::v-deep  .el-button {
      height: 30px;
    }
  }
}
</style>
